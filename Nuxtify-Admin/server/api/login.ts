import { encryptBySHA256 } from "../utils/common";

// 登录
export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event);
  const body = await readBody(event);
  const db = useDatabase();

  const password = encryptBySHA256(body.username, body.password);
  // console.log(password)
  const { rows } =
    await db.sql`SELECT * FROM adminusers WHERE username = ${body.username} AND password = ${password}`;

  if (rows && rows.length > 0) {
    const date = String(Date.now());
    const token = encryptBySHA256(
      body.username + password,
      runtimeConfig.apiSecret + date
    );
    await db.sql`INSERT INTO tokens VALUES (${rows[0].id}, ${token}, ${date})`;
    // Increase counter cookie by 1
    setCookie(event, runtimeConfig.public.authKey, token, {
      maxAge: 7 * 24 * 60 * 60,
      domain: runtimeConfig.domain,
    });
    setCookie(event, "name", String(rows[0].name));
    return { code: 200, name: rows[0].name };
  }

  return { code: 401, token: null, message: "用户名或密码错误" };
});
