export default eventHandler(async (event) => {
	const body = await readBody(event); // only for POST | PUT | PATCH | DELETE requests
	//console.log(JSON.stringify("pipeline = ", body.pipeline || body._rawValue.pipeline));
	const recordset = await $fetch(`${process.env.MONGODB_ATLAS_REST_URL}/aggregate`, {
		method: "post",
		headers: {
			"api-key": `${process.env.MONGODB_ATLAS_REST_TOKEN}`,
		},
		body: {
			collection: body.collection || body._rawValue.collection,
			database: `${process.env.MONGODB_ATLAS_DATABASE}`,
			dataSource: `${process.env.MONGODB_ATLAS_DATASOURCE}`,
			pipeline: body.pipeline || body._rawValue.pipeline,
		},
	});
	return recordset;
});
