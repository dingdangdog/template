const prefiex = "/dict";

export const getDictionaryPage = (
  page: PageParam,
  param: Dictionary
): Promise<{ total: number; data: Dictionary[] }> => {
  return doApi.post(`${prefiex}/page`, { ...page, ...param });
};

export const addDictionary = (data: Dictionary): Promise<string> => {
  return doApi.post(`${prefiex}/add`, data);
};

export const delDictionary = (id: number): Promise<string> => {
  return doApi.post(`${prefiex}/del`, { id });
};

export const updateDictionary = (data: Dictionary): Promise<string> => {
  return doApi.post(`${prefiex}/update`, data);
};

export const listDictionary = (data: Dictionary): Promise<Dictionary[]> => {
  return doApi.post(`${prefiex}/list`, data);
};

export const allDictionary = (): Promise<Dictionary[]> => {
  return doApi.post<Dictionary[]>(`${prefiex}/all`, {});
};
