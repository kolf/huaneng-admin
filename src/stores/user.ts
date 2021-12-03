import { atom } from 'recoil';

import { Role } from '@/models/login';
import { Locale, User } from '@/models/user';
import { getGlobalState } from '@/models';

const initialState: User = {
  ...getGlobalState(),
  locale: (localStorage.getItem('locale')! ||
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    'en-us') as Locale,
  logged: false,
  menuList: [],
  username: localStorage.getItem('username') || '',
  role: (localStorage.getItem('username') || '') as Role,
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
};

export const userState = atom({
  key: 'userState',
  default: initialState
});
