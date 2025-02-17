import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // 获取查询参数

  const where: any = {}; // 条件查询

  // 普通查询条件
  if (body.id) {
    // equils 等于查询
    // contains 模糊查询（pgsql和mongo中，可以增加额外参数限制忽略大小写 mode: 'insensitive'）
    where.id = {
      equils: body.id,
    };
  }
  if (body.bookName) {
    where.bookName = {
      equils: body.bookName,
    };
  }
  if (body.userId) {
    where.userId = {
      equils: body.userId,
    };
  }
  
  const users = await prisma.book.findMany({
    where, // 使用条件查询
  });

  return success(users);
});
