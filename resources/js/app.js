require("./bootstrap");

import { App } from "@inertiajs/inertia-react";
import React from "react";
import { render } from "react-dom";
import "./App.css";
import AdminLayout from "./components/layouts/admin";
import FarmerLayout from "./components/layouts/farmer";
import HomeLayout from "./components/layouts/home";
import OfficerLayout from "./components/layouts/officer";

const el = document.getElementById("app");

render(
    <App
        initialPage={JSON.parse(el.dataset.page)}
        resolveComponent={(name) =>
            import(`./Pages/${name}`).then(({ default: page }) => {
                if (page.layout === undefined && name.startsWith("Admin/")) {
                    page.layout = (page) => <AdminLayout children={page} />;
                }
                if (page.layout === undefined && name.startsWith("Officer/")) {
                    page.layout = (page) => <OfficerLayout children={page} />;
                }
                if (page.layout === undefined && name.startsWith("Farmer/")) {
                    page.layout = (page) => <FarmerLayout children={page} />;
                }
                if (page.layout === undefined && name.startsWith("Home/")) {
                    page.layout = (page) => <HomeLayout children={page} />;
                }
                return page;
            })
        }
    />,
    el
);
