/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Form, Input, Button, Upload, Select, DatePicker, message } from "antd";
import { Inertia } from "@inertiajs/inertia";
import { UploadOutlined } from "@ant-design/icons";

const Register = () => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const [image, setImage] = useState("");
    const onFinish = (values) => {
        const data = { ...values, document: image };
        Inertia.post(`/user/register`, data);
    };

    function customRequest(option) {
        const formData = new FormData();
        formData.append("files[]", option.file);
        const reader = new FileReader();
        reader.readAsDataURL(option.file);
        reader.onloadend = function (e) {
            setImage(e.target.result);
            if (e && e.target && e.target.result) {
                option.onSuccess();
            }
        };
    }

    function beforeUpload(file) {
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("Only upload JPG or PNG files!");
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Image size must be less than 2MB!");
            return false;
        }
        return isJpgOrPng && isLt2M;
    }

    const props = {
        customRequest: customRequest,
        showUploadList: true,
        beforeUpload: beforeUpload,
    };

    return (
        <div className="container p-5">
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
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
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
                    <Select defaultValue="select" style={{ width: "100%" }}>
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
                    name="dob"
                    label="Date of birth"
                    rules={[
                        {
                            required: true,
                            message: "Please input your date of birth!",
                        },
                    ]}
                    hasFeedback
                >
                    <DatePicker />
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

                <Form.Item
                    label="Document"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Document!",
                        },
                    ]}
                    valuePropName="fileList"
                >
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>
                            Click to Upload
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;
