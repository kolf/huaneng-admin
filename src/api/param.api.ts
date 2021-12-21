import request from './request';
import { ParamResult, ParamParams } from "@/models/param";

// 参数查询
export const getParams = (params: ParamParams) => {
  return request.post<ApiResult<ParamResult[]>>(`/api/v1/sysConfig/list`, params);
};

export const getParam = (params: ParamParams) => {
  return request.get<ApiResult<ParamResult[]>>(`/api/v1/sysConfig/${params.configId}`);
};


export const updateParam = (params: ParamParams) => {
  return request.put<ApiResult<ParamResult>>(`/api/v1/sysConfig/`, params);
};

export const addParam = (params: ParamParams) => {
  return request.post<ApiResult<ParamResult>>(`/api/v1/sysConfig/`, params);
};

export const deleteParam = (id: number) => {
  return request.delete<ApiResult<ParamResult>>(`/api/v1/sysConfig/${id}`);
};