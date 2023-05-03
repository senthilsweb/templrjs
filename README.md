# Templr 
A full stack rapid web application development framework built using Vue.js, Nuxt.js, Tailwind CSS, Supabase and PostgreSQL targetting the edge computing paradigm.


```
export NODE_OPTIONS=--max-old-space-size=4096
```



## Development Setup

* Clone the repo
* Install dependencies
* Create a .env file in the root directory by renaming the `release.env` file as `.env`
* run `npm run dev` to start the development server
* run `npm run build` to build the production version of the app

## How to run the server?

### Node.JS server

* Download the release bundle from the releases page
* Unzip the bundle
* Create a .env file in the root directory by renaming the `release.env` file as `.env`
* cd into the unzipped directory
* run `sh ./run.sh` to start the server as this will setup the environment variables and start the server

### Docker

* Review and setup environment variables in the `docker-compose.yml` file
* run `docker-compose up` to start the server

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
npm run build
```

### Docker


### Prisma
```
npx prisma studio
npx prisma db pull --schema=schema.prisma
npx prisma generate --schema=schema.prisma
npx prisma db push --schema=schema.prisma
```