// 退出登录
export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const Token = await getHeader(event, runtimeConfig.public.authKey);
  const db = useDatabase();
  if (Token) {
    await db.sql`DELETE FROM tokens WHERE token=${Token}`;
  }
  deleteCookie(event, runtimeConfig.public.authKey);
  deleteCookie(event, "name");

  return "OK";
});
