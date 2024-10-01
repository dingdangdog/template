export default defineEventHandler(async (event) => {
  const db = useDatabase();
  const stmt = db.prepare(`SELECT * FROM dictionary`);
  return await stmt.all();
});
