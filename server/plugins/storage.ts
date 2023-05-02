import cloudflareKVHTTPDriver from 'unstorage/drivers/cloudflare-kv-http';
import fsDriver from 'unstorage/drivers/fs';

export default defineNitroPlugin(() => {
  const storage = useStorage();
  storage.mount(
    'cf_cms',
    cloudflareKVHTTPDriver({
      accountId: process.env.CLOUDFLARE_ACCOUNT_ID || 'CLOUDFLARE_ACCOUNT_ID',
      namespaceId: process.env.CLOUDFLARE_NAMESPACE_ID || 'CLOUDFLARE_NAMESPACE_ID',
      email: process.env.CLOUDFLARE_EMAIL || 'CLOUDFLARE_EMAIL',
      apiKey: process.env.CLOUDFLARE_API_KEY || 'CLOUDFLARE_API_KEY',
    })
  );

  storage.mount(
    'fs_cms',
    fsDriver({
      base: './.data/cms',
    })
  );
});
