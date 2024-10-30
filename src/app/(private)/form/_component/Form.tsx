'use client'
import { Form as AntdForm }from"antd"
import {
    ProForm,
    ProFormSelect,
} from "@ant-design/pro-components";

const Form = () => {
    const handleFinish=()=>{

    }
    const [form] = AntdForm.useForm();
    return (
        <div>
            <ProForm
                autoComplete="chrome-off"
                form={form}
                layout="vertical"
                submitter={{
                    render: () => null,
                }}
                onFinish={handleFinish}
            >
                <ProFormSelect name="title" initialValue={[
                    {
                        key: "9a",
                        value: "9a"
                    },
                    {
                        key: "9b",
                        value: "9b"
                    },
                    {
                        key: "9c",
                        value: "9c"
                    },

                ]} />
            </ProForm>
        </div>
    )
}

export default Form
