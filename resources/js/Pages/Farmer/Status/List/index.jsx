/* eslint-disable react/display-name */
import React from "react";
import { Table, Tag } from "antd";

const CheckStatusList = ({ applied }) => {
    const [page, setPage] = React.useState(1);
    const columns = [
        {
            title: "Sl No.",
            key: "index",
            render: (value, item, index) => (page - 1) * 10 + index + 1,
        },
        {
            title: "Application",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Subject",
            dataIndex: "subject",
            key: "subject",
        },
        {
            title: "Status",
            dataIndex: "approved_status",
            key: "approved_status",
            render: (record, obj) => {
                console.log(obj);
                if (obj.rejected_status) {
                    return <Tag color="red">Rejected</Tag>;
                }
                if (obj.approved_status) {
                    return <Tag color="green">Approved</Tag>;
                }
                return <Tag color="gold">Pending</Tag>;
            },
        },
    ];

    return (
        <>
            <Table
                bordered
                dataSource={applied}
                columns={columns}
                pagination={{
                    onChange(current) {
                        setPage(current);
                    },
                }}
            />
        </>
    );
};

export default CheckStatusList;
