/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import ProForm, { ProFormText } from "@ant-design/pro-form";
import { Button, Form, notification } from "antd";

import { useRouter } from "next/navigation";
const LoginPage = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const handleFinish = async (value: any) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        value
      );

      if (response.data && response.data.status !== 403) {
        localStorage.setItem("token", response.data.access_token);
        router.push("/user");
      } else {
        notification.error({
          message: response.data.message,
          duration: 2,
        });
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  return (
    <>
      <ProForm
        autoComplete="chrome-off"
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        submitter={{
          render: (props) => {
            return (
              <Button
                style={{
                  width: "100%",
                  fontSize: "16px",
                  fontWeight: 600,
                  textAlign: "center",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
                type="primary"
                onClick={() => {
                  props.form?.submit();
                }}
              >
                Đăng nhập
              </Button>
            );
          },
        }}
      >
        <ProFormText
          name="name"
          label="username"
          rules={[
            {
              required: true,
              message: "Không được bỏ trống trường này",
            },
          ]}
        />
        <ProFormText
          name="password"
          label="password"
          rules={[
            {
              required: true,
              message: "Không được bỏ trống trường này",
            },
          ]}
        />
      </ProForm>
    </>
  );
};
export default LoginPage;
