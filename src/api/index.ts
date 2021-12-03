import { MenuList } from '@/models/menu.interface';
import { LoginParams, LoginResult } from '@/models/login';
import { CurrentUserResult, VcodeResult } from '@/models/user';
import { useBatch, useCreate, useGetList, useGetOne, useUpdate } from './request';

const projectResource = '/projects';

export const useLogin = () => {
  return useCreate<LoginParams, LoginResult>('/auth/login');
};

export const useGetVcode = () => {
  return useGetOne<VcodeResult>('Vcode', '/auth/captchaImage', null, (res:any) => res.data);
};

export const useGetCurrentUser = () => {
  return useGetOne<CurrentUserResult>('CurrentUser', '/api/v1/sysUser/1');
};

export const useGetCurrentMenus = () => {
  return useGetList<MenuList>('CurrentMenuList', '/current/menu');
};
export const useGetProjects = (pagination: any, filters: any) => {
  return useGetList<API.ProjectPagination>('Projects', projectResource, pagination, filters);
};
export const useAddProject = () => {
  return useCreate<API.Project, API.Project>(projectResource);
};

export const useUpdateProject = () => {
  return useUpdate<API.Project>(projectResource);
};

export const useBatchDeleteProject = () => {
  return useBatch(projectResource + ':batchDelete');
};
