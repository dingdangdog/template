export default defineEventHandler(async (event) => {
  const db = useDatabase();
  const body = await readBody(event);

  if (!body.id) {
    return;
  }
  await db.sql`update settings set title = ${body.title},
      icon = ${body.icon},
      keyword = ${body.keyword},
      description = ${body.description},
      theme = ${body.theme},
      adminTheme = ${body.adminTheme} 
    where id=${body.id}`;
  return "create ok";
});
