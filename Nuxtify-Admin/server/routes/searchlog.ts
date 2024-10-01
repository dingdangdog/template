export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = useDatabase();

  await db.sql`INSERT INTO searchlogs VALUES(${body.ip}, ${body.time}, ${body.searchtag}, ${body.searchinfo})`;
  return "OK";
});
