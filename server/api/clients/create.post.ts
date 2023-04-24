export default eventHandler(async (event) => {
	const body = await readBody(event); // only for POST | PUT | PATCH | DELETE requests
	const recordset = await $fetch(`${process.env.MONGODB_ATLAS_REST_URL}/insertOne`, {
		method: "post",
		headers: {
			"api-key": `${process.env.MONGODB_ATLAS_REST_TOKEN}`,
		},
		body: {
			collection: "clients",
			database: `${process.env.MONGODB_ATLAS_DATABASE}`,
			dataSource: `${process.env.MONGODB_ATLAS_DATASOURCE}`,
			document: body,
		},
	});
	return recordset;
});
//6315d02dd586196150c8950c
