# Templr 
A full stack rapid web application development framework built using Vue.js, Nuxt.js, Tailwind CSS, Supabase and PostgreSQL targetting the edge computing paradigm.


```
export NODE_OPTIONS=--max-old-space-size=4096
```

## How to run the Application?

### Pre-requisites

Either of the following is required to run the application in your local environment.

* Node.js 16.x or higher (v16.19.1)
* Docker 20.x or higher

### Run it as Node.JS server

* Download the release bundle from the releases page [https://github.com/senthilsweb/templrjs/blob/beta/templrJS-0.0.1-beta-05-03-2023 (templrJS-0.0.1-beta-05-03-2023)
* Unzip the bundle
* Create a .env file in the root directory by renaming the `release.env` file as `.env`
* cd into the unzipped directory
* run `sh ./run.sh` to start the server as this will setup the environment variables and start the server

### Run from Docker

* Review and setup environment variables in the `docker-compose.yml` file
* run `docker-compose up` to start the server

## Configurring the application for your use case

You can completely change the application to suit your use case by modifying the following JSON files inside `public` directory.

1. company.json
2. properties.json
3. countries.json
4. parent_nav.json
5. child_nav.json

## Environment Variables
Refer below for the list of environment variables that can be configured for the application.

```bash
# TEMPLRJS_CMS_STORAGE_MOUNT value can be fs_cms or cf_cms. If fs_cms, the markdown files will be fetched from the local filesystem. If cf_cms, the markdown files will be fetched from Cloudflare KV.
TEMPLRJS_CMS_STORAGE_MOUNT=fs_cms
# TEMPLRJS_WEBSITE_CONFIG_STORE value can be http or dbms. If dbms, the website config will be fetched from Supabase. If http, the website config will be fetched from the http endpoint.
TEMPLRJS_WEBSITE_CONFIG_STORE=http
TEMPLRJS_BASE_URL=http://localhost:3000

# Mandatory Supabase Configs if TEMPLRJS_CMS_DATA is remote
SUPABASE_URL=http://your-supabase-url
SUPABASE_KEY=your-supabase-key
SUPABASE_KEY_SERVICE_KEY=your-supabase-key

# Optional Supabase Configs 
SUPABASE_DB_HOST=your-supabase-host
SUPABASE_DB_PORT=5432
SUPABASE_PG_DB=postgres
SUPABASE_PG_USER=postgres
SUPABASE_PG_PASSWORD=

# Mandatory Storage configs. The default is 'fs' for local development.
STORAGE_DRIVER=cloudflare-kv-http

# Optional Cloudflare KV configs for dynamic markdown content used for the blog or any CMS
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_NAMESPACE_ID=
CLOUDFLARE_API_KEY=
CLOUDFLARE_EMAIL=

# node configs
NODE_TLS_REJECT_UNAUTHORIZED=0
```

## Production Deployment

### Vercel

### Cloudflare Worker



## Miscellaneous Development Notes

### Optional prisma installs

Required only for development of the prisma schema and generating db model ERD diagrams.

```
npm install prisma --save-dev
npm install prisma-dbml-generator --save-dev
npm install @softwaretechnik/dbml-renderer --save-dev
```

## Frequently used CLI commands


### Nuxt

```
npm run dev
npm run dev --port 3000
npm run build
```

### Loading environment variables

This is required only in production mode as the environment variables are loaded automatically in development mode. If you deploy it in 
vercel, you can set the environment variables in the vercel dashboard.

```
while IFS== read -r key value; do
  printf -v "$key" %s "$value" && export "$key"
done <.env
```
Alternatively, you can use the following command to load the environment variables and run the application.

> Note: cd into the root directory of the application before running the following command.

```
sh ./run.sh
```

### Docker

```
docker-compose up --env-file .env --f docker-compose.yml -d
docker logs -f templr
docker ps -a
```

### Prisma
```
npx prisma studio
npx prisma db pull --schema=schema.prisma
npx prisma generate --schema=schema.prisma
npx prisma db push --schema=schema.prisma
```