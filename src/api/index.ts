

import { useRequest } from 'ahooks'
import { BaseOptions, OptionsWithFormat } from '@ahooksjs/use-request/lib/types'
import request from './request';
import qs from 'qs';
import { CurrentUserResult, VcodeResult } from '@/models/user';
import { LoginParams, LoginResult } from '@/models/login';
import { MenuResult, MenuParams } from '@/models/menu'

type Result<T> = {
  code: number;
  message: string;
  data: T
}

export const getCurrentMenus = () => {
  return request.get(`/api/v1/sysMenu/currentUserMenu`)
}

export const useGetMenus = (params: MenuParams) => {
  return useRequest<Result<MenuResult[]>>(() => request.post(`/api/v1/sysMenu/list`, params), { refreshDeps: [params] })
}

export const useGetRoles = (params: MenuParams) => {
  return useRequest<Result<MenuResult[]>>(() => request.post(`/api/v1/sysRole/list`, params), { refreshDeps: [params], formatResult: res => res.data })
}
export const useGetDepts = (params: MenuParams) => {
  return useRequest<Result<MenuResult[]>>(() => request.post(`/api/v1/sysDept/list`, params), { refreshDeps: [params] })
}
export const useGetUsers = (params: MenuParams) => {
  return useRequest<Result<MenuResult[]>>(() => request.post(`/api/v1/sysUser/list`, params), { refreshDeps: [params], formatResult: res => res.data })
}

export const useGetVcode = () => {
  return useRequest<Result<VcodeResult>>(() => request.get(`/auth/captchaImage`), { formatResult: res => res.data })
}

export const useLogin = () => {
  return useRequest<Result<LoginResult>>((data) => request.post(`/auth/login`, data), { manual: true })
}
