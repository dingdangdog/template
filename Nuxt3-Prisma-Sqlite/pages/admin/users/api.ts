const prefiex = "api/admin/entry/user";

export const getUsersPage = (
  page: PageParam,
  param: User
): Promise<{ total: number; data: User[] }> => {
  return doApi.post(`${prefiex}/page`, { ...page, ...param });
};

export const addUsers = (data: User): Promise<string> => {
  return doApi.post(`${prefiex}/add`, data);
};

export const delUsers = (id: number): Promise<string> => {
  return doApi.post(`${prefiex}/del`, { id });
};

export const updateUsers = (data: User): Promise<string> => {
  return doApi.post(`${prefiex}/update`, data);
};

export const giveaway = (data: User): Promise<string> => {
  return doApi.post(`${prefiex}/gift`, data);
};

export const listUsers = (data: User): Promise<User[]> => {
  return doApi.post(`${prefiex}/list`, data);
};

export const allUsers = (): Promise<User[]> => {
  return doApi.post(`${prefiex}/all`, {});
};
