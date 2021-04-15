import { Inertia } from "@inertiajs/inertia";
import { Button, Card, Image } from "antd";
import React from "react";
import idcard from "./idcard.jpg";

const PendingView = ({ application, user, farmer }) => {
    return (
        <div>
            <Card
                title={`Application for ${application.title}`}
                bordered={false}
            >
                <div className="row">
                    <div className="col-6">
                        <p>Name :{user[0].name} </p>
                        <p>Email :{user[0].email} </p>
                        <p>Gender :{farmer.gender} </p>
                        <p>Place :{farmer.place} </p>
                        <p>District :{farmer.district} </p>
                        <p>Address :{farmer.address} </p>
                        <p>Pincode :{farmer.pincode} </p>
                        <div>{}</div>
                    </div>
                    <div className="col-6">
                        <Image src={farmer?.document || idcard} />
                    </div>
                    <Button
                        style={{
                            background: "green",
                            marginRight: 10,
                            color: "#fff",
                            borderRadius: 5,
                        }}
                        onClick={() => {
                            const data = {
                                application_id: application.id,
                                farmer_id: farmer.id,
                                status: true,
                            };
                            Inertia.put(
                                `/officer/approve-application/${farmer.id}`,
                                data
                            );
                        }}
                    >
                        Approve
                    </Button>
                    <Button
                        style={{
                            background: "red",
                            marginRight: 10,
                            color: "#fff",
                            borderRadius: 5,
                        }}
                        onClick={() => {
                            const data = {
                                application_id: application.id,
                                farmer_id: farmer.id,
                                status: false,
                            };
                            Inertia.put(
                                `/officer/reject-application/${farmer.id}`,
                                data
                            );
                        }}
                    >
                        Reject
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default PendingView;
