FROM node:20-alpine3.21 AS BUILDER

WORKDIR /app

COPY . .

RUN npm install && npm run build

FROM node:20-alpine3.21 AS RUNNER

LABEL author.name="DingDangDog"
LABEL author.email="dingdangdogx@outlook.com"
LABEL project.name="mynuxt"
LABEL project.version="0.0.1"

WORKDIR /app

COPY --from=BUILDER /app/.output/ ./

VOLUME /app/.data/

ENV NUXT_APP_VERSION="0.0.1"

ENV NUXT_ADMIN_SECRET="admin_secret"
ENV NUXT_AUTH_SECRET="auth_secret"
# 好像没用但重要的配置
ENV NUXT_AUTH_ORIGIN=""

EXPOSE 3000
ENTRYPOINT [ "node","/app/server/index.mjs" ]
