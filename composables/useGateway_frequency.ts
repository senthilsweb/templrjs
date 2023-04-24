export const useGateway_frequency = async () => {
  //let query = '/api/gateway_frequency?is_active=eq.true&is_archived=eq.false&select=code,name,is_active';
  let query = '/api/gateway_frequency?select=*';
  console.log('query=', query);
  const gateway_frequency = await useFetch(query, {
    method: 'get',
  });
  return gateway_frequency;
};
