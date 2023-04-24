import { createClient } from '@supabase/supabase-js'
import dayjs from 'dayjs'
const supabase = createClient(`${process.env.SUPABASE_URL}`, `${process.env.SUPABASE_KEY}`)
export default async (req, res) => {
    const body = await readBody(req);
    const profile_id = body.profile_id; //"45044204497"
    const first = body.first;
    let posts = []
    let base64 = ""
    let post, result, response = {}


    const url =
        'https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"' +
        profile_id +
        '","first":' +
        first +
        ',"after":null}';
    console.log(url)
    result = await $fetch(url, {
        "User- Agent": "Mozilla / 5.0(Macintosh; Intel Mac OS X 10_15_7) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 90.0.4430.93 Safari / 537.36",
        initialCache: false,
    });

    response.first = result.data.user.edge_owner_to_timeline_media.edges.length
    response.total = result.data.user.edge_owner_to_timeline_media.count
    for (let i = 0; i < response.first; i++) {
        async function getData() {
            //console.log('logging');
            const img = await fetch(result.data.user.edge_owner_to_timeline_media.edges[i].node.display_url)
                .then(result => result.arrayBuffer())
                .then(arrayBuffer => Buffer.from(arrayBuffer))
                .then((buffer) => buffer.toString('base64'))
            return img;
        }
        base64 = await getData();
        post = {
            "id": i,
            "text": result.data.user.edge_owner_to_timeline_media.edges[i].node.edge_media_to_caption.edges[0].node.text,
            "thumbnail_src": result.data.user.edge_owner_to_timeline_media.edges[i].node.thumbnail_src,
            "display_url": result.data.user.edge_owner_to_timeline_media.edges[i].node.display_url,
            "shortcode": result.data.user.edge_owner_to_timeline_media.edges[i].node.shortcode,
            "base64": base64,
            "created_at": dayjs.unix(result.data.user.edge_owner_to_timeline_media.edges[i].node.taken_at_timestamp).format('DD-MMM-YYYY')
        }
        //console.log("post.created_at", dayjs(post.created_at).format('DD/MM/YYYY'))
        const { data, error } = await supabase
            .from('instagram_posts')
            .insert(post)
        posts.unshift(post)
    }

    //Used this code to push the results in the mongoDB for offline access and to overcome instagram security related issues.


    const { data, error } = await supabase
        .from('instagram_posts')
        .insert(posts)

    response.result = data
    return response;
};
