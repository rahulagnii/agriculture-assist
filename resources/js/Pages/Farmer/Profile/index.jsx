import React from "react";
import { Form, Input, Button, Select } from "antd";
import { Inertia } from "@inertiajs/inertia";

const FarmerEdit = ({ user, farmer }) => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const onFinish = (values) => {
        const data = {
            place: values.place,
            district: values.district,
            phone: values.phone,
            address: values.address,
            pincode: values.pincode,
            aadhar_id: values.aadhar_id,
            agriculture_type: values.agriculture_type,
            gender: values.gender,
        };
        Inertia.put(`/farmer/profile/${farmer.id}`, data);
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
                place: farmer.place,
                district: farmer.district,
                phone: farmer.phone,
                address: farmer.address,
                pincode: farmer.pincode,
                aadhar_id: farmer.aadhar_id,
                agriculture_type: farmer.agriculture_type,
                gender: farmer.gender,
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
                <Input disabled />
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
                name="gender"
                label="Gender"
                rules={[
                    {
                        required: true,
                        message: "Please input your gender!",
                    },
                ]}
                hasFeedback
            >
                <Select style={{ width: "100%" }}>
                    <Option disabled value="select">
                        Select
                    </Option>
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                </Select>
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

            <Form.Item
                name="aadhar_id"
                label="Aadhar id"
                rules={[
                    {
                        required: true,
                        message: "Please input your aadhar ID!",
                        max: 12,
                        min: 12,
                    },
                ]}
                hasFeedback
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="agriculture_type"
                label="Agriculture type"
                rules={[
                    {
                        required: true,
                        message: "Please input your agriculture type!",
                    },
                ]}
                hasFeedback
            >
                <Input />
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
                        Inertia.delete(`/admin/farmer/${farmer.user_id}`);
                    }}
                >
                    Delete
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FarmerEdit;
