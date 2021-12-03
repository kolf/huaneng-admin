import React, { FC, useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { LoginParams } from "@/models/login";
// import { loginAsync } from '@/stores/user.store';
// import { useAppDispatch } from '@/stores';
import { Location } from "history";
import { useLogin, useGetVcode } from "@/api";

import styles from "./index.module.less";
import { ReactComponent as LogoSvg } from "@/assets/logo/logo.svg";

const LoginForm: FC = () => {
  const loginMutation = useLogin();
  const { data: vcode, refetch: refetchVcode } = useGetVcode()
  const navigate = useNavigate();
  const location = useLocation() as Location<{ from: string }>;

  const onFinished = async (values: LoginParams) => {
    const res = await loginMutation.mutateAsync({
      ...values,
      uuid: vcode?.uuid as string
    });
    if (res.code !== 200) {
      refetchVcode()
      message.error(res.message)
      return
    }

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("username", res.data.sysUser.userName);
    const from = location.state?.from || { pathname: "/dashboard" };
    navigate(from);

  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <LogoSvg className={styles.logo} />
          <span className={styles.title}>中国华能</span>
        </div>
        <div className={styles.desc}>智能调运管理后台</div>
      </div>
      <div className={styles.main}>
        <Form<LoginParams> onFinish={onFinished}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入用户名！" }]}
          >
            <Input size="large" placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码！" }]}
          >
            <Input type="password" size="large" placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <Form.Item
              name="captcha"
              noStyle
              rules={[
                { required: true, message: "请输入验证码" },
              ]}
            >
              <Input
                style={{ width: 216 }}
                size="large"
                placeholder="请输入验证码"

              />

            </Form.Item>
            <span className={styles.vcode} onClick={e => refetchVcode()}><img src={`data:image/gif;base64,${vcode?.img}`} /></span>
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>记住用户</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              block
              loading={loginMutation.isLoading}
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

export default LoginForm;
