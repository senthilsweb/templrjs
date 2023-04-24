export default eventHandler(async (event) => {
	console.log("inside memebr delete.........");
	const { id } = event.context.params;
	console.log("To delete id=", id)
	const body = await readBody(event); // only for POST | PUT | PATCH | DELETE requests
	console.log(body);
	const record = await $fetch(`${process.env.MONGODB_ATLAS_REST_URL}/deleteOne`, {
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
			}
		},
	});
	return record;
});
