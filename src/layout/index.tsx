import React, { useEffect, FC } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { HomeOutlined } from '@ant-design/icons';
import RightContent from './components/RightContent';
import { userState } from '@/stores/user';
import { useRecoilState } from 'recoil';
import { getCurrentMenus } from '@/api';
import arrayToTree from '@/utils/arrayToTree';

const makeData = (data: any) => {
  if (!data) {
    return [];
  }
  return arrayToTree(
    data.map((item: any) => ({
      id: item.menuId,
      parentId: item.parentId,
      name: item.menuName,
      path: item.path
    })),
    { id: 'id', parentId: 'parentId' }
  );
};

const Layout: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [navigate, location]);

  const toggle = () => {
    setUser({ ...user, collapsed: false });
  };

  return (
    <ProLayout
      fixSiderbar
      fixedHeader
      title="中国华能"
      iconfontUrl='//at.alicdn.com/t/font_2990028_zmtyfvj6ftp.js'
      menu={{
        request: async () => {
          const res = await getCurrentMenus();
          return [
            {
              path: '/dashboard',
              name: '首页',
              icon: 'icon-shouye'
            },
            ...makeData(res.data)
          ];
        }
      }}
      location={{
        pathname: location.pathname
      }}
      rightContentRender={() => <RightContent />}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || !menuItemProps.path || location.pathname === menuItemProps.path) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
    >
      <Outlet />
    </ProLayout>
  );
};

export default Layout;
