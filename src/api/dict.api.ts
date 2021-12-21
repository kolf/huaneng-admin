import request from './request';
import { DictResult, DictParams } from "@/models/dict";

// 参数查询
export const getDicts = (params: DictParams) => {
  return request.post<ApiResult<DictResult[]>>(`/api/v1/sysDictData/list`, params);
};

export const getDict = (params: DictParams) => {
  return request.get<ApiResult<DictResult[]>>(`/api/v1/sysDictData/${params.dictCode}`);
};



export const updateDict = (params: DictParams) => {
  return request.put<ApiResult<DictResult>>(`/api/v1/sysDictData/`, params);
};

export const addDict = (params: DictParams) => {
  return request.post<ApiResult<DictResult>>(`/api/v1/sysDictData/`, params);
};

export const deleteDict = (id: number) => {
  return request.delete<ApiResult<DictResult>>(`/api/v1/sysDictData/${id}`);
};