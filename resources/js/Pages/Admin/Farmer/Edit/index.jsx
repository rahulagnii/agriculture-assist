import React, { useState } from "react";
import { Form, Input, Button, Select, Upload, DatePicker, message } from "antd";
import { Inertia } from "@inertiajs/inertia";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";

const FarmerEdit = ({ user, farmer }) => {
    const [form] = Form.useForm();
    const [image, setImage] = useState(farmer.document);
    const { Option } = Select;
    const onFinish = (values) => {
        const data = { ...values, document: image };
        Inertia.put(`/admin/farmer/${user.id}`, data);
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
                dob: moment(farmer.dob),
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

            <Form.Item label="Document">
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
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
