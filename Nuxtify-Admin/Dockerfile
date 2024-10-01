FROM node:18-alpine3.20 AS BUILDER

WORKDIR /app

COPY . .

RUN npm install && npm run build

FROM node:18-alpine3.20 AS RUNNER

LABEL author.name="DingDangDog"
LABEL author.email="dingdangdogx@outlook.com"
LABEL project.name="template"
LABEL project.version="0.0.0"

WORKDIR /app

COPY --from=BUILDER /app/.output/ ./

VOLUME /app/.data/

ENV NUXT_API_SECRET="template@oldmoon.top"
ENV NUXT_DOMAIN="template.oldmoon.top"

EXPOSE 3000
ENTRYPOINT [ "node","/app/server/index.mjs" ]
