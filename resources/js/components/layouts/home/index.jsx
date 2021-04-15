import { Inertia } from "@inertiajs/inertia";
import { Image, Layout, Menu } from "antd";
import agri from "./agri.png";

const { Header, Content, Footer } = Layout;

const HomeLayout = ({ children }) => {
    return (
        <Layout>
            <Header style={{ width: "100%" }}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{ textAlign: "right" }}
                >
                    <Menu.Item
                        onClick={() => {
                            Inertia.get("/");
                        }}
                        style={{ float: "Left" }}
                        key="1"
                    >
                        <div>
                            <Image
                                preview={false}
                                style={{
                                    verticalAlign: "middle",
                                    width: 40,
                                    height: 40,
                                    display: "unset",
                                }}
                                src={agri}
                            />
                        </div>
                    </Menu.Item>
                    <Menu.Item
                        onClick={() => {
                            Inertia.get("/user/register");
                        }}
                        key="2"
                    >
                        Register
                    </Menu.Item>
                    <Menu.Item
                        onClick={() => {
                            window.open("/login", "_self");
                        }}
                        key="3"
                    >
                        Login
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ minHeight: "100vh" }}>{children}</Content>
            <Footer style={{ textAlign: "center" }}>
                Aggriculture assist ©2021
            </Footer>
        </Layout>
    );
};
export default HomeLayout;
