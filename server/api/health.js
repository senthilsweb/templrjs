
export default eventHandler(async (event) => {
  const query = getQuery(event);

  return {"message":"I am doing great"};
});
