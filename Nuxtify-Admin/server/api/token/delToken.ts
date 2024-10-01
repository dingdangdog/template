export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = useDatabase();

  await db.sql`DELETE FROM tokens WHERE token =${body.token}`;

  return "ok";
});
