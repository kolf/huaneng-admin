import { useRequest } from 'ahooks';
import request from './request';
import qs from 'qs';
import { CurrentUserResult, VcodeResult } from '@/models/me';
import { LoginParams, LoginResult } from '@/models/login';
import { MenuResult, MenuParams } from '@/models/menu';
import { UserResult, UserParams } from '@/models/user';
import { RoleResult, RoleParams } from '../models/role';

type Result<T> = {
  code: number;
  message: string;
  data: T;
};

// 菜单查询
export const getMenus = (params: UserParams) => {
  return request.post<Result<UserResult[]>>(`/api/v1/sysMenu/list`, params)
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
// 部门查询
export const getDepts = (params: UserParams) => {
  return request.post<Result<UserResult[]>>(`/api/v1/sysDept/list`, params)
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
// 角色查询
export const getRoles = (params: RoleParams) => {
  return request.post(`/api/v1/sysRole/list`, params)
}
export const setRoleUsers = (params: { roleId: number, userIds: number[] }) => {
  return request.put(`/api/v1/sysRole/authUser/selectAll`, params)
}
export const getRoleUsers = (params: RoleParams) => {
  return request.post(`/api/v1/sysRole/authUser/allocatedList/${params.roleId}`)
}

export const updateRole = (params: RoleParams) => {
  return request.put<Result<any>>(`/api/v1/sysRole/`, params);
};

export const addRole = (params: RoleParams) => {
  return request.post<Result<any>>(`/api/v1/sysRole/`, params);
};

export const deleteRole = (id: number) => {
  return request.delete<Result<any>>(`/api/v1/sysRole/${id}`);
};
// 用户查询
export const getUsers = (params: UserParams) => {
  return request.post<Result<UserResult[]>>(`/api/v1/sysUser/list`, params)
};

export const getUser = (params: UserParams) => {
  return request.get<Result<UserResult>>(`/api/v1/sysUser/${params.userId}`)
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

// 登陆相关
export const getUserVcode = () => {
  return request.get(`/auth/captchaImage`)
};

export const login = (params: LoginParams) => {
  return request.post(`/auth/login`, params)
};

export const getCurrentMenus = () => {
  return request.get(`/api/v1/sysMenu/currentUserMenu`);
};
