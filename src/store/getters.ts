import { IRootState } from '@/store/index';

const getters = {
  sidebar: (state: IRootState) => state.app.sidebar,
  language: (state: IRootState) => state.app.language,
  size: (state: IRootState) => state.app.size,
  device: (state: IRootState) => state.app.device,
  // visitedViews: (state: IRootState) => state.tagsView.visitedViews,
  // cachedViews: (state: IRootState) => state.tagsView.cachedViews,
  token: (state: IRootState) => state.user.token,
  avatar: (state: IRootState) => state.user.avatar,
  name: (state: IRootState) => state.user.name,
  introduction: (state: IRootState) => state.user.introduction,
  status: (state: IRootState) => state.user.status,
  roles: (state: IRootState) => state.user.roles,
  setting: (state: IRootState) => state.user.setting,
  permission_routers: (state: IRootState) => state.permission.routers,
  addRouters: (state: IRootState) => state.permission.addRouters
  // errorLogs: (state: IRootState) => state.errorLog.logs
};


export default getters;
