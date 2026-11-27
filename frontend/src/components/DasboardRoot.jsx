import { Outlet } from "react-router-dom";
import DashboardNav from "./DashboardNav";

export default function DashboardRootLayout () {
    return (
      <div style={{ width: "100%", minHeight: "100vh" }}>
        <div>
          <DashboardNav />
        </div>
        <div
          style={{
            width: "100%",
            backgroundColor: "#E1F0E1",
            minHeight: "15.625rem",
            paddingLeft: "11.25rem",
            paddingTop: "7.5rem",
          }}
        >
          <Outlet />
        </div>
      </div>
    );
}