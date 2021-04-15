import React from "react";
import { Table } from "antd";

const FarmerList = ({ farmers }) => {
    const [page, setPage] = React.useState(1);
    const columns = [
        {
            title: "Sl No.",
            key: "index",
            render: (value, item, index) => (page - 1) * 10 + index + 1,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "25%",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "25%",
        },
        {
            title: "Place",
            dataIndex: "place",
            key: "place",
            width: "25%",
        },
        {
            title: "District",
            dataIndex: "district",
            key: "district",
            width: "25%",
        },
    ];

    return (
        <>
            <Table
                bordered
                dataSource={farmers}
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

export default FarmerList;
