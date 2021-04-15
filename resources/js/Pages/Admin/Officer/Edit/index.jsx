import React from "react";
import { Form, Input, Button } from "antd";
import { Inertia } from "@inertiajs/inertia";

const OfficerEdit = ({ user, officer }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        Inertia.put(`/admin/officer/${user.id}`, values);
    };

    return (
        <Form
            className="text-left"
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{
                name: user.name,
                email: user.email,
                place: officer.place,
                district: officer.district,
                phone: officer.phone,
                address: officer.address,
                pincode: officer.pincode,
            }}
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
                <Input disabled />
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
                <Button
                    htmlType="button"
                    className="float-right"
                    danger
                    onClick={() => {
                        Inertia.delete(`/admin/officer/${officer.user_id}`);
                    }}
                >
                    Delete
                </Button>
            </Form.Item>
        </Form>
    );
};

export default OfficerEdit;
