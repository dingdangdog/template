export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  // console.log(url)
  if (url.pathname.startsWith("/api")) {
    const ip = getRequestIP(event);
    console.log("New request: " + url, "IP: " + ip);
  }
});
