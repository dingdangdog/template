export default defineEventHandler(async (event) => {
  const db = useDatabase();
  const body = await readBody(event);

  const pageNum = Number(body.pageNum ? body.pageNum : 1);
  const pageSize = Number(body.pageSize ? body.pageSize : 15);
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

  // console.log(where);
  const stmttotal = db.prepare(
    `SELECT count(*) as total FROM dictionary WHERE 1=1 ${where}`
  );
  const total = await stmttotal.get();

  // db.prepare('SELECT * FROM cats WHERE name = ?');
  const stmt = db.prepare(
    `SELECT * FROM dictionary WHERE 1=1 ${where} ORDER BY type,sort
     LIMIT ${pageSize} OFFSET ${(pageNum - 1) * pageSize}`
  );
  const res = await stmt.all();
  // @ts-ignore
  return { total: total.total, data: res };
});
