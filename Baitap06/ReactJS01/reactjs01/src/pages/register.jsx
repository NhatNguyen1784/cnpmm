import React from "react";
import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { createUserApi } from "../util/api";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const RegisterPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { name, email, password } = values;
    const res = await createUserApi(name, email, password);

    if (res) {
      notification.success({
        message: "CREATE USER",
        description: "Success",
      });
      navigate("/login");
    } else {
      notification.error({
        message: "CREATE USER",
        description: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] py-6 px-2">
      <div className="w-full max-w-md bg-white/95 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
          Đăng ký
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

          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full font-semibold mt-2"
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
        <Link to={"/"} className="block mt-2 text-indigo-600 hover:underline">
          <ArrowLeftOutlined /> Quay lại trang chủ
        </Link>
        <Divider />
        <div className="text-center">
          Đã có tài khoản?{" "}
          <Link
            to={"/login"}
            className="text-indigo-600 hover:underline font-medium"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
