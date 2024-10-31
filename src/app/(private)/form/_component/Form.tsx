/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form as AntdForm, Button } from "antd";
import { ProForm, ProFormSelect } from "@ant-design/pro-components";
import { useEffect, useMemo, useState } from "react";
import { disconnectSocket, initializeSocket } from '@/socket'
import axios from "axios";
const Form = () => {
    const [dataForm, setDataForm]= useState(null)
    const [users, setUsers]= useState([])
  const handleFinish = () => {
     const value = form.getFieldsValue();
     setDataForm(value)
  };
  const [form] = AntdForm.useForm();


  useEffect(()=>{
      const socket = initializeSocket()
      if (socket) {
          socket.emit("form-data", dataForm, (value: any) => {
              console.log("value:", value)
          })
          console.log("connected", socket.id)
      } 

      return () => {
          disconnectSocket(); 
      };
  },[ dataForm])


  useEffect(()=>{
    const getAllUser=async()=>{
      try{
        const response = await axios.get("http://localhost:4000/api/v1/user");
        setUsers(response.data.data)
      }catch(error:any){
      console.log(error)
      }
    }
    getAllUser()
  },[])

  const listUserSelectOption= useMemo(()=>{
    return users.map(user=>{
      return {
        _id: (user as any)._id,
        username: (user as any).username
      }
    })
  },[users])

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
        <ProFormSelect
          name="content"
          options={[
            {
              key: "9a",
              value: "9a",
            },
            {
              key: "9b",
              value: "9b",
            },
            {
              key: "9c",
              value: "9c",
            },
          ]}
        />

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
