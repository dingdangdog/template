export const getSystemInfo = async () => {
  return await doApi.get("api/config");
};
