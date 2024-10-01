export default defineNitroPlugin((nitroApp) => {
  // 只执行一次的Hook，初始化数据库
  nitroApp.hooks.hookOnce("request", async () => {
    try {
      const runtimeConfig = useRuntimeConfig();
      const db = useDatabase();
      console.log("server initdb");

      // 字典表
      await db.sql`CREATE TABLE IF NOT EXISTS dictionary (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT, 
        "type" TEXT, 
        "name" TEXT, 
        "value" TEXT,
        "sort" INTEGER
      )`;
      // 初始化字典
      const { rows: dicts } =
        await db.sql`SELECT id FROM dictionary WHERE id = 1`;
      if (!dicts || dicts?.length <= 0) {
        console.log("Init AdminUser");
        await db.sql`INSERT INTO dictionary VALUES(1, 'dict', '字典类型', 'dict', 0)`;
      }

      // viewerlogs 访客记录表
      await db.sql`CREATE TABLE IF NOT EXISTS viewerlogs (
        "ip" TEXT,
        "uri" TEXT, 
        "time" TEXT,
        "timezone" TEXT,
        "userAgent" TEXT
      )`;

      // searchlogs 搜索记录表
      await db.sql`CREATE TABLE IF NOT EXISTS searchlogs (
        "ip" TEXT,
        "time" TEXT,
        "searchtag" TEXT,
        "searchinfo" TEXT
      )`;

      // 登录记录表
      await db.sql`CREATE TABLE IF NOT EXISTS tokens (
        "id" TEXT,
        "token" TEXT, 
        "createtime" TEXT
      )`;

      // 管理员表
      await db.sql`CREATE TABLE IF NOT EXISTS adminusers (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "username" TEXT, 
        "password" TEXT,
        "name" TEXT
      )`;
      // 初始化管理账号 测试账号：admin admin
      const username = runtimeConfig.admin;
      const password = runtimeConfig.adminPass;
      const encryptPassword = encryptBySHA256(username, password);
      const { rows: users } =
        await db.sql`SELECT id FROM adminusers WHERE id = '1'`;
      if (!users || users?.length <= 0) {
        console.log("Not Find Any AdminUser, Initialization!");
        await db.sql`INSERT INTO adminusers VALUES('1', ${username}, ${encryptPassword}, 'Admin')`;
      }

      // 系统设置表
      await db.sql`CREATE TABLE IF NOT EXISTS settings (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "title" TEXT, 
        "icon" TEXT, 
        "keyword" TEXT,
        "description" TEXT,
        "theme" TEXT,
        "adminTheme" TEXT
      )`;

      const { rows: settings } =
        await db.sql`SELECT id FROM settings WHERE id = 1`;
      if (!settings || settings?.length <= 0) {
        console.log("Not Find Any Setting, Initialization!");
        await db.sql`INSERT INTO settings VALUES(1, 'Nuxtify Admin', '/favicon.ico', 'Nuxtify Admin', 'Nuxtify Admin', 'dark', 'dark')`;
      }
    } catch {}
  });
});
