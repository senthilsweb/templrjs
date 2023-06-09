export default eventHandler(async (event) => {
	console.log("Inside Index");

	const body = await readBody(event); // only for POST | PUT | PATCH | DELETE requests
	console.log(body);
	const recordset = await $fetch(`${process.env.MONGODB_ATLAS_REST_URL}/find`, {
		method: "post",
		headers: {
			"api-key": `${process.env.MONGODB_ATLAS_REST_TOKEN}`,
		},
		body: {
			collection: "members",
			database: `${process.env.MONGODB_ATLAS_DATABASE}`,
			dataSource: `${process.env.MONGODB_ATLAS_DATASOURCE}`,
			//filter: criteria != "" ? {Name: {$regex: "^Ram"}} : {},
			//filter: {Name: {$regex: "^Ram"}},
			filter: body.filter || body._rawValue.filter,
			limit: body.limit || body._rawValue.limit,
			projection: body.projection || body._rawValue.projection,
		},
	});
	return recordset;
});
