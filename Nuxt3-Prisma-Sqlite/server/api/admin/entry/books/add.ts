import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // 获取请求体
  const { bookName } = body;

  const userId = await getUserId(event);
  // 在数据库中添加新数据
  const created = await prisma.book.create({
    data: {
      userId,
      bookName,
    },
  });
  return success(created);
});
