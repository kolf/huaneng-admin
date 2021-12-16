import React, { FC, useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LoginParams } from '@/models/login';
import { useRecoilState } from 'recoil';
import { userState } from '@/stores/user';
import { Location } from 'history';
import { getUserVcode, login } from '@/api';

import styles from './index.module.less';
import { ReactComponent as LogoSvg } from '@/assets/logo.svg';
import useRequest from '@ahooksjs/use-request';

const Login: FC = () => {
  const [form] = Form.useForm();
  const { data: vcode, run: getVcode } = useRequest(getUserVcode, { formatResult: res => res.data });
  const loginFn = useRequest(login, { manual: true });
  const [user, setUser] = useRecoilState(userState);
  const location = useLocation() as Location<{ from: string }>;
  const navigate = useNavigate();

  useEffect(() => {
    logout();

    if (localStorage.getItem('remember') === '1') {
      const defaultUserName = localStorage.getItem('username');
      form.setFieldsValue({ username: defaultUserName, remember: true });
    }
  }, []);

  const logout = () => {
    setUser({ ...user, logged: false });
    localStorage.removeItem('token');
  };

  const onFinished = async (values: LoginParams) => {
    const res = await loginFn.run({
      ...values,
      uuid: vcode?.uuid as string
    });
    if (res.code !== 200) {
      getVcode();
      message.error(res.message);
      return;
    }
    const { token, sysUser } = res.data;
    setUser({ ...user, logged: true, username: sysUser.userName });
    localStorage.setItem('token', token);
    localStorage.setItem('remember', values.remember ? '1' : '0');
    localStorage.setItem('username', sysUser.userName);
    const from = location.state?.from || { pathname: '/dashboard' };
    navigate(from);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.top}>
          <div className={styles.header}>
            <LogoSvg className={styles.logo} />
            {/* <span className={styles.title}>中国华能</span> */}
          </div>
          <div className={styles.desc}>华能智能调运管理后台</div>
        </div>
        <Form<LoginParams> onFinish={onFinished} form={form}>
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名！' }]}>
            <Input size="large" placeholder="用户名" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码！' }]}>
            <Input type="password" size="large" placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <Form.Item name="captcha" noStyle rules={[{ required: true, message: '请输入验证码' }]}>
              <Input style={{ width: 216 }} size="large" placeholder="请输入验证码" />
            </Form.Item>
            <span className={styles.vcode} onClick={e => getVcode()}>
              {vcode && <img src={`data:image/gif;base64,${vcode?.img}`} />}
            </span>
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>记住用户</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              loading={loginFn.loading}
              block
              size="large"
              className={styles.mainLoginBtn}
              htmlType="submit"
              type="primary"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
