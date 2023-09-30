export default defineEventHandler((event) => {
  //console.log('New request: ' + event.req.url);
  const query = getQuery(event);
  const entity = event.req.url.split('/').pop();

  //console.log('query ' + JSON.stringify(query));
  //console.log('entity=', entity);

  //event.req.url = '';
  if (entity == 'properties') {
    //event.req.url = '/api/applications';
    //event.req.url = '/api/applications';
    //event.context;
    //sendRedirect(event, '/api/applications', 302);
    //proxyRequest('/api/applications', {});
  }
});
