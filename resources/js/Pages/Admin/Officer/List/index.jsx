import React from "react";
import { Table, Button } from "antd";
import { Inertia } from "@inertiajs/inertia";

const OfficersList = ({ officers }) => {
    console.log(officers);
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
            <Button
                htmlType="button"
                className="float-right"
                type="primary"
                onClick={() => {
                    Inertia.get(`/admin/officer/create`);
                }}
            >
                Add
            </Button>
            <Table
                bordered
                dataSource={officers}
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
                                `/admin/officer/${record.user_id}/edit`
                            );
                        },
                    };
                }}
            />
        </>
    );
};

export default OfficersList;
