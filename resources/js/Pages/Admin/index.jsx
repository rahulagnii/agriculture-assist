import { Card } from "antd";
import React from "react";

const Admin = ({ farmers, officers, applications, applied }) => {
    const gridStyle = {
        width: "25%",
        textAlign: "center",
        color: "#fff",
        borderRadius: 10,
        margin: 10,
    };
    return (
        <Card bordered={false} style={{ background: "#f9f9f9" }}>
            <div className="d-flex justify-content-center">
                <Card.Grid style={{ ...gridStyle, background: "#ef476f" }}>
                    <h5 style={{ color: "#fff" }}>Farmers</h5>
                    <div style={{ fontSize: 50, fontWeight: "bolder" }}>
                        {farmers}
                    </div>
                </Card.Grid>
                <Card.Grid style={{ ...gridStyle, background: "#ffd166" }}>
                    <h5 style={{ color: "#fff" }}>Officers</h5>
                    <div style={{ fontSize: 50, fontWeight: "bolder" }}>
                        {officers}
                    </div>
                </Card.Grid>
                <Card.Grid style={{ ...gridStyle, background: "#06d6a0" }}>
                    <h5 style={{ color: "#fff" }}>Applications available</h5>
                    <div style={{ fontSize: 50, fontWeight: "bolder" }}>
                        {applications}
                    </div>
                </Card.Grid>
                <Card.Grid style={{ ...gridStyle, background: "#118ab2" }}>
                    <h5 style={{ color: "#fff" }}>Applied applications</h5>
                    <div style={{ fontSize: 50, fontWeight: "bolder" }}>
                        {applied}
                    </div>
                </Card.Grid>
            </div>
        </Card>
    );
};

export default Admin;
