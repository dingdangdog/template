export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = useDatabase();
  if (body.id){
    await db.sql`DELETE FROM dictionary WHERE id=${body.id}`;
  }
  
  return "delete ok";
});
