export default defineEventHandler(async (event) => {
  const db = useDatabase();

  const stmt = db.prepare(`SELECT * FROM settings where id = 1`);
  return (await stmt.all())[0];
});
