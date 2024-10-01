export default defineEventHandler(async (event) => {
  const db = useDatabase();
  const body = await readBody(event);

  await db.sql`INSERT INTO dictionary(
      type, 
      name, 
      value, 
      sort) 
    VALUES (
      ${body.type},
      ${body.name},
      ${body.value},
      ${body.sort})`;
  return "create ok";
});
