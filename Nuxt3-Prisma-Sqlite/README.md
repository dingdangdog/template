# MyNuxt

> 一套基于 Nuxt3 的全站开发框架

## 技术栈

- tailwindcss
- vuetify
- i18n
- prisma

## Setup

```sh
# 安装依赖
npm i

# 启动服务
npm run dev
```

### 数据库相关

#### 初始化数据库

安装项目依赖后直接执行：

```sh
npm run dev
```

第一次执行如果没有初始化过数据库，会询问是否初始化数据库，如：

```console
Do you want to migrate database changes to your database? 
```

此时输入 Y/y 即可自动开始初始化数据库。

#### 开发环境更新表结构

当 `schema.prisma` 文件中定义的表结构有变化时，系统不会自动将数据库表结构更新，需要执行更新命令来触发数据库更新，命令如下：

```sh
npx prisma migrate dev --name <migration-name>
```

- `<migration-name>` 是迁移的名称，通常描述你所做的更改，例如 `add-age-to-user` 或 `create-post-table`。
- `npx prisma migrate dev` 会生成 SQL 迁移文件，并自动应用到开发环境的数据库中。

示例：

```sh
npx prisma migrate dev --name add-age-to-user
```

#### 测试密码加密

> 提示：代码中用的是 common.ts 中的函数；test.js 仅用于开发环境生成密码

```sh
# 默认账号密码 admin admin123456
node server/utils/test.js
```
