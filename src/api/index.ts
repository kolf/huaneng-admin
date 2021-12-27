import request from './request';
import qs from 'qs';
import { LoginParams, LoginResult } from '@/models/login';
import { MenuResult, MenuParams } from '@/models/menu';
import { UserResult, UserParams } from '@/models/user';
import { RoleResult, RoleParams } from '@/models/role';
import { DeptResult, DeptParams } from '@/models/dept';

// 菜单查询
export const getMenus = (params: UserParams) => {
  return request.post<ApiResult<UserResult[]>>(`/api/v1/sysMenu/list`, params);
};

export const updateMenu = (params: MenuParams) => {
  return request.put<ApiResult<any>>(`/api/v1/sysMenu/`, params);
};

export const addMenu = (params: MenuParams) => {
  return request.post<ApiResult<any>>(`/api/v1/sysMenu/`, params);
};

export const deleteMenu = (id: number) => {
  return request.delete<ApiResult<any>>(`/api/v1/sysMenu/${id}`);
};
// 部门查询
export const getDepts = (params: DeptParams) => {
  return request.post<ApiResult<DeptResult[]>>(`/api/v1/sysDept/list`, params);
};

export const updateDept = (params: MenuParams) => {
  return request.put<ApiResult<any>>(`/api/v1/sysDept/`, params);
};

export const addDept = (params: MenuParams) => {
  return request.post<ApiResult<any>>(`/api/v1/sysDept/`, params);
};

export const deleteDept = (id: number) => {
  return request.delete<ApiResult<any>>(`/api/v1/sysDept/${id}`);
};
// 角色查询
export const getRoles = (params: RoleParams) => {
  return request.post(`/api/v1/sysRole/list`, params);
};
export const getRole = (params: RoleParams) => {
  return request.get(`/api/v1/sysRole/${params.roleId}`);
};
export const setRoleUsers = (params: { roleId: number; userIds: number[] }) => {
  return request.put(`/api/v1/sysRole/authUser/selectAll?${qs.stringify(params)}`);
};
export const getRoleUsers = (params: RoleParams) => {
  return request.post(`/api/v1/sysRole/authUser/allocatedList/${params.roleId}`, {});
};

export const updateRole = (params: RoleParams) => {
  return request.put<ApiResult<any>>(`/api/v1/sysRole/`, params);
};

export const addRole = (params: RoleParams) => {
  return request.post<ApiResult<any>>(`/api/v1/sysRole/`, params);
};

export const deleteRole = (id: number) => {
  return request.delete<ApiResult<any>>(`/api/v1/sysRole/${id}`);
};
// 用户查询
export const getUsers = (params: UserParams) => {
  return request.post<ApiResult<UserResult[]>>(`/api/v1/sysUser/list`, params);
};

export const getUser = (params: UserParams) => {
  return request.get<ApiResult<UserResult>>(`/api/v1/sysUser/${params.userId}`);
};

export const getUserRoles = (params: UserParams) => {
  return request.get<ApiResult<UserResult>>(`/api/v1/sysUser/authRole/${params.userId}`);
};

export const setUserRoles = (params: UserParams) => {
  return request.put<ApiResult<UserResult>>(`/api/v1/sysUser/authRole?${qs.stringify(params)}`);
};


export const updateUser = (params: UserParams) => {
  return request.put<ApiResult<any>>(`/api/v1/sysUser/`, params);
};

export const addUser = (params: UserParams) => {
  return request.post<ApiResult<any>>(`/api/v1/sysUser/`, params);
};

export const deleteUser = (id: number) => {
  return request.delete<ApiResult<any>>(`/api/v1/sysUser/${id}`);
};

// 登陆相关
export const getUserVcode = () => {
  return request.get(`/auth/captchaImage`);
};

export const login = (params: LoginParams) => {
  return request.post(`/auth/login`, params);
};

export const getCurrentMenus = () => {
  return request.get(`/api/v1/sysMenu/currentUserMenu`);
};
