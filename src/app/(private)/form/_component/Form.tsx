/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form as AntdForm, Button } from "antd";
import {
  ProForm,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { useEffect, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { getDataFromLS } from "@/app/util/localStorage";
import { postForm } from "@/app/util/api/query";
import { decodeJWT } from "@/app/util/decodeJWT";

const Form = () => {
  const [users, setUsers] = useState([]);

  const postFormMutation = useMutation({
    mutationFn: (body: any) => postForm(body),
  });

  const decodeToken = decodeJWT(getDataFromLS() as string ) as {user_id : string }
  const handleFinish = async () => {
    const id = uuidv4();
    const value = form.getFieldsValue();
    const payload = {
      ...value,
      sender_notification: decodeToken.user_id,
      check_view_notification: false,
      id: id,
    };
    await  postFormMutation.mutateAsync(payload)
  };
  const [form] = AntdForm.useForm();

  useEffect(() => {
    const getAllUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/user");
        setUsers(response.data);
      } catch (error: any) {
        console.log(error);
      }
    };
    getAllUser();
  }, []);

  const listUserSelectOption = useMemo(() => {
    return users.map((user) => {
      return {
        value: (user as any).id,
        label: (user as any).name,
      };
    });
  }, [users]);

  return (
    <div>
      <ProForm
        autoComplete="chrome-off"
        form={form}
        layout="vertical"
        submitter={{
          render: () => null,
        }}
      >
        <ProFormText name="content" />

        <ProFormSelect
          name="receiver_notification"
          options={listUserSelectOption as any}
        />
        <Button onClick={handleFinish}>Submit</Button>
      </ProForm>
    </div>
  );
};

export default Form;
