export default defineEventHandler(async (event) => {
  const db = useDatabase();
  const body = await readBody(event);

  const type = body.type;
  const name = body.name;

  let where = "";
  if (type || name) {
    if (type) {
      where += ` AND type = '${type}' `;
    }
    if (name) {
      where += ` AND name like '%${name}%' `;
    }
  }

  // db.prepare('SELECT * FROM cats WHERE name = ?');
  const stmt = db.prepare(
    `SELECT * FROM dictionary WHERE 1=1 ${where} ORDER BY sort`
  );
  return await stmt.all();
});
