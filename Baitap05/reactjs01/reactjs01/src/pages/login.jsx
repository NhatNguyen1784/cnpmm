import React, { useContext } from "react";
import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { loginApi } from "../util/api";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const onFinish = async (values) => {
    const { email, password } = values;
    const res = await loginApi(email, password);

    if (res && res.EC === 0) {
      localStorage.setItem("access_token", res.access_token);
      notification.success({
        message: "LOGIN USER",
        description: "Success",
      });
      setAuth({
        isAuthenticated: true,
        user: {
          email: res.user?.email ?? "",
          name: res.user?.name ?? "",
        },
      });
      navigate("/");
    } else {
      notification.error({
        message: "LOGIN USER",
        description: res?.EM ?? "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] py-6 px-2">
      <div className="w-full max-w-md bg-white/95 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
          Đăng nhập
        </h2>
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full font-semibold mt-2"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <Link to={"/"} className="block mt-2 text-indigo-600 hover:underline">
          <ArrowLeftOutlined /> Quay lại trang chủ
        </Link>
        <Divider />
        <div className="text-center">
          Chưa có tài khoản?{" "}
          <Link
            to={"/register"}
            className="text-indigo-600 hover:underline font-medium"
          >
            Đăng ký tại đây
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
