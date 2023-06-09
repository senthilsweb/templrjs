
export default eventHandler(async (event) => {
	console.log("inside memebr update.........");
	const query = getQuery(event);
	const { id } = event.context.params;
	console.log("query", JSON.stringify(query))
	console.log("To update id=", id)
	const body = await readBody(event); // only for POST | PUT | PATCH | DELETE requests
	console.log(body);
	const recordset = await $fetch(`${process.env.MONGODB_ATLAS_REST_URL}/updateOne`, {
		method: "post",
		headers: {
			"api-key": `${process.env.MONGODB_ATLAS_REST_TOKEN}`,
		},
		body: {
			collection: "members",
			database: `${process.env.MONGODB_ATLAS_DATABASE}`,
			dataSource: `${process.env.MONGODB_ATLAS_DATASOURCE}`,
			filter: {
				_id: {
					$oid: id,
				},
			},
			update: {
				$set: body,
			},
		},
	});
	return recordset;
});
