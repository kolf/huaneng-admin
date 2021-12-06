import { atom } from 'recoil';
import { Role } from '@/models/login';
import { User } from '@/models/user';
import { getGlobalState } from '@/models';

const initialState: User = {
  ...getGlobalState(),
  logged: !!localStorage.getItem('token'),
  menuList: [],
  username: localStorage.getItem('username') || '',
  role: (localStorage.getItem('username') || '') as Role,
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
};

export const userState = atom({
  key: 'userState',
  default: initialState
});
