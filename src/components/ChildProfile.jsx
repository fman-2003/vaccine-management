import React from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import avatar from "../assets/avatar.svg";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ImmunizationPending from "./ImmunizationPending";
import ImmunizationCompleted from "./ImmunizationComplete";
import { Link } from "react-router-dom";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ChildProfile() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container spacing={3} sx={{ width: "90%" }}>
      <Grid size={8}>
        <Grid
          size={12}
          sx={{
            paddingY: "3%",
            paddingX: "4%",
            backgroundColor: "#FFFFFF ",
            borderRadius: "20px",
            marginBottom: "30px",
          }}
        >
          <Typography
            sx={{
              color: "#000000",
              fontWeight: 600,
              fontSize: "24px",
              lineHeight: "36px",
            }}
          >
            Child’s Profile
          </Typography>
        </Grid>
        <Grid
          size={12}
          sx={{
            paddingY: "3%",
            paddingX: "4%",
            backgroundColor: "#FFFFFF ",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          <Grid
            sx={{ display: "flex", flexDirection: "column", width: "500px" }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 3,
                borderBottom: 1,
                borderColor: "#1F8E1F66",
                paddingBottom: "30px",
              }}
            >
              <Avatar src={avatar} sx={{ height: "60px", width: "60px" }} />
              <Grid>
                <Typography
                  component={"p"}
                  sx={{
                    color: "#1F8E1F",
                    fontWeight: 700,
                    fontSize: "24px",
                    lineHeight: "36px",
                  }}
                >
                  Taiwo Oluwajobi
                </Typography>
                <Typography
                  component={"p"}
                  sx={{
                    color: "#000000",
                    opacity: 0.4,
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "24px",
                    marginTop: "10px",
                  }}
                >
                  Female | DOB: 30/11/2024 | 3.5 Kg
                </Typography>
              </Grid>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",

                paddingTop: "30px",
              }}
            >
              <Grid
                sx={{
                  width: "140px",
                  borderRight: 1,
                  borderColor: "#1F8E1F66",
                }}
              >
                <Typography
                  component={"p"}
                  sx={{
                    color: "#000000",
                    opacity: 0.4,
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "24px",
                    marginTop: "10px",
                  }}
                >
                  Last Visit
                </Typography>
                <Typography
                  component={"p"}
                  sx={{
                    color: "#1F8E1F",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "24px",
                    marginTop: "10px",
                  }}
                >
                  24 June, 2024
                </Typography>
              </Grid>
              <Grid
                sx={{
                  width: "160px",
                  marginLeft: "40px",
                }}
              >
                <Typography
                  component={"p"}
                  sx={{
                    color: "#000000",
                    opacity: 0.4,
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "24px",
                    marginTop: "10px",
                  }}
                >
                  Next Appointment
                </Typography>
                <Typography
                  component={"p"}
                  sx={{
                    color: "#1F8E1F",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "24px",
                    marginTop: "10px",
                  }}
                >
                  24 June, 2024
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
            <EmailRoundedIcon
              sx={{
                color: "#1F8E1F",
                backgroundColor: "#1F8E1F33",
                padding: "8px",
                borderRadius: "900px",
                width: "36px",
                height: "36px",
              }}
            />
            <CalendarTodayIcon
              sx={{
                color: "#1F8E1F",
                backgroundColor: "#1F8E1F33",
                padding: "8px",
                borderRadius: "900px",
                width: "36px",
                height: "36px",
              }}
            />
          </Grid>
        </Grid>
        <Grid
          size={12}
          sx={{
            paddingY: "3%",
            paddingX: "4%",
            backgroundColor: "#FFFFFF ",
            borderRadius: "20px",
            marginBottom: "30px",
          }}
        >
          <Typography
            sx={{
              color: "#000000",
              fontWeight: 600,
              fontSize: "24px",
              lineHeight: "36px",
            }}
          >
            Immunization History
          </Typography>
        </Grid>
        <Grid
          size={12}
          sx={{
            paddingY: "3%",
            paddingX: "4%",
            backgroundColor: "#FFFFFF ",
            borderRadius: "20px",
            margin: "auto",
            marginBottom: "30px",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box>
              <Tabs
                value={value}
                onChange={handleChange}
                sx={{ width: "100%" }}
                scrollButtons={false}
                variant="fullWidth"
                TabIndicatorProps={{
                  style: { backgroundColor: "#1F8E1F66" },
                }}
              >
                <Tab
                  label="Completed"
                  {...a11yProps(0)}
                  sx={{
                    color: value === 0 ? "#1F8E1F" : "#000000", // Active tab style
                    fontWeight: value === 0 ? 400 : 300,
                    width: "50%",
                    backgroundColor: value === 0 ? "#1F8E1F0A" : "#FFFFFF",
                    textTransform: "none",
                    opacity: 0.7,
                    fontSize: "16px",
                    lineHeight: "27px",
                  }}
                  disableRipple
                />
                <Tab
                  label="Pending"
                  {...a11yProps(1)}
                  sx={{
                    color: value === 1 ? "#1F8E1F" : "#000000", // Active tab style
                    fontWeight: value === 1 ? 400 : 300,
                    backgroundColor: value === 1 ? "#1F8E1F0A" : "#FFFFFF",
                    width: "50%",
                    textTransform: "none",
                    opacity: 0.7,
                    fontSize: "16px",
                    lineHeight: "27px",
                  }}
                  disableRipple
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              {<ImmunizationCompleted />}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              {<ImmunizationPending />}
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
      <Grid sx={{ position: "fixed", right: "2%" }} size={4}>
        <Grid
          size={12}
          sx={{
            backgroundColor: "#D9ECD9",
            display: "flex",
            flexDirection: "column",
            paddingY: "5%",
            paddingX: "7%",
            borderRadius: "20px",
            marginBottom: "20px",
          }}
        >
          <Grid sx={{ margin: "auto", textAlign: "center" }}>
            <Avatar
              src={avatar}
              sx={{ height: "50px", width: "50px", margin: "auto" }}
            />
            <Typography
              sx={{
                color: "#1F8E1F",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              Oluwapelumi Egunjobi
            </Typography>
            <Typography
              sx={{
                color: "#000000",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
                opacity: 0.4,
              }}
            >
              Mom | 32 years
            </Typography>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              marginTop: "3%",
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <BusinessIcon
                sx={{
                  color: "#1F8E1F",
                  backgroundColor: "#FFFFFF80",
                  padding: "8px",
                  borderRadius: "900px",
                  height: "40px",
                  width: "40px",
                }}
              />{" "}
              <Typography
                sx={{ fontWeight: 400, fontSize: "16px", color: "#222222CC" }}
              >
                Hospital Number: JUN00222
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <MonitorHeartRoundedIcon
                sx={{
                  color: "#1F8E1F",
                  backgroundColor: "#FFFFFF80",
                  padding: "8px",
                  borderRadius: "900px",
                  height: "40px",
                  width: "40px",
                }}
              />{" "}
              <Typography
                sx={{ fontWeight: 400, fontSize: "16px", color: "#222222CC" }}
              >
                NHIS: 4567585
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <EmailIcon
                sx={{
                  color: "#1F8E1F",
                  backgroundColor: "#FFFFFF80",
                  padding: "8px",
                  borderRadius: "900px",
                  height: "40px",
                  width: "40px",
                }}
              />{" "}
              <Typography
                sx={{ fontWeight: 400, fontSize: "16px", color: "#222222CC" }}
              >
                oluwapelumi77@gmail.com
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <LocalPhoneRoundedIcon
                sx={{
                  color: "#1F8E1F",
                  backgroundColor: "#FFFFFF80",
                  padding: "8px",
                  borderRadius: "900px",
                  height: "40px",
                  width: "40px",
                }}
              />{" "}
              <Typography
                sx={{ fontWeight: 400, fontSize: "16px", color: "#222222CC" }}
              >
                09066121168
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            paddingY: "7%",
            paddingX: "7%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            maxHeight: "270px",
          }}
          size={12}
        >
          <Typography
            sx={{ fontWeight: 600, fontSize: "24px", lineHeight: "36px" }}
          >
            Other Children
          </Typography>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              overflowY: "auto",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Link
              style={{
                color: "#000000",
                fontWeight: "400px",
                fontSize: "16px",
                textDecoration: "none",
              }}
            >
              Kehinde
            </Link>
            <Link
              style={{
                color: "#000000",
                fontWeight: "400px",
                fontSize: "16px",
                textDecoration: "none",
              }}
            >
              Idowu
            </Link>
            <Link
              style={{
                color: "#000000",
                fontWeight: "400px",
                fontSize: "16px",
                textDecoration: "none",
              }}
            >
              Taiye
            </Link>
          </Grid>
          <AddCircleRoundedIcon
            sx={{ width: "35px", height: "35px", color: "#1F8E1F", marginRight: "3%" }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
