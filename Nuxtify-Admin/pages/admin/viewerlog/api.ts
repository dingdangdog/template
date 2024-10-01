const MODULE = "/logs";

export const getViewerPage = (
  page: PageParam,
  param: ViewerLog
): Promise<PageInfo<ViewerLog>> => {
  return doApi.post<PageInfo<ViewerLog>>(`${MODULE}/getViewerLogs`, {
    ...page,
    ...param,
  });
};

export const deleteViewerLog = (item: ViewerLog): Promise<any> => {
  return doApi.post(`${MODULE}/delViewerLog`, item);
};
