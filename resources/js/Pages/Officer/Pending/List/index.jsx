import React from "react";
import { Table } from "antd";
import { Inertia } from "@inertiajs/inertia";

const PendingList = ({ pending }) => {
    const [page, setPage] = React.useState(1);
    const columns = [
        {
            title: "Sl No.",
            key: "index",
            render: (value, item, index) => (page - 1) * 10 + index + 1,
        },
        {
            title: "Applicant Name",
            dataIndex: "name",
            key: "name",
            width: "25%",
        },
        {
            title: "Application",
            dataIndex: "title",
            key: "title",
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
                dataSource={pending}
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
                                `/officer/pending-application/${record.farmer_id}/${record.application_id}/view`
                            );
                        },
                    };
                }}
            />
        </>
    );
};

export default PendingList;
