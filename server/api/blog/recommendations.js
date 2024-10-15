import { createClient } from '@supabase/supabase-js';
import _ from 'lodash';  // Assuming lodash is already installed in your project

const config = useRuntimeConfig();

// Initialize Supabase client using runtime config
const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_KEY);

/**
 * Main event handler for the API route.
 * Retrieves the current blog and its related blogs based on embeddings and returns them.
 */
export default eventHandler(async (event) => {
    // Get both page_id and slug from query string
    const { page_id, slug } = getQuery(event);

    let finalPageId = page_id;

    if (slug) {
        // If slug is provided, retrieve the page_id where the path contains the slug
        const slugResult = await getPageIdFromSlug(slug);
        if (slugResult) {
            finalPageId = slugResult;
        } else {
            return {
                status: 404,
                message: 'Page with the provided slug not found!',
            };
        }
    }

    if (!finalPageId) {
        return {
            status: 400,
            message: 'Missing page_id or slug!',
        };
    }

    try {
        // Get the current blog's attributes and aggregated embedding
        const currentBlogAttributes = await getCurrentBlogAttributes(finalPageId);
        const currentBlogEmbedding = await getCurrentBlogEmbedding(finalPageId);

        // Find related blog IDs and paths based on embedding similarity
        const relatedBlogs = await findRelatedBlogs(currentBlogEmbedding, finalPageId);

        // Return the current blog attributes and related blogs in the response
        return {
            current_blog: currentBlogAttributes,
            related_blogs: relatedBlogs,
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message,
        };
    }
});

/**
 * Function to retrieve the page_id based on the slug.
 * @param {string} slug - The slug to search for in the page path.
 * @returns {string} The corresponding page_id if found.
 */
async function getPageIdFromSlug(slug) {
    const query = await supabase
        .from('page')
        .select('id')
        .ilike('path', `%${slug}%`)
        .limit(1);

    if (query.data && query.data.length > 0) {
        return query.data[0].id;
    } else {
        return null;
    }
}

/**
 * Function to retrieve the attributes of the current blog based on page_id.
 * @param {string} pageId - The unique page ID of the current blog.
 * @returns {Object} An object containing the blog's page_id, slug, and title.
 */
async function getCurrentBlogAttributes(pageId) {
    const query = await supabase
        .from('page')
        .select('path')
        .eq('id', pageId)
        .limit(1);

    if (query.data && query.data.length > 0) {
        const path = query.data[0].path;
        const slug = path.split('/').pop().replace('.md', '');
        const title = _.startCase(slug.replace(/-/g, ' '));

        return {
            page_id: pageId,
            slug: slug,
            title: title,
        };
    } else {
        throw new Error('Blog not found!');
    }
}

/**
 * Function to find related blogs based on embeddings and page_id.
 * @param {Array<number>} currentBlogEmbedding - The aggregated embedding of the current blog.
 * @param {string} pageId - The unique page ID of the current blog.
 * @returns {Array<Object>} A list of related blogs with page_id, slug, title, and rank (distance score).
 */
async function findRelatedBlogs(currentBlogEmbedding, pageId) {
    const result = await supabase.rpc('find_related_blogs', {
        query_embedding: currentBlogEmbedding,
        current_page_id: pageId,
    });

    // Process related pages and calculate the Euclidean distance (matching distance score)
    const relatedPages = result.data.map((record) => {
        const slug = record.path.split('/').pop().replace('.md', '');
        const title = _.startCase(slug.replace(/-/g, ' '));

        // Use the distance provided in the result or calculate it based on embeddings
        const distance = record.distance || calculateEuclideanDistance(currentBlogEmbedding, record.embedding);

        return {
            page_id: record.page_id,
            slug: slug,
            title: title,
            rank: distance,  // Distance score representing rank
        };
    });

    // Remove duplicates by page_id (Map helps to keep only unique entries)
    const uniqueRelatedPages = Array.from(new Map(relatedPages.map(page => [page.page_id, page])).values());

    return uniqueRelatedPages;
}

/**
 * Function to calculate Euclidean distance between two embedding vectors.
 * @param {Array<number>} embedding1 - The first embedding vector.
 * @param {Array<number>} embedding2 - The second embedding vector.
 * @returns {number} The calculated Euclidean distance.
 */
function calculateEuclideanDistance(embedding1, embedding2) {
    const sum = embedding1.reduce((acc, value, index) => acc + Math.pow(value - embedding2[index], 2), 0);
    return Math.sqrt(sum);
}

/**
 * Function to retrieve and aggregate all embeddings of the current blog by page_id.
 * @param {string} pageId - The unique page ID of the current blog.
 * @returns {Array<number>} The aggregated embedding vector.
 */
async function getCurrentBlogEmbedding(pageId) {
    const query = await supabase
        .from('page_section')
        .select('embedding')
        .eq('page_id', pageId);

    if (query.data && query.data.length > 0) {
        // Convert the embedding JSON strings into arrays of numbers
        const embeddings = query.data.map((item) => {
            try {
                return JSON.parse(item.embedding);  // Parse the JSON string into an array
            } catch (error) {
                console.error("Error parsing embedding:", item.embedding, error);
                throw new Error('Invalid embedding format!');
            }
        });

        // Aggregate embeddings by averaging them
        const aggregatedEmbedding = embeddings.reduce((acc, embedding) => {
            return acc.map((value, index) => value + embedding[index]);
        }, new Array(embeddings[0].length).fill(0)).map((value) => value / embeddings.length);

        return aggregatedEmbedding;
    } else {
        throw new Error('Blog embedding not found!');
    }
}
