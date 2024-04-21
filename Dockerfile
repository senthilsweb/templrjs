FROM node:18-alpine as build-stage

WORKDIR /app

RUN apk update && apk upgrade
RUN apk add git

COPY ./package*.json /app/

RUN npm ci && npm cache clean --force

COPY . .
COPY ./sample.env ./.env
RUN npm run build


# production stage
FROM node:18-alpine as production-stage

WORKDIR /app

COPY --from=build-stage /app/.output /app/.output
COPY --from=build-stage /app/sample.env /app/.env
COPY --from=build-stage /app/run.sh /app/run.sh

EXPOSE 3000
ENTRYPOINT ["node", "./.output/server/index.mjs"]

