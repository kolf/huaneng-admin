/** user's role */
export type Role = 'guest' | 'admin';

export interface LoginParams {
  /** 用户名 */
  username: string;
  /** 用户密码 */
  password: string;
  captcha: string;
  uuid: string;
}

export interface LoginResult {
  /** auth token */
  token: string;
  sysUser: {
    userName: string;
  };
}

export interface LogoutParams {
  token: string;
}

export interface LogoutResult {}
