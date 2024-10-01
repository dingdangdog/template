export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = useDatabase();

  if (!body.id) {
    return "not find ID";
  }
  if (body.type) {
    await db.sql`UPDATE dictionary SET type=${body.type} WHERE id=${body.id}`;
  }
  if (body.name) {
    await db.sql`UPDATE dictionary SET name=${body.name} WHERE id=${body.id}`;
  }
  if (body.value) {
    await db.sql`UPDATE dictionary SET value=${body.value} WHERE id=${body.id}`;
  }
  if (body.sort) {
    await db.sql`UPDATE dictionary SET sort=${body.sort} WHERE id=${body.id}`;
  }
  return "update ok";
});
