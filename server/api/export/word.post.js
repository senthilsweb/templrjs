import { createReport } from 'docx-templates';
import { Readable } from 'stream';
import { sendStream } from 'h3'

export default defineEventHandler(async (event) => {
    //Get request payload
    const body = await readBody(event); // only for POST | PUT | PATCH | DELETE requests
    const file_name = body.file_name
    const template_path = body.template_path
    let res_message = ""

    //Validate whether the input are available and in the expected format
    if (file_name == undefined || file_name == "") {
        res_message = "Filename is invalid or missing"
    }

    if (template_path == undefined || template_path == "") {
        res_message = "Template path is invalid or missing"
    }
    if (res_message != "") {

        return {
            status: "Failure",
            message: res_message,
        };
    }

    //Business logic to generate word file from the template and data passed.
    try {
        const template = await fetch(template_path).then(res => res.arrayBuffer())
        const buffer = await createReport({
            template,
            data: body.payload
        });
        var stream = new Readable();
        stream.push(buffer);
        stream.push(null);

        event.res.setHeader('Content-Disposition', 'attachment; filename=' + file_name);
        return sendStream(event, stream)
    }
    catch (e) {
        event.res.statusCode = 500
        return {
            status: "Failure",
            exception: e.message,
            message: `Please check the template path is correct and it is accessible over the wire or check for any missing fields in the payload`,
        }
    };
}
);