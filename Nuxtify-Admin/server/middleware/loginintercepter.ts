export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const url = getRequestURL(event);
  // console.log("New request: " + url);

  // 判断url
  if (url.pathname.startsWith("/api")) {
    if (!url.pathname.endsWith("/login") && !url.pathname.endsWith("/logout")) {
      const db = useDatabase();
      const Token = getHeader(event, runtimeConfig.public.authKey);
      const { rows } =
        await db.sql`SELECT * FROM tokens WHERE token = ${Token}`;
      // 判断Token
      if (!(rows && rows.length > 0)) {
        // setResponseStatus(event, 403)
        console.log(`No ${runtimeConfig.public.authKey}`);
        throw Error("No Permissions");
      }
    }
  }
});
