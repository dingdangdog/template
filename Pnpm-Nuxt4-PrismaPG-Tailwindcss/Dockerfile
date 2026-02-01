# 多阶段构建 Dockerfile for Nuxt 4 + Prisma

# 阶段 1: 依赖安装和构建
FROM node:22.21.1-alpine3.22 AS builder

# 设置工作目录
WORKDIR /app

# 安装必要的系统依赖（Prisma 需要）
RUN apk add --no-cache openssl libc6-compat

# 复制 package 文件
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 构建应用
RUN npm run build

# 阶段 2: 生产运行环境
FROM node:22.21.1-alpine3.22 AS runner

LABEL author.name="Loden"
LABEL author.email="contact@lodenhu.com"
LABEL project.name="loden"
LABEL project.version="1.2.3"

WORKDIR /app

# 安装必要的系统依赖
RUN apk add --no-cache openssl libc6-compat

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nuxtjs

# 从 builder 阶段复制必要的文件
COPY --from=builder --chown=nuxtjs:nodejs /app/.output ./.output
COPY --from=builder --chown=nuxtjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nuxtjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nuxtjs:nodejs /app/prisma.config.ts ./prisma.config.ts

# 切换到非 root 用户
USER nuxtjs

# 设置环境变量
ENV TZ=Asia/Shanghai

# 数据库配置（可通过 docker-compose 覆盖）
ENV DATABASE_MODE=postgre
ENV DATABASE_URL="postgresql://postgres:123456@localhost:5432/loden?schema=public"

ENV NODE_ENV=production
ENV PORT=7061
# 资源路径配置
ENV NUXT_RESOURCE=/app/resources

# 暴露端口
EXPOSE 7061
# 启动应用
CMD ["node", ".output/server/index.mjs"]
