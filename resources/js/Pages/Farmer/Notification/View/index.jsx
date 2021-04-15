import React from "react";
import { Button, Card } from "antd";
import { Inertia } from "@inertiajs/inertia";
import moment from "moment";

const NotificationView = ({ application, applied }) => {
    const onFinish = () => {
        const data = { application_id: application.id };
        Inertia.post(`/farmer/application/apply`, data);
    };

    return (
        <>
            <div className="d-flex">
                <Card
                    style={{ width: "100%" }}
                    actions={[
                        <Button
                            type="primary"
                            onClick={onFinish}
                            disabled={applied?.length !== 0}
                            key="apply"
                        >
                            {applied?.length === 0 ? "Apply" : "Applied"}
                        </Button>,
                    ]}
                >
                    <div style={{ minHeight: 400 }}>
                        <h1 style={{ textAlign: "center" }}>
                            {application.title}a
                        </h1>
                        <h4 style={{ marginTop: 100 }}>
                            sub : {application.subject}a
                        </h4>
                        <h5 style={{ textAlign: "center" }}>
                            {application.description}a
                        </h5>
                    </div>
                    <div>
                        Date : {moment(application.date).format("DD/MM/YYYY")}
                    </div>
                    <div>
                        End date :{" "}
                        {moment(application.last_date).format("DD/MM/YYYY")}
                    </div>
                </Card>
            </div>
        </>
    );
};

export default NotificationView;
