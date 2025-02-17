import prisma from "~/lib/prisma";

export default defineNitroPlugin((nitroApp) => {
  // 只执行一次的Hook，初始化数据库
  nitroApp.hooks.hookOnce("request", async () => {
    // 初始化系统设置
    const nums = await prisma.systemSetting.count();
    if (nums < 1) {
      await prisma.systemSetting.create({
        data: {
          id: 1,
          title: "Title",
          description: "Description",
          keywords: "Keywords",
        },
      });
      console.log("Init System Settings");
    }
    await prisma.systemSetting.update({
      data: { version: String(useRuntimeConfig().appVersion) },
      where: {
        id: 1,
      },
    });
  });
});
