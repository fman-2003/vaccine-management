import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Box, Button, Typography, TextField, InputLabel } from "@mui/material";
import Grid from "@mui/material/Grid2";

import "@fontsource/roboto";
import haceyLogo from "../assets/hacey-svg.svg";
import splash from "../assets/splash.svg";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import CallMissedSharpIcon from "@mui/icons-material/CallMissedSharp";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import WcIcon from "@mui/icons-material/Wc";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import SortSharpIcon from "@mui/icons-material/SortSharp";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import ModalWindow from "./Modal";
import { onboardChild, onboardParent } from "../query";

export default function Dashboard() {
  const [openVaccine, setOpenVaccine] = React.useState(false);
  const [openParent, setOpenParent] = React.useState(false);
  const [openChild, setOpenChild] = React.useState(false);
  const [parentInfo, setParentInfo] = React.useState({});
  const [childInfo, setChildInfo] = React.useState({});
  const [parentId, setParentId] = React.useState(null);

  const parentMutation = useMutation({
    mutationFn: onboardParent,
    onSuccess: (data) => {
      const parentId = data.data.id;
      setParentId(parentId);
    },
  });

  const childMutation = useMutation({
    mutationFn: onboardChild,
  });

  const handleOpenParent = () => setOpenParent(true);
  const handleCloseParent = (e) => {
    e.preventDefault();
    const parentData = new FormData(e.target);
    setParentInfo({
      title: parentData.get("parent-role").trim(),
      firstName: parentData.get("first-name").trim(),
      lastName: parentData.get("last-name").trim(),
      email: parentData.get("email").trim(),
      phoneNumber: parentData.get("phone-no").toString().trim(),
      dateOfBirth: parentData.get("dob").toString().trim(),
      hospitalNumber: parentData.get("hospital-no").toString().trim(),
      nhis: parentData.get("nhis").toString().trim(),
    });
    parentMutation.mutate(parentInfo);
    console.log(parentInfo)
    setOpenParent(false);
    setOpenChild(true);
  };

  const handleSubmitChild = (e) => {
    e.preventDefault();
    const childData = new FormData(e.target);
    setChildInfo({
      firstName: childData.get("child-first-name").trim(),
      lastName: childData.get("child-last-name").trim(),
      gender: childData.get("child-sex").trim(),
      dateOfBirth: childData.get("dob-child").toString().trim(),
      weightAtBirth: childData.get("weight").toString().trim(),
    });
    childMutation.mutate({ data: childInfo, parentId });
    // console.log(childInfo);
    setOpenChild(false);
  };
  const handleOpenVaccine = () => setOpenVaccine(true);
  const handleCloseVaccine = () => setOpenVaccine(false);
  const handleCloseChild = () => setOpenChild(false);
  return (
    <Grid container spacing={4} sx={{ width: "95%" }}>
      <Grid size={8}>
        {
          <ModalWindow onClose={handleCloseVaccine} open={openVaccine}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "fit-content",
              }}
            >
              <Button
                onClick={handleCloseVaccine}
                variant="text"
                sx={{
                  textTransform: "none",
                  display: "flex",
                  flexDirection: "row",
                  gap: "5px",
                  marginBottom: "20px",
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
                  marginBottom: "20px",
                }}
              >
                New Vaccine
              </Typography>
              <Grid sx={{ width: "100%" }}>
                <Box sx={{ marginBottom: "25px" }}>
                  <InputLabel
                    sx={{
                      color: "#222222",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "24px",
                      marginBottom: "10px",
                    }}
                  >
                    Type of Vaccine
                  </InputLabel>
                  <TextField
                    placeholder="johndoe@gmail.com"
                    sx={{ width: "600px" }}
                    name="vaccine-type"
                  />
                </Box>
                <Box sx={{ marginBottom: "25px" }}>
                  <InputLabel
                    sx={{
                      color: "#222222",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "24px",
                      marginBottom: "10px",
                    }}
                  >
                    Minimum Target Age of Child
                  </InputLabel>
                  <TextField
                    placeholder="johndoe@gmail.com"
                    sx={{ width: "600px" }}
                    name="child-target-age"
                  />
                </Box>
                <Box sx={{ marginBottom: "25px" }}>
                  <InputLabel
                    sx={{
                      color: "#222222",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "24px",
                      marginBottom: "10px",
                    }}
                  >
                    Dosage
                  </InputLabel>
                  <TextField
                    placeholder="johndoe@gmail.com"
                    sx={{ width: "600px" }}
                    name="dosage"
                  />
                </Box>
                <Box sx={{ marginBottom: "25px" }}>
                  <InputLabel
                    sx={{
                      color: "#222222",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "24px",
                      marginBottom: "10px",
                    }}
                  >
                    Route of Administration
                  </InputLabel>
                  <TextField
                    placeholder="johndoe@gmail.com"
                    sx={{ width: "600px" }}
                    name="administration-route"
                  />
                </Box>
                <Box sx={{ marginBottom: "25px" }}>
                  <InputLabel
                    sx={{
                      color: "#222222",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "24px",
                      marginBottom: "10px",
                    }}
                  >
                    Site of Administration
                  </InputLabel>
                  <TextField
                    placeholder="johndoe@gmail.com"
                    sx={{ width: "600px" }}
                    name="administration-site"
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
                  Create New Vaccine
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
                <form onSubmit={handleCloseParent}>
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
                      First Name
                    </InputLabel>
                    <TextField
                      placeholder="e.g Abubakar"
                      sx={{ width: "600px" }}
                      name="first-name"
                      type="text"
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
                      Last Name
                    </InputLabel>
                    <TextField
                      placeholder="e.g Olatunji"
                      sx={{ width: "600px" }}
                      name="last-name"
                      type="text"
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
                      placeholder="e.g Mom"
                      sx={{ width: "600px" }}
                      name="parent-role"
                      type="text"
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
                    <TextField sx={{ width: "600px" }} name="dob" type="date" />
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
                      placeholder="e.g JUN00222"
                      sx={{ width: "600px", textTransform: "uppercase" }}
                      name="hospital-no"
                      type="text"
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
                      placeholder="e.g 4567585"
                      sx={{ width: "600px" }}
                      name="nhis"
                      type="text"
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
                      placeholder="e.g johndoe@gmail.com"
                      sx={{ width: "600px" }}
                      type="email"
                      name="email"
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
                      placeholder="e.g 08084972144"
                      sx={{ width: "600px" }}
                      name="phone-no"
                      type="tel"
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
                    type="submit"
                  >
                    Add New Parent
                  </Button>
                </form>
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
        {
          <ModalWindow onClose={handleCloseChild} open={openChild}>
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
                Onboard a Child
              </Typography>
              <Grid sx={{ width: "100%" }}>
                <form onSubmit={handleSubmitChild}>
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
                      First Name
                    </InputLabel>
                    <TextField
                      placeholder="e.g Oreoluwa"
                      sx={{ width: "600px" }}
                      name="child-first-name"
                      type="text"
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
                      Last Name
                    </InputLabel>
                    <TextField
                      placeholder="e.g Adepoju"
                      sx={{ width: "600px" }}
                      name="child-last-name"
                      type="text"
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
                      Sex
                    </InputLabel>
                    <TextField
                      placeholder="e.g Female"
                      sx={{ width: "600px" }}
                      name="child-sex"
                      type="text"
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
                      //   placeholder=""
                      sx={{ width: "600px" }}
                      name="dob-child"
                      type="date"
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
                      Weight at Birth{" "}
                      <Typography
                        component={"span"}
                        sx={{
                          color: "#222222",
                          fontWeight: 300,
                          fontSize: "12px",

                          //   lineHeight: "24px",
                        }}
                      >
                        (write in kilograms)
                      </Typography>
                    </InputLabel>
                    <TextField
                      placeholder="e.g 3.5"
                      sx={{ width: "600px" }}
                      name="weight"
                      type="text"
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
                    type="submit"
                  >
                    Onboard
                  </Button>
                </form>
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
        <Grid
          size={12}
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            padding: "40px",
            paddingX: "5%",
            minHeight: "200px",
            marginBottom: "30px",
          }}
        >
          <Grid
            sx={{
              borderBottom: 1,
              borderColor: "#1F8E1F",
              paddingBottom: "20px",
            }}
          >
            <Typography
              sx={{ fontWeight: 600, fontSize: "24px", lineHeight: "36px" }}
            >
              Welcome Back
            </Typography>
          </Grid>
          <Grid
            sx={{
              paddingTop: "35px",
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                alignItems: "center",
                borderRight: 0.5,
                width: "50%",
                borderColor: "#1F8E1F",
              }}
            >
              <EventAvailableRoundedIcon sx={{ color: "#1F8E1F" }} />
              <Typography
                sx={{ color: "#000000", fontSize: "16px", fontWeight: 300 }}
              >
                25 scheduled children today
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                width: "50%",
                justifyContent: "flex-end",
              }}
            >
              <CallMissedSharpIcon sx={{ color: "#C91919" }} />
              <Typography
                sx={{ color: "#C91919", fontSize: "16px", fontWeight: 300 }}
              >
                5 missed immunization
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          onClick={handleOpenParent}
          size={12}
          sx={{
            minHeight: "200px",
            borderRadius: "20px",
            zIndex: 5,
            marginBottom: "30px",
          }}
        >
          <Grid
            sx={{
              minWidth: "100%",
              minHeight: "200px",
              backgroundImage: `url(${splash})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "20px",
              paddingX: "6%",
              paddingY: "3%",

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
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
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
                  }}
                >
                  Add a New Parent and then a new child
                </Typography>
              </Grid>
              <Grid sx={{ zIndex: 17 }}>
                <AddCircleRoundedIcon
                  sx={{
                    color: "#FFFFFF",
                    width: "60px",
                    height: "60px",
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
            paddingX: "3%",
            paddingY: "2%",
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            maxHeight: "90px",
            marginBottom: "30px",
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              color: "#000000",
              fontSize: "24px",
              lineHeight: "36px",
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
          alignSelf={"flex-start"}
          size={12}
          sx={{
            backgroundColor: "#FFFFFF",
            marginBottom: "30px",
            maxHeight: "777px",
            display: "flex",
            flexDirection: "column",
            paddingY: "4%",
            paddingX: "3%",
            borderRadius: "20px",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingX: "2%",
              paddingBottom: "6%",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Roboto",
                color: "#000000",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "18px",
              }}
            >
              Name
            </Typography>
            <Typography
              sx={{
                fontFamily: "Roboto",
                color: "#000000",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "18px",
              }}
            >
              Vaccine
            </Typography>
            <Typography
              sx={{
                fontFamily: "Roboto",
                color: "#000000",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "18px",
              }}
            >
              Status
            </Typography>
          </Grid>
          <Grid sx={{ display: "flex", flexDirection: "column" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingY: "3%",
                paddingX: "1%",
                borderBottom: 1,
                borderColor: "rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: "#1F8E1F0D",
                  borderRadius: "15px",
                  border: 1,
                  borderColor: "#1F8E1F",
                  cursor: "pointer",
                },
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 500,
                  maxWidth: "120px",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                Taiwo Awoniyi
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 300,
                  maxWidth: "190px",

                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                OPV 0 (Oral Polio Vaccine)
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#C9191926",
                  paddingY: "8px",
                  paddingX: "16px",
                  borderRadius: "800px",
                }}
              >
                <Typography
                  sx={{
                    color: "#C91919",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "14px",
                  }}
                >
                  Pending 0/3
                </Typography>
              </Box>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingY: "3%",
                paddingX: "1%",
                borderBottom: 1,
                borderColor: "rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: "#1F8E1F0D",
                  borderRadius: "15px",
                  border: 1,
                  borderColor: "#1F8E1F",
                  cursor: "pointer",
                },
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 500,
                  maxWidth: "120px",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                Taiwo Awoniyi
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 300,
                  maxWidth: "190px",

                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                OPV 0 (Oral Polio Vaccine)
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#C9191926",
                  paddingY: "8px",
                  paddingX: "16px",
                  borderRadius: "800px",
                }}
              >
                <Typography
                  sx={{
                    color: "#C91919",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "14px",
                  }}
                >
                  Pending 0/3
                </Typography>
              </Box>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingY: "3%",
                paddingX: "1%",
                borderBottom: 1,
                borderColor: "rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: "#1F8E1F0D",
                  borderRadius: "15px",
                  border: 1,
                  borderColor: "#1F8E1F",
                  cursor: "pointer",
                },
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 500,
                  maxWidth: "120px",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                Taiwo Awoniyi
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 300,
                  maxWidth: "190px",

                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                OPV 0 (Oral Polio Vaccine)
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#C9191926",
                  paddingY: "8px",
                  paddingX: "16px",
                  borderRadius: "800px",
                }}
              >
                <Typography
                  sx={{
                    color: "#C91919",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "14px",
                  }}
                >
                  Pending 0/3
                </Typography>
              </Box>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingY: "3%",
                paddingX: "1%",
                borderBottom: 1,
                borderColor: "rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: "#1F8E1F0D",
                  borderRadius: "15px",
                  border: 1,
                  borderColor: "#1F8E1F",
                  cursor: "pointer",
                },
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 500,
                  maxWidth: "120px",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                Taiwo Awoniyi
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 300,
                  maxWidth: "190px",

                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                OPV 0 (Oral Polio Vaccine)
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#C9191926",
                  paddingY: "8px",
                  paddingX: "16px",
                  borderRadius: "800px",
                }}
              >
                <Typography
                  sx={{
                    color: "#C91919",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "14px",
                  }}
                >
                  Pending 0/3
                </Typography>
              </Box>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingY: "3%",
                paddingX: "1%",
                borderBottom: 1,
                borderColor: "rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: "#1F8E1F0D",
                  borderRadius: "15px",
                  border: 1,
                  borderColor: "#1F8E1F",
                  cursor: "pointer",
                },
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 500,
                  maxWidth: "120px",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                Taiwo Awoniyi
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 300,
                  maxWidth: "190px",

                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                OPV 0 (Oral Polio Vaccine)
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#C9191926",
                  paddingY: "8px",
                  paddingX: "16px",
                  borderRadius: "800px",
                }}
              >
                <Typography
                  sx={{
                    color: "#C91919",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "14px",
                  }}
                >
                  Pending 0/3
                </Typography>
              </Box>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingY: "3%",
                paddingX: "1%",
                borderBottom: 1,
                borderColor: "rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: "#1F8E1F0D",
                  borderRadius: "15px",
                  border: 1,
                  borderColor: "#1F8E1F",
                  cursor: "pointer",
                },
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 500,
                  maxWidth: "120px",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                Taiwo Awoniyi
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 300,
                  maxWidth: "190px",

                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                OPV 0 (Oral Polio Vaccine)
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#C9191926",
                  paddingY: "8px",
                  paddingX: "16px",
                  borderRadius: "800px",
                }}
              >
                <Typography
                  sx={{
                    color: "#C91919",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "14px",
                  }}
                >
                  Pending 0/3
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={4}>
        <Grid
          size={12}
          onClick={handleOpenVaccine}
          sx={{
            backgroundColor: "#D9ECD9",
            borderRadius: "20px",
            marginBottom: "30px",
            paddingX: "7%",
            minHeight: "200px",
            paddingY: "7%",
            height: "fit-content",
            display: "flex",
            flexDirection: "row",
            gap: 3,
            alignItems: "center",
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
          <Grid>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "24px",
                lineHeight: "36px",
                color: "#1F8E1F",
              }}
            >
              Add a New Vaccine
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",

                color: "#1F8E1F",
              }}
            >
              Add a New Vaccine to be administer to all
            </Typography>
          </Grid>
          <Grid>
            <AddCircleRoundedIcon
              sx={{ color: "#1F8E1F", height: "50px", width: "50px" }}
            />
          </Grid>
        </Grid>

        <Grid
          size={12}
          sx={{
            backgroundColor: "#FFFFFF",
            marginBottom: "30px",
            borderRadius: "20px",
            paddingX: "7%",
            paddingY: "7%",
            display: "flex",
            minHeight: "200px",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: "#000000",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "24px",
              }}
            >
              No. of Children
            </Typography>
            <Link style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  fontWeight: "300px",
                  fontSize: "16px",
                  lineHeight: "24px",
                  textDecoration: "none",
                  color: "#1F8E1F",
                }}
              >
                View all
              </Typography>
            </Link>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "16px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <WcIcon
              sx={{
                color: "#1F8E1F",
                paddingY: "18px",
                paddingX: "14px",
                backgroundColor: "#1F8E1F1A",
                borderRadius: "3000px",
                height: "64px",
                width: "64px",
              }}
            />
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: "28px",
                lineHeight: "42px",
                color: "#1F8E1F",
              }}
            >
              2,500+
            </Typography>
          </Grid>
        </Grid>
        <Grid
          size={12}
          sx={{
            display: "flex",
            marginBottom: "30px",
            flexDirection: "column",
            backgroundColor: "#FFFFFF",
            maxHeight: "777px",
            borderRadius: "20px",
            paddingX: "7%",
            paddingY: "7%",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
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
              Parents
            </Typography>
            <Grid sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
              <SortSharpIcon />
              <SearchSharpIcon />
            </Grid>
          </Grid>
          <Grid sx={{ overflowY: "auto", whiteSpace: "nowrap" }}>
            <Grid
              sx={{
                borderBottom: 1,
                borderColor: "rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingY: "10%",
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                  maxWidth: "145px",
                }}
              >
                Kelechi Iheanacho
              </Typography>
              <Typography
                sx={{
                  color: "#1F8E1F",
                  fontWeight: 300,
                  fontSize: "16px",
                  lineHeight: "24px",
                  maxWidth: "145px",
                }}
              >
                3 Children
              </Typography>
            </Grid>
            <Grid
              sx={{
                borderBottom: 1,
                borderColor: "rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingY: "10%",
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                  maxWidth: "145px",
                }}
              >
                Kelechi Iheanacho
              </Typography>
              <Typography
                sx={{
                  color: "#1F8E1F",
                  fontWeight: 300,
                  fontSize: "16px",
                  lineHeight: "24px",
                  maxWidth: "145px",
                }}
              >
                3 Children
              </Typography>
            </Grid>
            <Grid
              sx={{
                borderBottom: 1,
                borderColor: "rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingY: "10%",
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                  maxWidth: "145px",
                }}
              >
                Kelechi Iheanacho
              </Typography>
              <Typography
                sx={{
                  color: "#1F8E1F",
                  fontWeight: 300,
                  fontSize: "16px",
                  lineHeight: "24px",
                  maxWidth: "145px",
                }}
              >
                3 Children
              </Typography>
            </Grid>
            <Grid
              sx={{
                borderBottom: 1,
                borderColor: "rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingY: "10%",
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                  maxWidth: "145px",
                }}
              >
                Kelechi Iheanacho
              </Typography>
              <Typography
                sx={{
                  color: "#1F8E1F",
                  fontWeight: 300,
                  fontSize: "16px",
                  lineHeight: "24px",
                  maxWidth: "145px",
                }}
              >
                3 Children
              </Typography>
            </Grid>
            <Grid
              sx={{
                borderBottom: 1,
                borderColor: "rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingY: "10%",
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                  maxWidth: "145px",
                }}
              >
                Kelechi Iheanacho
              </Typography>
              <Typography
                sx={{
                  color: "#1F8E1F",
                  fontWeight: 300,
                  fontSize: "16px",
                  lineHeight: "24px",
                  maxWidth: "145px",
                }}
              >
                3 Children
              </Typography>
            </Grid>
            <Grid
              sx={{
                borderBottom: 1,
                borderColor: "rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingY: "10%",
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                  maxWidth: "145px",
                }}
              >
                Kelechi Iheanacho
              </Typography>
              <Typography
                sx={{
                  color: "#1F8E1F",
                  fontWeight: 300,
                  fontSize: "16px",
                  lineHeight: "24px",
                  maxWidth: "145px",
                }}
              >
                3 Children
              </Typography>
            </Grid>
            <Grid
              sx={{
                borderBottom: 1,
                borderColor: "rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingY: "10%",
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                  maxWidth: "145px",
                }}
              >
                Kelechi Iheanacho
              </Typography>
              <Typography
                sx={{
                  color: "#1F8E1F",
                  fontWeight: 300,
                  fontSize: "16px",
                  lineHeight: "24px",
                  maxWidth: "145px",
                }}
              >
                3 Children
              </Typography>
            </Grid>
            <Grid
              sx={{
                borderBottom: 1,
                borderColor: "rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingY: "10%",
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                  maxWidth: "145px",
                }}
              >
                Kelechi Iheanacho
              </Typography>
              <Typography
                sx={{
                  color: "#1F8E1F",
                  fontWeight: 300,
                  fontSize: "16px",
                  lineHeight: "24px",
                  maxWidth: "145px",
                }}
              >
                3 Children
              </Typography>
            </Grid>
            <Grid
              sx={{
                borderBottom: 1,
                borderColor: "rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingY: "10%",
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                  maxWidth: "145px",
                }}
              >
                Kelechi Iheanacho
              </Typography>
              <Typography
                sx={{
                  color: "#1F8E1F",
                  fontWeight: 300,
                  fontSize: "16px",
                  lineHeight: "24px",
                  maxWidth: "145px",
                }}
              >
                3 Children
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
