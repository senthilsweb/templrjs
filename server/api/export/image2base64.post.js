export default defineEventHandler(async (event) => {
    //Get request payload
    const body = await readBody(event); // only for POST | PUT | PATCH | DELETE requests
    const image_url = body.image_url
    let res_message = ""

    console.log("body", JSON.stringify(body))

    if (image_url == undefined || image_url == "") {
        res_message = "Image URI path is invalid or missing"
    }
    if (res_message != "") {

        return {
            status: "Failure",
            message: res_message,
        };
    }
    //Business logic to generate word file from the image_buffer and data passed.
    try {
        const image_buffer = await fetch(image_url).then(res => res.arrayBuffer())

        var binary = '';
        var bytes = new Uint8Array(image_buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }
    catch (e) {
        event.res.statusCode = 500
        return {
            status: "Failure",
            exception: e.message,
            message: `Please check the image_buffer path is correct and it is accessible over the wire or check for any missing fields in the payload`,
        }
    };
}
);