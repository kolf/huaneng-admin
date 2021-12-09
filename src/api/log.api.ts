import request from './request';

export const getSystemLogs = params => {
  return request.post(`/api/v1/sysOperLog/list`, params);
};

export const getSystemLog = params => {
  return request.get(`/api/v1/sysOperLog/${params.operId}`);
};

export const deleteSystemLog = params => {
  return request.delete(`/api/v1/sysOperLog/${params.operId}`);
};

export const clearSystemLog = () => {
  return request.get(`/api/v1/sysOperLog/clean`);
};

// sysLogininfo/clean
export const getLoginLogs = params => {
  return request.post(`/api/v1/sysLogininfo/list`, params);
};

export const getLoginLog = params => {
  return request.get(`/api/v1/sysLogininfo/${params.operId}`);
};

export const deleteLoginLog = params => {
  return request.delete(`/api/v1/sysLogininfo/${params.operId}`);
};

export const clearLoginLog = () => {
  return request.get(`/api/v1/sysLogininfo/clean`);
};
