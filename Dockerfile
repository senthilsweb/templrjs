FROM node:17-alpine as build-stage

WORKDIR /app

RUN apk update && apk upgrade
RUN apk add git

COPY ./package*.json /app/

RUN npm ci && npm cache clean --force

COPY . .

RUN cp ./release.env .env


RUN npm run build


# production stage
FROM node:17-alpine as production-stage

WORKDIR /app

RUN apk update && apk upgrade
RUN apk add git

COPY --from=build-stage /app/.output /app/.output
COPY --from=build-stage /app/.data /app/.data

EXPOSE 3000
