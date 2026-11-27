import React from "react";
// import {mongoose} from "mongoose";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Button,
  Typography,
  TextField,
  InputLabel,
  List,
  ListItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import { motion } from "framer-motion";
import useAlert from "../hooks/useAlert";
import AlertMessage from "./AlertMessage";

import "@fontsource/roboto";
import haceyLogo from "../assets/hacey-svg.svg";
import splash from "../assets/splash.svg";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import CallMissedSharpIcon from "@mui/icons-material/CallMissedSharp";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import WcIcon from "@mui/icons-material/Wc";
// import SearchSharpIcon from "@mui/icons-material/SearchSharp";
// import SortSharpIcon from "@mui/icons-material/SortSharp";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import ModalWindow from "./Modal";
import {
  createChild,
  createParent,
  createVaccine,
  getDailySummary,
  getChildren,
  getParents,
  getSchedules,
} from "../query";
import { getErrorMessage, getValidationErrors } from "../helper/get-error-message";

export default function Dashboard() {
  const alert = useAlert();

  const queryClient = useQueryClient();

  const [openVaccine, setOpenVaccine] = React.useState(false);
  const [openParent, setOpenParent] = React.useState(false);
  const [openChild, setOpenChild] = React.useState(false);
  const [parentId, setParentId] = React.useState("");
  const [parentError, setParentError] = React.useState({});
  const [childError, setChildError] = React.useState({});
  const [vaccineError, setVaccineError] = React.useState({});

  const getSchedulesQuery = useQuery({
    queryKey: ["schedules"],
    queryFn: getSchedules,
  });

  const getParentsQuery = useQuery({
    queryKey: ["parents"],
    queryFn: getParents,
  });

  const getChildrenQuery = useQuery({
    queryKey: ["children"],
    queryFn: getChildren,
  });

  const getDailyScheduleQuery = useQuery({
    queryKey: ["dailySchedules"],
    queryFn: getDailySummary,
  });

  const parentMutation = useMutation({
    mutationFn: createParent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parents"] });
    },
  });

  const childMutation = useMutation({
    mutationFn: createChild,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["children"] });
    },
  });

  const vaccineMutation = useMutation({
    mutationFn: createVaccine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaccines"] });
    },
  });

  const handleOpenParent = () => setOpenParent(true);
  const handleCloseParent = () => {
    setOpenParent(false);
  };
  const handleOpenVaccine = () => setOpenVaccine(true);
  const handleCloseVaccine = () => setOpenVaccine(false);
  const handleCloseChild = () => {
    setOpenChild(false);
    setParentId("");
  };

  const handleSubmitParent = (e) => {
    e.preventDefault();
    setParentError({ error: "", validationError: [] });
    const parentFormData = new FormData(e.target);
    const parentDetails = {
      firstName: parentFormData.get("firstName"),
      lastName: parentFormData.get("lastName"),
      title: parentFormData.get("title"),
      email: parentFormData.get("email"),
      phoneNumber: parentFormData.get("phoneNumber"),
      dateOfBirth: parentFormData.get("dateOfBirth"),
      hospitalNumber: parentFormData.get("hospitalNumber"),
      nhis: parentFormData.get("nhis"),
    };
    parentMutation.mutate(parentDetails, {
      onSuccess: (data) => {
        setParentId(data.data._id);
        setOpenParent(false);
        setOpenChild(true);
        alert.showSuccess(data.message);
      },
      onError: (error) => {
        if (getValidationErrors(error)) {
          setParentError((prev) => {
            return {
              ...prev,
              validationError: getValidationErrors(error),
            };
          });
        }
        alert.showError(getErrorMessage(error));
        setParentError((prev) => {
          return {
            ...prev,
            error: getErrorMessage(error),
          };
        });
      },
    });
  };

  const handleSubmitChild = (e) => {
    e.preventDefault();
    setChildError({ error: "", validationError: [] });
    const childFormData = new FormData(e.target);
    const childDetails = {
      firstName: childFormData.get("firstname").trim(),
      lastName: childFormData.get("lastname").trim(),
      gender: childFormData.get("sex").toUpperCase().trim(),
      dateOfBirth: childFormData.get("dob").toString().trim(),
      weightAtBirth: childFormData.get("weightAtBirth").toString().trim(),
      parentId,
    };

    childMutation.mutate(childDetails, {
      onSuccess: (data) => {
        setParentId("");
        setOpenChild(false);
        alert.showSuccess(data.message);
      },
      onError: (error) => {
        // setChildError({});

        if (getValidationErrors(error)) {
          setChildError((prev) => {
            return {
              ...prev,
              validationError: getValidationErrors(error),
            };
          });
        }
        alert.showError(getErrorMessage(error));
        setChildError((prev) => {
          return {
            ...prev,
            error: getErrorMessage(error),
          };
        });
      },
    });
  };

  const handleSubmitVaccine = (e) => {
    e.preventDefault();
    setVaccineError({ error: "", validationError: [] });
    const vaccineFormData = new FormData(e.target);
    const vaccineDetails = {
      type: vaccineFormData.get("typeOfVaccine").trim(),
      minimumTargetAge: vaccineFormData.get("minimumTargetAge").trim(),
      dosage: vaccineFormData.get("dosage").trim(),
      routeOfAdministration: vaccineFormData
        .get("routeOfAdministration")
        .trim(),
      siteOfAdministration: vaccineFormData.get("siteOfAdministration").trim(),
    };
    vaccineMutation.mutate(vaccineDetails, {
      onSuccess: (data) => {
        setOpenVaccine(false);
        alert.showSuccess(data.message);
      },
      onError: (error) => {
        if (getValidationErrors(error)) {
          setVaccineError((prev) => {
            return {
              ...prev,
              validationError: getValidationErrors(error),
            };
          });
        }
        alert.showError(getErrorMessage(error));
        setVaccineError((prev) => {
          return {
            ...prev,
            error: getErrorMessage(error),
          };
        });
      },
    });
  };
  return (
    <>
      <Grid container spacing={4} sx={{ width: "95%", minHeight: "100vh" }}>
        {<AlertMessage {...alert.props} />}
        <Grid size={8}>
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
                  gap: "0.3125rem",
                  marginBottom: "1.25rem",
                }}
                disableRipple
              >
                <ArrowBackSharpIcon sx={{ color: "#1F8E1F" }} />{" "}
                <Typography
                  sx={{ color: "#000000", fontSize: "1rem", fontWeight: 400 }}
                >
                  Back
                </Typography>
              </Button>
              <Typography
                sx={{
                  width: "100%",
                  color: "#000000",
                  fontWeight: 600,
                  fontSize: "1.5rem",
                  lineHeight: "2.25rem",
                  marginBottom: "1.25rem",
                }}
              >
                New Vaccine
              </Typography>
              <Grid sx={{ width: "100%" }}>
                <form onSubmit={handleSubmitVaccine}>
                  {vaccineMutation.isError && vaccineError.validationError && (
                    <Box sx={{ marginBottom: "0.3125rem" }}>
                      <ul>
                        {vaccineError.validationError.map((valErr) => {
                          return (
                            <li
                              style={{ color: "red", fontSize: "0.9375rem" }}
                              key={valErr.msg}
                            >
                              {valErr.msg}
                            </li>
                          );
                        })}
                      </ul>
                    </Box>
                  )}
                  <Box sx={{ marginBottom: "1.5625rem" }}>
                    <InputLabel
                      sx={{
                        color: "#222222",
                        fontWeight: 500,
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        marginBottom: "0.625rem",
                      }}
                    >
                      Type of Vaccine
                    </InputLabel>
                    <TextField
                      placeholder="johndoe@gmail.com"
                      sx={{ width: "37.5rem", textTransform: "capitalize" }}
                      name="typeOfVaccine"
                      type="text"
                    />
                  </Box>
                  <Box sx={{ marginBottom: "1.5625rem" }}>
                    <InputLabel
                      sx={{
                        color: "#222222",
                        fontWeight: 500,
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        marginBottom: "0.625rem",
                      }}
                    >
                      Minimum Target Age of Child
                    </InputLabel>
                    <TextField
                      placeholder="johndoe@gmail.com"
                      sx={{ width: "37.5rem", textTransform: "capitalize" }}
                      name="minimumTargetAge"
                      type="text"
                    />
                  </Box>
                  <Box sx={{ marginBottom: "1.5625rem" }}>
                    <InputLabel
                      sx={{
                        color: "#222222",
                        fontWeight: 500,
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        marginBottom: "0.625rem",
                      }}
                    >
                      Dosage
                    </InputLabel>
                    <TextField
                      placeholder="johndoe@gmail.com"
                      sx={{ width: "37.5rem" }}
                      name="dosage"
                      type="text"
                    />
                  </Box>
                  <Box sx={{ marginBottom: "1.5625rem" }}>
                    <InputLabel
                      sx={{
                        color: "#222222",
                        fontWeight: 500,
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        marginBottom: "0.625rem",
                      }}
                    >
                      Route of Administration
                    </InputLabel>
                    <TextField
                      placeholder="johndoe@gmail.com"
                      sx={{ width: "37.5rem", textTransform: "capitalize" }}
                      name="routeOfAdministration"
                      type="text"
                    />
                  </Box>
                  <Box sx={{ marginBottom: "1.5625rem" }}>
                    <InputLabel
                      sx={{
                        color: "#222222",
                        fontWeight: 500,
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        marginBottom: "0.625rem",
                      }}
                    >
                      Site of Administration
                    </InputLabel>
                    <TextField
                      placeholder="johndoe@gmail.com"
                      sx={{ width: "37.5rem", textTransform: "capitalize" }}
                      name="siteOfAdministration"
                      type="text"
                    />
                  </Box>
                  <Button
                    sx={{
                      width: "100%",
                      backgroundColor: "#1F8E1F",
                      paddingY: "0.75rem",
                      paddingX: "2.25rem",
                      borderRadius: "5rem",
                      color: "#FFFFFF",
                      textTransform: "none",
                    }}
                    type="submit"
                    disabled={vaccineMutation.isPending}
                  >
                    {vaccineMutation.isPending ? (
                      <CircularProgress sx={{ color: "white" }} />
                    ) : (
                      "Create New Vaccine"
                    )}
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
                    marginTop: "0.625rem",
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
                  gap: "0.3125rem",
                  marginBottom: "0.3125rem",
                }}
                disableRipple
              >
                <ArrowBackSharpIcon sx={{ color: "#1F8E1F" }} />{" "}
                <Typography
                  sx={{ color: "#000000", fontSize: "1rem", fontWeight: 400 }}
                >
                  Back
                </Typography>
              </Button>
              <Typography
                sx={{
                  width: "100%",
                  color: "#000000",
                  fontWeight: 600,
                  fontSize: "1.5rem",
                  lineHeight: "2.25rem",
                  marginBottom: "0.3125rem",
                }}
              >
                Onboard Parent
              </Typography>
              <Grid sx={{ width: "100%" }}>
                <form onSubmit={handleSubmitParent}>
                  {parentMutation.isError && parentError.validationError && (
                    <Box sx={{ marginBottom: "0.3125rem" }}>
                      <ul>
                        {parentError.validationError.map((valErr) => {
                          return (
                            <li
                              style={{ color: "red", fontSize: "0.9375rem" }}
                              key={valErr.msg}
                            >
                              {valErr.msg}
                            </li>
                          );
                        })}
                      </ul>
                    </Box>
                  )}
                  <Box sx={{ marginBottom: "0.3125rem" }}>
                    <InputLabel
                      sx={{
                        color: "#222222",
                        fontWeight: 500,
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        marginBottom: "0.3125rem",
                      }}
                    >
                      First Name
                    </InputLabel>
                    <TextField
                      placeholder="e.g Abubakar"
                      sx={{ width: "37.5rem", textTransform: "capitalize" }}
                      name="firstName"
                      type="text"
                    />
                  </Box>
                  <Box sx={{ marginBottom: "0.3125rem" }}>
                    <InputLabel
                      sx={{
                        color: "#222222",
                        fontWeight: 500,
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        marginBottom: "0.3125rem",
                      }}
                    >
                      Last Name
                    </InputLabel>
                    <TextField
                      placeholder="e.g Olatunji"
                      sx={{ width: "37.5rem", textTransform: "capitalize" }}
                      name="lastName"
                      type="text"
                    />
                  </Box>
                  <Box sx={{ marginBottom: "0.3125rem" }}>
                    <InputLabel
                      sx={{
                        color: "#222222",
                        fontWeight: 500,
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        marginBottom: "0.3125rem",
                      }}
                    >
                      Parental Role
                    </InputLabel>
                    <TextField
                      placeholder="e.g Mom"
                      sx={{ width: "37.5rem", textTransform: "capitalize" }}
                      name="title"
                      type="text"
                    />
                  </Box>

                  <Box sx={{ marginBottom: "0.3125rem" }}>
                    <InputLabel
                      sx={{
                        color: "#222222",
                        fontWeight: 500,
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        marginBottom: "0.3125rem",
                      }}
                    >
                      Date of Birth
                    </InputLabel>
                    <TextField
                      sx={{ width: "37.5rem" }}
                      name="dateOfBirth"
                      type="date"
                    />
                  </Box>
                  <Box sx={{ marginBottom: "0.3125rem" }}>
                    <InputLabel
                      sx={{
                        color: "#222222",
                        fontWeight: 500,
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        marginBottom: "0.3125rem",
                      }}
                    >
                      Hospital Number
                    </InputLabel>
                    <TextField
                      placeholder="e.g JUN00222"
                      sx={{ width: "37.5rem", textTransform: "uppercase" }}
                      name="hospitalNumber"
                      type="text"
                    />
                  </Box>
                  <Box sx={{ marginBottom: "0.3125rem" }}>
                    <InputLabel
                      sx={{
                        color: "#222222",
                        fontWeight: 500,
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        marginBottom: "0.3125rem",
                      }}
                    >
                      NHIS
                    </InputLabel>
                    <TextField
                      placeholder="e.g 4567585"
                      sx={{ width: "37.5rem" }}
                      name="nhis"
                      type="text"
                    />
                  </Box>
                  <Box sx={{ marginBottom: "0.3125rem" }}>
                    <InputLabel
                      sx={{
                        color: "#222222",
                        fontWeight: 500,
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        marginBottom: "0.3125rem",
                      }}
                    >
                      Email Address
                    </InputLabel>
                    <TextField
                      placeholder="e.g johndoe@gmail.com"
                      sx={{ width: "37.5rem" }}
                      type="email"
                      name="email"
                    />
                  </Box>
                  <Box sx={{ marginBottom: "0.3125rem" }}>
                    <InputLabel
                      sx={{
                        color: "#222222",
                        fontWeight: 500,
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        marginBottom: "0.3125rem",
                      }}
                    >
                      Phone Number
                    </InputLabel>
                    <TextField
                      placeholder="e.g 08084972144"
                      sx={{ width: "37.5rem" }}
                      name="phoneNumber"
                      type="tel"
                    />
                  </Box>
                  <Button
                    sx={{
                      width: "100%",
                      backgroundColor: "#1F8E1F",
                      paddingY: "0.75rem",
                      paddingX: "2.25rem",
                      borderRadius: "5rem",
                      color: "#FFFFFF",
                      textTransform: "none",
                    }}
                    type="submit"
                    disabled={parentMutation.isPending}
                    // onClick={handleCloseParent}
                  >
                    {parentMutation.isPending ? (
                      <CircularProgress
                        sx={{
                          color: "#FFFFFF",
                        }}
                        size={"1.875rem"}
                      />
                    ) : (
                      "Add New Parent"
                    )}
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
                    marginTop: "0.625rem",
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
                onClick={handleCloseChild}
                variant="text"
                sx={{
                  textTransform: "none",
                  display: "flex",
                  flexDirection: "row",
                  gap: "0.3125rem",
                  marginBottom: "0.3125rem",
                }}
                disableRipple
              >
                <ArrowBackSharpIcon sx={{ color: "#1F8E1F" }} />{" "}
                <Typography
                  sx={{ color: "#000000", fontSize: "1rem", fontWeight: 400 }}
                >
                  Back
                </Typography>
              </Button>
              <Typography
                sx={{
                  width: "100%",
                  color: "#000000",
                  fontWeight: 600,
                  fontSize: "1.5rem",
                  lineHeight: "2.25rem",
                  marginBottom: "0.3125rem",
                }}
              >
                Onboard a Child
              </Typography>
              <Grid sx={{ width: "100%" }}>
                <form onSubmit={handleSubmitChild}>
                  {childMutation.isError && childError.validationError && (
                    <Box sx={{ marginBottom: "0.3125rem" }}>
                      <ul>
                        {childError.validationError.map((valErr) => {
                          return (
                            <li
                              style={{ color: "red", fontSize: "0.9375rem" }}
                              key={valErr.msg}
                            >
                              {valErr.msg}
                            </li>
                          );
                        })}
                      </ul>
                    </Box>
                  )}
                  <Box sx={{ marginBottom: "0.3125rem" }}>
                    <InputLabel
                      sx={{
                        color: "#222222",
                        fontWeight: 500,
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        marginBottom: "0.3125rem",
                      }}
                    >
                      First Name
                    </InputLabel>
                    <TextField
                      placeholder="e.g Oreoluwa"
                      sx={{ width: "37.5rem", textTransform: "capitalize" }}
                      name="firstname"
                      type="text"
                    />
                  </Box>
                  <Box sx={{ marginBottom: "0.3125rem" }}>
                    <InputLabel
                      sx={{
                        color: "#222222",
                        fontWeight: 500,
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        marginBottom: "0.3125rem",
                      }}
                    >
                      Last Name
                    </InputLabel>
                    <TextField
                      placeholder="e.g Adepoju"
                      sx={{ width: "37.5rem", textTransform: "capitalize" }}
                      name="lastname"
                      type="text"
                    />
                  </Box>
                  <Box sx={{ marginBottom: "0.3125rem" }}>
                    <InputLabel
                      sx={{
                        color: "#222222",
                        fontWeight: 500,
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        marginBottom: "0.3125rem",
                      }}
                    >
                      Sex
                    </InputLabel>
                    <TextField
                      placeholder="e.g FEMALE"
                      sx={{ width: "37.5rem", textTransform: "uppercase" }}
                      name="sex"
                      type="text"
                    />
                  </Box>

                  <Box sx={{ marginBottom: "0.3125rem" }}>
                    <InputLabel
                      sx={{
                        color: "#222222",
                        fontWeight: 500,
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        marginBottom: "0.3125rem",
                      }}
                    >
                      Date of Birth
                    </InputLabel>
                    <TextField
                      //   placeholder=""
                      sx={{ width: "37.5rem" }}
                      name="dob"
                      type="date"
                    />
                  </Box>

                  <Box sx={{ marginBottom: "0.3125rem" }}>
                    <InputLabel
                      sx={{
                        color: "#222222",
                        fontWeight: 500,
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        marginBottom: "0.3125rem",
                      }}
                    >
                      Weight at Birth{" "}
                      <Typography
                        component={"span"}
                        sx={{
                          color: "#222222",
                          fontWeight: 300,
                          fontSize: "0.75rem",

                          //   lineHeight: "1.5rem",
                        }}
                      >
                        (write in kilograms)
                      </Typography>
                    </InputLabel>
                    <TextField
                      placeholder="e.g 3.5"
                      sx={{ width: "37.5rem" }}
                      name="weightAtBirth"
                      type="text"
                    />
                  </Box>
                  <Button
                    sx={{
                      width: "100%",
                      backgroundColor: "#1F8E1F",
                      paddingY: "0.75rem",
                      paddingX: "2.25rem",
                      borderRadius: "5rem",
                      color: "#FFFFFF",
                      textTransform: "none",
                    }}
                    type="submit"
                  >
                    {childMutation.isPending ? (
                      <CircularProgress size={"1.25rem"} />
                    ) : (
                      "Onboard"
                    )}
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
                    marginTop: "0.625rem",
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

          <Grid
            size={12}
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "1.25rem",
              padding: "2.5rem",
              paddingX: "5%",
              minHeight: "12.5rem",
              marginBottom: "1.875rem",
            }}
          >
            <Grid
              sx={{
                borderBottom: 1,
                borderColor: "#1F8E1F",
                paddingBottom: "1.25rem",
              }}
            >
              <Typography
                sx={{ fontWeight: 600, fontSize: "1.5rem", lineHeight: "2.25rem" }}
              >
                Welcome Back
              </Typography>
            </Grid>
            <Grid
              sx={{
                paddingTop: "2.1875rem",
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
                  sx={{ color: "#000000", fontSize: "1rem", fontWeight: 300 }}
                >
                  {getDailyScheduleQuery.isSuccess &&
                    `${getDailyScheduleQuery.data.totalScheduledToday} 
                scheduled children today`}
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
                  sx={{ color: "#C91919", fontSize: "1rem", fontWeight: 300 }}
                >
                  {getDailyScheduleQuery.isSuccess &&
                    `${getDailyScheduleQuery.data.missedCount}
                missed immunization`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Grid
              onClick={handleOpenParent}
              size={12}
              sx={{
                minHeight: "12.5rem",
                borderRadius: "1.25rem",
                zIndex: 5,
                marginBottom: "1.875rem",
              }}
            >
              <Grid
                sx={{
                  minWidth: "100%",
                  minHeight: "12.5rem",
                  backgroundImage: `url(${splash})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "1.25rem",
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
                    borderRadius: "1.25rem",
                    right: 0,
                    bottom: 0,
                    backgroundColor: "#1F8E1FE5",
                    zIndex: 1,
                  },
                  "&:hover": {
                    border: 1,
                    borderColor: "#1F8E1F",
                    // transform: "scale(1.05)",
                    // transition: "0.3s ease",
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
                      gap: "1.5rem",
                      maxWidth: "28.75rem",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#FFFFFF",
                        fontWeight: 600,
                        fontSize: "1.5rem",
                        lineHeight: "2.25rem",
                        zIndex: 10,
                        width: "9.375rem",
                      }}
                    >
                      Onboard New Parent
                    </Typography>
                    <Typography
                      sx={{
                        color: "#FFFFFF",
                        fontWeight: 400,
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        zIndex: 10,
                        width: "12.5rem",
                      }}
                    >
                      Add a New Parent and then a new child
                    </Typography>
                  </Grid>
                  <Grid sx={{ zIndex: 17 }}>
                    <AddCircleRoundedIcon
                      sx={{
                        color: "#FFFFFF",
                        width: "3.75rem",
                        height: "3.75rem",
                        zIndex: 17,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </motion.div>
          <Grid
            size={12}
            sx={{
              paddingX: "3%",
              paddingY: "2%",
              backgroundColor: "#FFFFFF",
              borderRadius: "1.25rem",
              maxHeight: "5.625rem",
              marginBottom: "1.875rem",
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                color: "#000000",
                fontSize: "1.5rem",
                lineHeight: "2.25rem",
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
              marginBottom: "1.875rem",
              maxHeight: "48.5625rem",
              display: "flex",
              flexDirection: "column",
              paddingY: "4%",
              paddingX: "3%",
              borderRadius: "1.25rem",
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
                  fontSize: "1rem",
                  lineHeight: "1.125rem",
                }}
              >
                Name
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  color: "#000000",
                  fontWeight: 400,
                  fontSize: "1rem",
                  lineHeight: "1.125rem",
                }}
              >
                Vaccine
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  color: "#000000",
                  fontWeight: 400,
                  fontSize: "1rem",
                  lineHeight: "1.125rem",
                }}
              >
                Status
              </Typography>
            </Grid>
            <List sx={{ display: "flex", flexDirection: "column" }}>
              {getSchedulesQuery.isError && (
                <Typography sx={{ color: "red" }}>
                  {getErrorMessage(getSchedulesQuery.error)}
                </Typography>
              )}
              {getSchedulesQuery.isPending && (
                <CircularProgress sx={{ color: "green", margin: "auto" }} />
              )}
              {getSchedulesQuery.isSuccess &&
                getSchedulesQuery.data.data.length <= 0 && (
                  <Typography sx={{ margin: "auto" }}>
                    Schedules appear here
                  </Typography>
                )}
              {getSchedulesQuery.isSuccess &&
                getSchedulesQuery.data.data &&
                getSchedulesQuery.data.data.map((schedule) => {
                  <ListItem
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
                        borderRadius: "0.9375rem",
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
                        maxWidth: "7.5rem",
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                      }}
                    >
                      {schedule.child.firstName} {schedule.child.lastName}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#000000",
                        fontWeight: 300,
                        maxWidth: "11.875rem",

                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                      }}
                    >
                      {schedule.vaccine.type}
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: "#C9191926",
                        paddingY: "0.5rem",
                        paddingX: "1rem",
                        borderRadius: "50rem",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#C91919",
                          fontWeight: 400,
                          fontSize: "0.75rem",
                          lineHeight: "0.875rem",
                        }}
                      >
                        {schedule.status}
                      </Typography>
                    </Box>
                  </ListItem>;
                })}
            </List>
          </Grid>
        </Grid>
        <Grid size={3.5}>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Grid
              size={12}
              onClick={handleOpenVaccine}
              sx={{
                backgroundColor: "#D9ECD9",
                borderRadius: "1.25rem",
                marginBottom: "1.875rem",
                paddingX: "7%",
                minHeight: "12.5rem",
                paddingY: "7%",
                height: "fit-content",
                display: "flex",
                flexDirection: "row",
                gap: 3,
                alignItems: "center",
                "&:hover": {
                  //   backgroundColor: "#1F8E1F0D",
                  //   borderRadius: "0.9375rem",
                  border: 1,
                  borderColor: "#1F8E1F",

                  cursor: "pointer",
                },
              }}
            >
              <Grid>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "1.5rem",
                    lineHeight: "2.25rem",
                    color: "#1F8E1F",
                  }}
                >
                  Add a New Vaccine
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "1rem",
                    lineHeight: "1.5rem",

                    color: "#1F8E1F",
                  }}
                >
                  Add a New Vaccine to be administer to all
                </Typography>
              </Grid>
              <Grid>
                <AddCircleRoundedIcon
                  sx={{ color: "#1F8E1F", height: "3.125rem", width: "3.125rem" }}
                />
              </Grid>
            </Grid>
          </motion.div>

          <Grid
            size={12}
            sx={{
              backgroundColor: "#FFFFFF",
              marginBottom: "1.875rem",
              borderRadius: "1.25rem",
              paddingX: "7%",
              paddingY: "7%",
              display: "flex",
              minHeight: "12.5rem",
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
                  fontSize: "1rem",
                  fontWeight: 600,
                  lineHeight: "1.5rem",
                }}
              >
                No. of Children
              </Typography>
              <Link to={"/children"} style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontWeight: 300,
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
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
                gap: "1rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <WcIcon
                sx={{
                  color: "#1F8E1F",
                  paddingY: "1.125rem",
                  paddingX: "0.875rem",
                  backgroundColor: "#1F8E1F1A",
                  borderRadius: "187.5rem",
                  height: "4rem",
                  width: "4rem",
                }}
              />
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: "1.75rem",
                  lineHeight: "2.625rem",
                  color: "#1F8E1F",
                }}
              >
                {getChildrenQuery.isSuccess &&
                  getChildrenQuery.data.pagination.total}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            size={12}
            sx={{
              display: "flex",
              marginBottom: "1.875rem",
              flexDirection: "column",
              backgroundColor: "#FFFFFF",
              maxHeight: "48.5625rem",
              borderRadius: "1.25rem",
              paddingX: "7%",
              paddingY: "7%",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                // justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 600,
                  fontSize: "1.5rem",
                  lineHeight: "2.25rem",
                }}
              >
                Parents
              </Typography>
              {/* <Grid sx={{ display: "flex", flexDirection: "row", gap: "1.25rem" }}>
              <SortSharpIcon />
              <SearchSharpIcon />
            </Grid> */}
            </Grid>
            <Box
              sx={{
                overflowY: "auto",
                whiteSpace: "nowrap",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {getParentsQuery.isPending && (
                <CircularProgress sx={{ color: "green", margin: "auto" }} />
              )}
              {getParentsQuery.isSuccess &&
                getParentsQuery.data.data.length === 0 && (
                  <Typography sx={{ margin: "auto" }}>
                    Parents appear here
                  </Typography>
                )}
              {getParentsQuery.isSuccess &&
                getParentsQuery.data.data &&
                getParentsQuery.data.data.map((parent) => {
                  return (
                    <Box
                      key={parent._id}
                      sx={{
                        borderBottom: 1,
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingY: "10%",
                        "&:hover": {
                          backgroundColor: "#1F8E1F0D",
                          borderRadius: "0.9375rem",
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
                          fontSize: "1rem",
                          lineHeight: "1.5rem",
                          maxWidth: "9.0625rem",
                        }}
                      >
                        {parent.firstName} {parent.lastName}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#1F8E1F",
                          fontWeight: 300,
                          fontSize: "1rem",
                          lineHeight: "1.5rem",
                          maxWidth: "9.0625rem",
                        }}
                      >
                        {parent.childrenCount}{" "}
                        {parent.childrenCount === 1 ? "child" : "children"}
                      </Typography>
                    </Box>
                  );
                })}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
