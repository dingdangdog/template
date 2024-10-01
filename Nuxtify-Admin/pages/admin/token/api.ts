const MODULE = "/token";

export const getTokens = (): Promise<Token[]> => {
  return doApi.post(`${MODULE}/getTokens`, {});
};

export const deleteToken = (item: Token): Promise<any> => {
  return doApi.post(`${MODULE}/delToken`, item);
};
