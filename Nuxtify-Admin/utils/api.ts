const config = useRuntimeConfig();

const API_PREFIEX = config.public.apiBase;

// 调用后端接口统一封装，节省Header处理
export const doApi = {
  get: <T>(path: string, param?: any): Promise<T> => {
    // @ts-ignore
    return $fetch<T>(`${API_PREFIEX}${path}`, {
      method: "GET",
      query: param,
      headers: getHeaders(),
      credentials: "include",
    });
  },
  post: <T>(path: string, data: any): Promise<T> => {
    // @ts-ignore
    return $fetch<T>(`${API_PREFIEX}${path}`, {
      method: "POST",
      headers: getHeaders(),
      body: data,
      credentials: "include",
    });
  },
};

const getHeaders = () => {
  const header: any = {};
  header[config.public.authKey] = useCookie(config.public.authKey).value || "";
  return header;
};
