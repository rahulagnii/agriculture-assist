import { Carousel } from "antd";
import a from "./assets/1.jpg";
import b from "./assets/2.jpg";
import "./style.css";

const Home = () => {
    return (
        <Carousel autoplay>
            <div className="text-center justify-content-center align-items-center">
                <h2
                    style={{
                        backgroundImage: `url('${a}')`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        height: "568px",
                        fontSize: 80,
                        fontFamily: "Poppins,sans-serif",
                        color: "#fff",
                        paddingTop: 120,
                    }}
                >
                    Agriculture <br />
                    Assist.
                </h2>
            </div>
            <div className="text-center justify-content-center align-items-center">
                <h2
                    style={{
                        backgroundImage: `url('${b}')`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        height: "568px",
                        fontSize: 80,
                        fontFamily: "Poppins,sans-serif",
                        color: "#fff",
                        paddingTop: 120,
                    }}
                >
                    Agriculture <br />
                    Assist.
                </h2>
            </div>
        </Carousel>
    );
};
export default Home;
