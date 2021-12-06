import { Device } from '@/models';
import { MenuChild } from '@/models/menu.interface';
import { Role } from './login';

export type Locale = 'zh-cn' | 'en-us';

export interface CurrentUserResult {
  username: string;
  role: Role;
}

export interface User {
  username: string;

  /** menu list for init tagsView */
  menuList: MenuChild[];

  /** login status */
  logged: boolean;

  role: Role;

  /** user's device */
  device: Device;

  /** menu collapsed status */
  collapsed: boolean;
  avatar: string;
}

export interface VcodeResult {
  uuid: string;
  img: string;
}
