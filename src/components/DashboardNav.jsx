import * as React from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';

import haceyLogo from "../assets/hacey-svg.svg";
import avatar from "../assets/avatar.svg";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import WcIcon from "@mui/icons-material/Wc";
import EscalatorWarningRoundedIcon from "@mui/icons-material/EscalatorWarningRounded";
import VaccinesRoundedIcon from "@mui/icons-material/VaccinesRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import NotificationsNoneSharpIcon from "@mui/icons-material/NotificationsNoneSharp";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { removeToken } from "../query";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function DashboardNav() {

  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  const [isActiveHome, setIsActiveHome] = React.useState(null);
  const [isActiveChildren, setIsActiveChildren] = React.useState(null);
  const [isActiveParent, setIsActiveParent] = React.useState(null);
  const [isActiveVaccine, setIsActiveVaccine] = React.useState(null);
  const [isActiveSchedule, setIsActiveSchedule] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let pageName;

  if (location.pathname === "/dashboard") {
    pageName = "Home";
  } else if (location.pathname === "/children") {
    pageName = "Children";
  } else if (location.pathname === "/parents") {
    pageName = "Parents";
  } else if (location.pathname === "/vaccines") {
    pageName = "Vaccines";
  } else if (location.pathname === "/schedules") {
    pageName = "Schedules";
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "#1F8E1F",
          width: "122px",
          position: "fixed",
          left: 0,
          top: 0,
          height: "100%",
          zIndex: 1000,
          justifyContent: "space-between",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="standard"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
            bgcolor: "#1F8E1F",
            width: "100%",
            paddingTop: "100px",
            zIndex: 1000,

            maxWidth: "122px",

            "& .MuiTab-root": {
              transition: "none", // Remove animation on hover
            },
            "& .MuiTab-root.Mui-selected": {
              //   color: "#1F8E1F", // Custom color for active tab
              //   fontWeight: "bold", // Make the active tab bold
            },
          }}
        >
          <NavLink
            style={{
              backgroundColor: `${isActiveHome ? "#FFFFFF" : "#1F8E1F"}`,
              color: `${isActiveHome ? "#1F8E1F" : "#FFFFFF"}`,
              textAlign: "center",
            }}
            to={"/dashboard"}
            className={({ isActive }) => {
              return setIsActiveHome(isActive);
            }}
            end
          >
            <Tab
              //   onClick={() => navigate("/dashboard")}
              sx={{
                textTransform: "none",
                backgroundColor: `${isActiveHome ? "#FFFFFF" : "#1F8E1F"}`,
                color: `${isActiveHome ? "#1F8E1F" : "#FFFFFF"}`,
                marginBottom: "20px",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
              }}
              disableRipple
              //   {...a11yProps(0)}
              icon={
                <HomeRoundedIcon
                  sx={{ color: `${isActiveHome ? "#1F8E1F" : "#FFFFFF"}` }}
                />
              }
              label="Home"
            />
          </NavLink>
          <NavLink
            style={{
              backgroundColor: `${isActiveChildren ? "#FFFFFF" : "#1F8E1F"}`,
              color: `${isActiveChildren ? "#1F8E1F" : "#FFFFFF"}`,
              textAlign: "center",
            }}
            to={"/children"}
            className={({ isActive }) => {
              return setIsActiveChildren(isActive);
            }}
          >
            <Tab
              //   onClick={() => navigate("children")}
              sx={{
                textTransform: "none",
                backgroundColor: `${isActiveChildren ? "#FFFFFF" : "#1F8E1F"}`,
                color: `${isActiveChildren ? "#1F8E1F" : "#FFFFFF"}`,
                marginBottom: "20px",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
              }}
              disableRipple
              //   {...a11yProps(1)}
              icon={
                <WcIcon
                  sx={{
                    color: `${isActiveChildren ? "#1F8E1F" : "#FFFFFF"}`,
                  }}
                />
              }
              label="Children"
            />
          </NavLink>
          <NavLink
            style={{
              backgroundColor: `${isActiveParent ? "#FFFFFF" : "#1F8E1F"}`,
              color: `${isActiveParent ? "#1F8E1F" : "#FFFFFF"}`,
              textAlign: "center",
            }}
            to={"/parents"}
            className={({ isActive }) => {
              return setIsActiveParent(isActive);
            }}
          >
            <Tab
              sx={{
                textTransform: "none",
                backgroundColor: `${isActiveParent ? "#FFFFFF" : "#1F8E1F"}`,
                color: `${isActiveParent ? "#1F8E1F" : "#FFFFFF"}`,
                marginBottom: "20px",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
              }}
              disableRipple
              //   {...a11yProps(2)}
              icon={
                <EscalatorWarningRoundedIcon
                  sx={{ color: `${isActiveParent ? "#1F8E1F" : "#FFFFFF"}` }}
                />
              }
              label="Parents"
            />
          </NavLink>
          <NavLink
            style={{
              backgroundColor: `${isActiveVaccine ? "#FFFFFF" : "#1F8E1F"}`,
              color: `${isActiveVaccine ? "#1F8E1F" : "#FFFFFF"}`,
              textAlign: "center",
            }}
            to={"/vaccines"}
            className={({ isActive }) => {
              return setIsActiveVaccine(isActive);
            }}
          >
            <Tab
              //   onClick={() => navigate("/disActiveVaccine
              sx={{
                textTransform: "none",
                backgroundColor: `${isActiveVaccine ? "#FFFFFF" : "#1F8E1F"}`,
                color: `${isActiveVaccine ? "#1F8E1F" : "#FFFFFF"}`,
                marginBottom: "20px",
                fontWeight: 400,
                lineHeight: "24px",
                fontSize: "16px",
              }}
              disableRipple
              icon={
                <VaccinesRoundedIcon
                  sx={{ color: `${isActiveVaccine ? "#1F8E1F" : "#FFFFFF"}` }}
                />
              }
              label="Vaccines"
            />
          </NavLink>
          <NavLink
            style={{
              backgroundColor: `${isActiveSchedule ? "#FFFFFF" : "#1F8E1F"}`,
              color: `${isActiveSchedule ? "#1F8E1F" : "#FFFFFF"}`,
              textAlign: "center",
            }}
            to={"/schedules"}
            className={({ isActive }) => {
              return setIsActiveSchedule(isActive);
            }}
          >
            <Tab
              //   onClick={() => navigate("/dashboard")}
              sx={{
                textTransform: "none",
                backgroundColor: `${isActiveSchedule ? "#FFFFFF" : "#1F8E1F"}`,
                color: `${isActiveSchedule ? "#1F8E1F" : "#FFFFFF"}`,
                marginBottom: "20px",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
              }}
              disableRipple
              icon={
                <EventAvailableRoundedIcon
                  sx={{
                    color: `${isActiveSchedule ? "#1F8E1F" : "#FFFFFF"}`,
                  }}
                />
              }
              label="Schedules"
            />
          </NavLink>
        </Tabs>
        <Button
          onClick={() => {
            removeToken()
            navigate("/")}}
          disableRipple
          variant="outlined"
          sx={{
            height: "100px",
            width: "100%",
            border: "none",

            borderTop: 1,
            textTransform: "none",
            borderColor: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: "16px",
              color: "#FFFFFF",
              lineHeight: "24px",
            }}
          >
            Log out
          </Typography>
          <LogoutIcon sx={{ color: "#FFFFFF" }} />
        </Button>
      </Box>

      <Box
        sx={{
          width: "95%",
          marginLeft: "8%",
          backgroundColor: "#FFFFFF",
          minHeight: "70px",
          position: "fixed",
          top: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "5%",
          paddingRight: "10%",
          zIndex: 100,
        }}
      >
        <Typography sx={{ fontSize: "20px", fontWeight: 500 }}>
          {pageName}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "30px",
            alignItems: "center",
          }}
        >
          <SearchSharpIcon sx={{ color: "#292D32" }} />
          <NotificationsNoneSharpIcon sx={{ color: "#292D32" }} />
          <Avatar src={avatar} />
          <img src={haceyLogo} alt="" />
        </Box>
      </Box>
    </>
  );
}
