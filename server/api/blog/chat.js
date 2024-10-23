import { createClient } from '@supabase/supabase-js';
import GPT3Tokenizer from 'gpt3-tokenizer';
import { OpenAI } from 'openai';
const { Configuration } = OpenAI;

import { codeBlock, oneLine } from 'common-tags';

const config = useRuntimeConfig();

// Initialize Supabase client using runtime config
const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_KEY);

const openAiKey = config.private.OPENAI_KEY;


export default eventHandler(async (event) => {
  try {
    const req = event.req;
    const res = event.res;

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      });
      return 'ok';
    }

    // Check required environment variables
    if (!openAiKey || !config.public.SUPABASE_URL || !config.public.SUPABASE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const body = await readBody(event);
    if (!body || !body.query) {
      return { status: 400, message: 'Missing query in request data' };
    }

    const sanitizedQuery = body.query.trim();
    console.log({ query: sanitizedQuery });

    // Initialize OpenAI API
    const openai = new OpenAI({
      apiKey: openAiKey,
    });

    // Moderate the content with OpenAI's moderation API
    const moderationResponse = await openai.moderations.create({
      input: sanitizedQuery,
    });
    // Check if moderationResponse exists and has data
    if (!moderationResponse || !moderationResponse.results) {
      return { status: 500, message: 'Moderation API failed or returned invalid data.' };
    }

    const [results] = moderationResponse.results;

    if (results.flagged) {
      return { status: 400, message: 'Flagged content detected' };
    }

    // Generate embeddings for the sanitized query
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: sanitizedQuery.replace(/\n/g, ' '),
    });

    //console.log("Embedding Response:", embeddingResponse);


    // Extract the embedding correctly
    const [{ embedding }] = embeddingResponse.data;
    //console.log("Generated Embedding:", embedding);  // Log the generated embedding (array)

    const { data: pageSections, error: matchError } = await supabase.rpc('match_web_page_sections', {
      embedding,
      match_threshold: 0.78,
      match_count: 2,
      min_content_length: 50,
    });

    console.log("Supabase RPC Error:", matchError);  // Log any potential errors
    //console.log("Page Sections Data:", pageSections);  // Log the data returned

    if (matchError) {
      return { status: 500, message: `Failed to match page sections: ${matchError.message}` };
    }

    if (!pageSections || pageSections.length === 0) {
      return { status: 404, message: 'No matching page sections found' };
    }



    // Tokenize the page sections and prepare context for the prompt
    const tokenizer = new GPT3Tokenizer.default({ type: 'gpt3' });


    let tokenCount = 0;
    let contextText = '';

    for (const pageSection of pageSections) {
      const content = pageSection.content;
      const encoded = tokenizer.encode(content);


      //console.log("Tokenized Content:", encoded);

      tokenCount += encoded.text.length;

      if (tokenCount >= 1500) break;

      contextText += `${content.trim()}\n---\n`;
    }
    console.log("contextText:", contextText);
    // Prepare the final prompt
    const prompt = codeBlock`
      ${oneLine`
        You are a very enthusiastic representative who loves to help people! Given the following sections from the webpages downloaded, answer the question using only that information, outputted in markdown format. If you are unsure and the answer is not explicitly written in the webpages, say "Sorry, I don't know how to help with that."
      `}
      
      Context sections:
      ${contextText}
      
      Question: """
      ${sanitizedQuery}
      """
      
      Answer as markdown (including related code snippets if available):
    `;

    // Prepare OpenAI completion request
    const messages = [
      {
        role: 'system',
        content: codeBlock`
          ${oneLine`
            You are a very enthusiastic AI who loves to help people! Given the following information from the webpages downloaded, answer the user's question using only that information, outputted in markdown format.
          `}
          
          ${oneLine`
            If you are unsure and the answer is not explicitly written in the webpages, say "Sorry, I don't know how to help with that."
          `}
          
          ${oneLine`
            Always include related code snippets if available.
          `}
        `,
      },
      {
        role: 'user',
        content: `Here is the university information: ${contextText}`,
      },
      {
        role: 'user',
        content: `Here is my question: ${sanitizedQuery}`,
      },
    ];

    const completionOptions = {
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 1024,
      temperature: 0,
      stream: true,
    };
    
    // Call OpenAI to generate a completion
    const completionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      headers: {
        Authorization: `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(completionOptions),
    });

    if (!completionResponse.ok) {
      const error = await completionResponse.json();
      return { status: 500, message: 'Failed to generate completion', error };
    }

    // Stream the OpenAI response
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
    });
    return completionResponse.body;

  } catch (error) {
    console.error('Error:', error);
    return { status: 500, message: 'There was an error processing your request' };
  }


  






});
