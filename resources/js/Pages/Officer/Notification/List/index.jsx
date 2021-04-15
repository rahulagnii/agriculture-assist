import React from "react";
import { Table, Button } from "antd";
import { Inertia } from "@inertiajs/inertia";
import moment from "moment";

const NotificationList = ({ notifications }) => {
    console.log(notifications);
    const [page, setPage] = React.useState(1);
    const columns = [
        {
            title: "Sl No.",
            key: "index",
            render: (value, item, index) => (page - 1) * 10 + index + 1,
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            width: "25%",
        },
        {
            title: "Subject",
            dataIndex: "subject",
            key: "subject",
            width: "25%",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            width: "25%",
        },
        {
            title: "Last Date",
            dataIndex: "last_date",
            key: "last_date",
            width: "25%",
            render: (record) => {
                return moment(record).format("YYYY-MM-DD");
            },
        },
    ];

    return (
        <>
            <Button
                htmlType="button"
                className="float-right"
                type="primary"
                onClick={() => {
                    Inertia.get(`/officer/notification/create`);
                }}
            >
                Add
            </Button>
            <Table
                bordered
                dataSource={notifications}
                columns={columns}
                pagination={{
                    onChange(current) {
                        setPage(current);
                    },
                }}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            Inertia.get(
                                `/officer/notification/${record.id}/edit`
                            );
                        },
                    };
                }}
            />
        </>
    );
};

export default NotificationList;
