import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { title, description, keywords, verison } = await readBody(event);

  const settings = await prisma.systemSetting.update({
    where: { id: 1 },
    data: {
      title,
      description,
      keywords,
      verison,
      updateBy: new Date(),
    },
  });

  return success(settings);
});
