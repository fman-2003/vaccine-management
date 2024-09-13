import React from "react";
import Grid from "@mui/material/Grid2";
import { Box, Typography, TextField, Button, InputLabel } from "@mui/material";

import splash from "../assets/splash.svg";
import haceyLogo from "../assets/hacey-svg.svg";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import BusinessSharpIcon from "@mui/icons-material/BusinessSharp";
import CallMissedSharpIcon from "@mui/icons-material/CallMissedSharp";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { Link } from "react-router-dom";
import ModalWindow from "./Modal";
import ScheduleDaily from "./ScheduleDaily";

export default function Schedules() {
  const [openParent, setOpenParent] = React.useState(false);

  const handleOpenParent = () => setOpenParent(true);
  const handleCloseParent = () => setOpenParent(false);
  return (
    // <React.Fragment>
    <Grid container sx={{ width: "95%" }}>
      {
        <ModalWindow onClose={handleCloseParent} open={openParent}>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <Button
              onClick={handleCloseParent}
              variant="text"
              sx={{
                textTransform: "none",
                display: "flex",
                flexDirection: "row",
                gap: "5px",
                marginBottom: "5px",
              }}
              disableRipple
            >
              <ArrowBackSharpIcon sx={{ color: "#1F8E1F" }} />{" "}
              <Typography
                sx={{ color: "#000000", fontSize: "16px", fontWeight: 400 }}
              >
                Back
              </Typography>
            </Button>
            <Typography
              sx={{
                width: "100%",
                color: "#000000",
                fontWeight: 600,
                fontSize: "24px",
                lineHeight: "36px",
                marginBottom: "5px",
              }}
            >
              Onboard Parent
            </Typography>
            <Grid sx={{ width: "100%" }}>
              <Box sx={{ marginBottom: "5px" }}>
                <InputLabel
                  sx={{
                    color: "#222222",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "24px",
                    marginBottom: "5px",
                  }}
                >
                  Full Name
                </InputLabel>
                <TextField
                  placeholder="johndoe@gmail.com"
                  sx={{ width: "600px" }}
                />
              </Box>
              <Box sx={{ marginBottom: "5px" }}>
                <InputLabel
                  sx={{
                    color: "#222222",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "24px",
                    marginBottom: "5px",
                  }}
                >
                  Parental Role
                </InputLabel>
                <TextField
                  placeholder="johndoe@gmail.com"
                  sx={{ width: "600px" }}
                />
              </Box>
              <Box sx={{ marginBottom: "5px" }}>
                <InputLabel
                  sx={{
                    color: "#222222",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "24px",
                    marginBottom: "5px",
                  }}
                >
                  Hospital Number
                </InputLabel>
                <TextField
                  placeholder="johndoe@gmail.com"
                  sx={{ width: "600px" }}
                />
              </Box>
              <Box sx={{ marginBottom: "5px" }}>
                <InputLabel
                  sx={{
                    color: "#222222",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "24px",
                    marginBottom: "5px",
                  }}
                >
                  NHIS
                </InputLabel>
                <TextField
                  placeholder="johndoe@gmail.com"
                  sx={{ width: "600px" }}
                />
              </Box>
              <Box sx={{ marginBottom: "5px" }}>
                <InputLabel
                  sx={{
                    color: "#222222",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "24px",
                    marginBottom: "5px",
                  }}
                >
                  Date of Birth
                </InputLabel>
                <TextField
                  placeholder="johndoe@gmail.com"
                  sx={{ width: "600px" }}
                />
              </Box>
              <Box sx={{ marginBottom: "5px" }}>
                <InputLabel
                  sx={{
                    color: "#222222",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "24px",
                    marginBottom: "5px",
                  }}
                >
                  Email Address
                </InputLabel>
                <TextField
                  placeholder="johndoe@gmail.com"
                  sx={{ width: "600px" }}
                />
              </Box>
              <Box sx={{ marginBottom: "5px" }}>
                <InputLabel
                  sx={{
                    color: "#222222",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "24px",
                    marginBottom: "5px",
                  }}
                >
                  Phone Number
                </InputLabel>
                <TextField
                  placeholder="johndoe@gmail.com"
                  sx={{ width: "600px" }}
                />
              </Box>
              <Button
                sx={{
                  width: "100%",
                  backgroundColor: "#1F8E1F",
                  paddingY: "12px",
                  paddingX: "36px",
                  borderRadius: "80px",
                  color: "#FFFFFF",
                  textTransform: "none",
                }}
              >
                Add New Parent
              </Button>
              <Box
                sx={{
                  margin: "auto",
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  textAlign: "center",
                  alignItems: "center",
                  marginTop: "10px",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <Typography>Powered by</Typography>
                <img src={haceyLogo} alt="" />
              </Box>
            </Grid>
          </Grid>
        </ModalWindow>
      }
      <Grid container spacing={3} sx={{ width: "100%" }}>
        <Grid
          size={8}
          sx={{
            paddingY: "3%",
            paddingX: "4%",
            backgroundColor: "#FFFFFF ",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Grid
            sx={{ display: "flex", flexDirection: "column", width: "600px" }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                borderBottom: 1,
                borderColor: "#1F8E1F66",
                paddingBottom: "30px",
              }}
            >
              <Typography
                component={"p"}
                sx={{
                  color: "#1F8E1F",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "36px",
                }}
              >
                Schedules Today
              </Typography>
              <Typography
                component={"p"}
                sx={{
                  color: "#000000",
                  opacity: 0.7,
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "24px",
                  marginTop: "10px",
                }}
              >
                {new Intl.DateTimeFormat("en-UK", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).format(new Date())}
              </Typography>
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
                  width: "325px",
                  borderRight: 1,
                  borderColor: "#1F8E1F66",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                    paddingBottom: "10px",
                  }}
                >
                  <EventAvailableRoundedIcon
                    sx={{ color: "#1F8E1F", width: "24px", height: "24px" }}
                  />
                  <Typography
                    sx={{
                      color: "#000000",
                      fontWeight: 300,
                      fontSize: "16px",
                      lineHeight: "24px",
                    }}
                  >
                    25 scheduled children today
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                    paddingBottom: "10px",
                  }}
                >
                  <AddSharpIcon
                    sx={{ color: "#1F8E1F", width: "24px", height: "24px" }}
                  />
                  <Typography
                    sx={{
                      color: "#000000",
                      fontWeight: 300,
                      fontSize: "16px",
                      lineHeight: "24px",
                    }}
                  >
                    5 PCV scheduled
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                    paddingBottom: "10px",
                  }}
                >
                  <BusinessSharpIcon
                    sx={{ color: "#1F8E1F", width: "24px", height: "24px" }}
                  />
                  <Typography
                    sx={{
                      color: "#000000",
                      fontWeight: 300,
                      fontSize: "16px",
                      lineHeight: "24px",
                    }}
                  >
                    7 OPV children today
                  </Typography>
                </Box>
              </Grid>
              <Box
                sx={{
                  marginLeft: "30px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <CallMissedSharpIcon
                  sx={{ color: "#C91919", width: "25px", height: "25px" }}
                />
                <Typography
                  sx={{
                    color: "#C91919",
                    fontWeight: 300,
                    fontSize: "16px",
                    lineHeight: "24px",

                    width: "250px",
                  }}
                >
                  5 missed immunization (awaiting)
                </Typography>
              </Box>
            </Grid>
            <Link
              style={{
                textDecoration: "none",
                color: "#1F8E1F",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "24px",
                marginTop: "3%",
              }}
            >
              View all
            </Link>
          </Grid>
        </Grid>
        <Grid
          onClick={handleOpenParent}
          size={4}
          sx={{
            borderRadius: "20px",
            zIndex: 5,
            marginBottom: "30px",
          }}
        >
          <Grid
            sx={{
              minWidth: "100%",
              minHeight: "350px",
              backgroundImage: `url(${splash})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "20px",
              paddingX: "6%",
              paddingY: "12%",
              // paddingLeft: "50px",
              backgroundRepeat: "no-repeat",
              backgroundColor: "#1F8E1F4D",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                borderRadius: "20px",
                right: 0,
                bottom: 0,
                backgroundColor: "#1F8E1FE5",
                zIndex: 1,
              },
              "&:hover": {
                //   backgroundColor: "#1F8E1F0D",
                //   borderRadius: "15px",
                border: 1,
                borderColor: "#1F8E1F",
                transform: "scale(1.05)",
                transition: "0.3s ease",
                cursor: "pointer",
              },
            }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                  maxWidth: "460px",
                }}
              >
                <Typography
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: "24px",
                    lineHeight: "36px",
                    zIndex: 10,
                    width: "150px",
                    margin: "auto",
                    textAlign: "center",
                  }}
                >
                  Onboard New Parent
                </Typography>
                <Typography
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "24px",
                    zIndex: 10,
                    width: "200px",
                    textAlign: "center",
                  }}
                >
                  Add a New Parent and then a new child
                </Typography>
              </Grid>
              <Grid sx={{ zIndex: 17 }}>
                <AddCircleRoundedIcon
                  sx={{
                    color: "#FFFFFF",
                    width: "80px",
                    height: "80px",
                    zIndex: 17,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          size={12}
          sx={{
            paddingY: "3%",
            paddingX: "3%",
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
            Daily Immunization Schedules
          </Typography>
        </Grid>
      </Grid>
      <Grid sx={{ width: "100%", overflowX: "auto" }}>
        <Grid
          container
          sx={{
            width: "max-content",
          }}
          wrap="nowrap"
          spacing={2}
        >
          <ScheduleDaily />
          <ScheduleDaily />
          <ScheduleDaily />
          <ScheduleDaily />
          <ScheduleDaily />
          <ScheduleDaily />
        </Grid>
      </Grid>
    </Grid>
  );
}