import React from "react";
import { Form, Input, Button } from "antd";
import { Inertia } from "@inertiajs/inertia";

const OfficerAdd = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        Inertia.post(`/admin/officer`, values);
    };

    return (
        <Form
            className="text-left"
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
            scrollToFirstError
        >
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: "Please input your Name!",
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: "email",
                        message: "The input is not valid E-mail!",
                    },
                    {
                        required: true,
                        message: "Please input your E-mail!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(
                                new Error(
                                    "The two passwords that you entered do not match!"
                                )
                            );
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="place"
                label="Place"
                rules={[
                    {
                        required: true,
                        message: "Please input your place!",
                    },
                ]}
                hasFeedback
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="district"
                label="District"
                rules={[
                    {
                        required: true,
                        message: "Please input your district!",
                    },
                ]}
            >
                <Input
                    style={{
                        width: "100%",
                    }}
                />
            </Form.Item>
            <Form.Item
                name="phone"
                label="Phone"
                rules={[
                    {
                        required: true,
                        message: "Please input your phone!",
                    },
                ]}
            >
                <Input
                    addonBefore="+91"
                    style={{
                        width: "100%",
                    }}
                />
            </Form.Item>
            <Form.Item
                name="address"
                label="Address"
                rules={[
                    {
                        required: true,
                        message: "Please input your address!",
                    },
                ]}
            >
                <Input.TextArea
                    style={{
                        width: "100%",
                    }}
                />
            </Form.Item>
            <Form.Item
                name="pincode"
                label="Pincode"
                rules={[
                    {
                        required: true,
                        message: "Please input your pincode!",
                    },
                ]}
            >
                <Input
                    style={{
                        width: "100%",
                    }}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export default OfficerAdd;
