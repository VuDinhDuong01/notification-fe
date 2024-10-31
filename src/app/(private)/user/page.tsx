/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import axios from 'axios'
import ProForm, { ProFormText } from "@ant-design/pro-form"
import { Button, Form } from "antd"

const UserPage = () => {
    const [form] = Form.useForm()
    const handleFinish = async (value: any) => {
        try{
            const response = await axios.post("http://localhost:4000/api/v1/user", value)
            localStorage.setItem("user_id",response.data._id)
        }catch(error:any){
            console.log(error)
        }
    }
    return <>
        <ProForm
            autoComplete="chrome-off"
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            submitter={{
                render: (props) => {
                    return (

                        <Button
                            style={{ width: "100%", fontSize: '16px', fontWeight: 600, textAlign: 'center', alignItems: 'center', display: 'flex', justifyContent: 'center' }}
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
                name="username"
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


}
export default UserPage