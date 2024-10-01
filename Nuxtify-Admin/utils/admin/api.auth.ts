export const signIn = (data: AuthSignInParam): Promise<AuthInfo> => {
  return doApi.post("/login", data);
};

export const signOut = (): Promise<string> => {
  return doApi.get("/logout");
};
