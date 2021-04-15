import React from "react";
import { Form, Input, Button, DatePicker } from "antd";
import { Inertia } from "@inertiajs/inertia";
import moment from "moment";

const NotificationAdd = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const data = { ...values, date: moment().format("YYYY-MM-DD") };
        Inertia.post(`/officer/notification`, data);
    };

    return (
        <Form
            className="text-left"
            form={form}
            name="notification"
            onFinish={onFinish}
            layout="vertical"
            scrollToFirstError
        >
            <Form.Item
                name="title"
                label="Title"
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
                name="subject"
                label="Subject"
                rules={[
                    {
                        required: true,
                        message: "Please input your subject!",
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="description"
                label="Description"
                rules={[
                    {
                        required: true,
                        message: "Please input your description!",
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
                name="last_date"
                label="Last date"
                rules={[
                    {
                        required: true,
                        message: "Please input last date!",
                    },
                ]}
                hasFeedback
            >
                <DatePicker />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export default NotificationAdd;
