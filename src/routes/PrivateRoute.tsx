import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Result, Button } from "antd";
import { useLocation } from "react-router";

interface Props {
  element?: any;
}

const PrivateRoute: FC<Props> = (props) => {
  const logged = true;
  const navigate = useNavigate();
  const location = useLocation();

  console.log(props, "props");

  return logged ? (
    props.element
  ) : (
    <Result
      status="403"
      title="403"
      subTitle="对不起，您没有权限访问此页。"
      extra={
        <Button
          type="primary"
          onClick={() =>
            navigate("/dashboard", {
              replace: true,
              state: { from: location.pathname },
            })
          }
        >
          返回首页
        </Button>
      }
    />
  );
};

export default PrivateRoute;
