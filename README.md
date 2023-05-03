# Templr 
A full stack rapid web application development framework built using Vue.js, Nuxt.js, Tailwind CSS, Supabase and PostgreSQL targetting the edge computing paradigm.


```
export NODE_OPTIONS=--max-old-space-size=4096
```

## How to run the Application?

### Pre-requisites

Either of the following is required to run the application in your local environment.

* Node.js 16.x or higher
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