export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = useDatabase();

  await db.sql`INSERT INTO viewerlogs VALUES(${body.ip}, ${body.uri}, ${body.time}, ${body.timezone}, ${body.userAgent})`;
  return "OK";
});
