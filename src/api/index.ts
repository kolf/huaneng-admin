import { useRequest } from 'ahooks';
import request from './request';
import qs from 'qs';
import { CurrentUserResult, VcodeResult } from '@/models/me';
import { LoginParams, LoginResult } from '@/models/login';
import { MenuResult, MenuParams } from '@/models/menu';
import { UserResult, UserParams } from '@/models/me';

type Result<T> = {
  code: number;
  message: string;
  data: T;
};

export const getCurrentMenus = () => {
  return request.get(`/api/v1/sysMenu/currentUserMenu`);
};

export const useGetMenus = (params?: MenuParams) => {
  return useRequest<Result<MenuResult[]>>(() => request.post(`/api/v1/sysMenu/list`, params || {}), {
    refreshDeps: params ? [params] : []
  });
};

export const updateMenu = (params: MenuParams) => {
  return request.put<Result<any>>(`/api/v1/sysMenu/`, params);
};

export const addMenu = (params: MenuParams) => {
  return request.post<Result<any>>(`/api/v1/sysMenu/`, params);
};

export const deleteMenu = (id: number) => {
  return request.delete<Result<any>>(`/api/v1/sysMenu/${id}`);
};

export const useGetDepts = (params?: MenuParams) => {
  return useRequest<Result<MenuResult[]>>(() => request.post(`/api/v1/sysDept/list`, params || {}), {
    refreshDeps: params ? [params] : []
  });
};

export const updateDept = (params: MenuParams) => {
  return request.put<Result<any>>(`/api/v1/sysDept/`, params);
};

export const addDept = (params: MenuParams) => {
  return request.post<Result<any>>(`/api/v1/sysDept/`, params);
};

export const deleteDept = (id: number) => {
  return request.delete<Result<any>>(`/api/v1/sysDept/${id}`);
};


export const useGetRoles = (params: MenuParams) => {
  return useRequest<Result<MenuResult[]>>(() => request.post(`/api/v1/sysRole/list`, params), {
    refreshDeps: [params],
    formatResult: res => res.data
  });
};

export const useGetUsers = (params: MenuParams) => {
  return useRequest<Result<MenuResult[]>>(() => request.post(`/api/v1/sysUser/list`, params), {
    refreshDeps: [params],
    formatResult: res => res.data
  });
};

export const updateUser = (params: UserParams) => {
  return request.put<Result<any>>(`/api/v1/sysUser/`, params);
};

export const addUser = (params: UserParams) => {
  return request.post<Result<any>>(`/api/v1/sysUser/`, params);
};

export const deleteUser = (id: number) => {
  return request.delete<Result<any>>(`/api/v1/sysUser/${id}`);
};


export const useGetVcode = () => {
  return useRequest<Result<VcodeResult>>(() => request.get(`/auth/captchaImage`), { formatResult: res => res.data });
};

export const useLogin = () => {
  return useRequest<Result<LoginResult>>(data => request.post(`/auth/login`, data), { manual: true });
};
