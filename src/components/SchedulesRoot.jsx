import { Outlet } from "react-router-dom";
import DashboardNav from "./DashboardNav";

export default function SchedulesRootLayout() {
  return (
    <div style={{ width: "100%" }}>
      <div>
        <DashboardNav />
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "#E1F0E1",
          minHeight: "250px",
          paddingLeft: "180px",
          paddingTop: "120px",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
