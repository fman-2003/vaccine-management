/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { TextField, InputLabel } from "@mui/material";
import {
  Typography,
  // Avatar,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  getChildren,
  updateParent,
  getParentById,
  createChild,
} from "../query";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAlert from "../hooks/useAlert";
import AlertMessage from "./AlertMessage";

import haceyLogo from "../assets/hacey-svg.svg";
// import avatar from "../assets/avatar.svg";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ModalWindow from "./Modal";

export default function ParentProfile({ onClose, open, parentId }) {
  const alert = useAlert();
  const queryClient = useQueryClient();

  const [openChild, setOpenChild] = React.useState(false);
  const [openParent, setOpenParent] = React.useState(false);
  const [childError, setChildError] = React.useState({});
  const [parentError, setParentError] = React.useState({});

  const getParentQuery = useQuery({
    queryKey: ["parents", parentId],
    queryFn: () => {
      return getParentById(parentId);
    },
    enabled: !!parentId,
  });

  const getChildrenQuery = useQuery({
    queryKey: ["children", parentId],
    queryFn: () => {
      return getChildren({ page: 1, limit: 10, parent: parentId });
    },
    enabled: !!parentId,
  });

  const updateParentMutation = useMutation({
    mutationFn: ({ parentId, data }) => {
      return updateParent(parentId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parents", parentId] });
    },
  });

  const childMutation = useMutation({
    mutationFn: createChild,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["children", parentId] });
    },
  });

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
        setOpenChild(false);
        alert.showSuccess(data.message);
      },
      onError: (error) => {
        if (error.message.includes("422")) {
          setChildError((prev) => {
            return {
              ...prev,
              validationError: error.response.data.errors,
            };
          });
        }
        alert.showError(error.response.data.message);
        setChildError((prev) => {
          return {
            ...prev,
            error: error.response.data.message,
          };
        });
      },
    });
  };

  const handleSubmitParent = (e) => {
    e.preventDefault();
    setParentError({ error: "", validationError: [] });
    const parentFormData = new FormData(e.target);
    const data = {
      firstName: parentFormData.get("firstName"),
      lastName: parentFormData.get("lastName"),
      title: parentFormData.get("title"),
      email: parentFormData.get("email"),
      phoneNumber: parentFormData.get("phoneNumber"),
      dateOfBirth: parentFormData.get("dateOfBirth"),
      hospitalNumber: parentFormData.get("hospitalNumber"),
      nhis: parentFormData.get("nhis"),
    };
    updateParentMutation.mutate(
      { parentId, data },
      {
        onSuccess: (data) => {
          setOpenParent(false);
          setOpenChild(true);
          alert.showSuccess(data.message);
        },
        onError: (error) => {
          if (error.message.includes("422")) {
            setParentError((prev) => {
              return {
                ...prev,
                validationError: error.response.data.errors,
              };
            });
          }
          alert.showError(error.response.data.message);
          setParentError((prev) => {
            return {
              ...prev,
              error: error.response.data.message,
            };
          });
        },
      },
    );
  };

  const handleCloseParent = () => setOpenParent(false);
  const handleOpenParent = () => setOpenParent(true);
  const handleOpenChild = () => setOpenChild(true);
  const handleCloseChild = () => {
    setOpenChild(false);
  };

  const todayYear = new Date().getUTCFullYear();
  const age =
    getParentQuery.isSuccess && getParentQuery.data?.data?.dateOfBirth
      ? todayYear -
        new Date(getParentQuery.data.data.dateOfBirth).getUTCFullYear()
      : null;
  return (
    <>
      <AlertMessage {...alert.props} />
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
            <form onSubmit={handleSubmitParent}>
              {updateParentMutation.isError && parentError.validationError && (
                <Box sx={{ marginBottom: "5px" }}>
                  <ul>
                    {parentError.validationError.map((valErr) => {
                      return (
                        <li
                          style={{ color: "red", fontSize: "15px" }}
                          key={valErr.msg}
                        >
                          {valErr.msg}
                        </li>
                      );
                    })}
                  </ul>
                </Box>
              )}
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
                  sx={{ width: "600px", textTransform: "capitalize" }}
                  name="firstName"
                  type="text"
                  defaultValue={getParentQuery.data?.data?.firstName ?? ""}
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
                  sx={{ width: "600px", textTransform: "capitalize" }}
                  name="lastName"
                  type="text"
                  defaultValue={getParentQuery.data?.data?.lastName ?? ""}
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
                  sx={{ width: "600px", textTransform: "capitalize" }}
                  name="title"
                  type="text"
                  defaultValue={getParentQuery.data?.data?.title ?? ""}
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
                  sx={{ width: "600px" }}
                  name="dateOfBirth"
                  type="date"
                  defaultValue={getParentQuery.data?.data?.dateOfBirth ?? ""}
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
                  placeholder="e.g JUN00222"
                  sx={{ width: "600px", textTransform: "uppercase" }}
                  name="hospitalNumber"
                  type="text"
                  defaultValue={getParentQuery.data?.data?.hospitalNumber ?? ""}
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
                  defaultValue={getParentQuery.data?.data?.nhis ?? ""}
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
                  defaultValue={getParentQuery.data?.data?.email ?? ""}
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
                  name="phoneNumber"
                  type="tel"
                  defaultValue={getParentQuery.data?.data?.phoneNumber ?? ""}
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
                disabled={updateParentMutation.isPending}
                // onClick={handleCloseParent}
              >
                {updateParentMutation.isPending ? (
                  <CircularProgress
                    sx={{
                      color: "green",
                      margin: "auto",
                    }}
                    size={"30px"}
                  />
                ) : (
                  "Update Parent"
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
      <ModalWindow onClose={onClose} open={open}>
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
                {childMutation.isError && childError.validationError && (
                  <Box sx={{ marginBottom: "5px" }}>
                    <ul>
                      {childError.validationError.map((valErr) => {
                        return (
                          <li
                            style={{ color: "red", fontSize: "15px" }}
                            key={valErr.msg}
                          >
                            {valErr.msg}
                          </li>
                        );
                      })}
                    </ul>
                  </Box>
                )}
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
                    sx={{ width: "600px", textTransform: "capitalize" }}
                    name="firstname"
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
                    sx={{ width: "600px", textTransform: "capitalize" }}
                    name="lastname"
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
                    placeholder="e.g FEMALE"
                    sx={{ width: "600px", textTransform: "uppercase" }}
                    name="sex"
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
                    name="dob"
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
                    name="weightAtBirth"
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
                  {childMutation.isPending ? (
                    <CircularProgress
                      size={"20px"}
                      sx={{ margin: "auto", color: "green" }}
                    />
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

        <Grid
          sx={{
            borderRadius: "20px",
            backgroundColor: "#FFFFFF",
            width: "1000px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "30px",
            }}
          >
            <CancelRoundedIcon
              //   component={Button}
              onClick={onClose}
              sx={{
                color: "#1F8E1F",
                width: "30px",
                height: "30px",
                "&:hover": {
                  borderRadius: "900px",
                  transform: "scale(1.3)",
                  transition: "0.1s ease",
                  // width: "40px",
                  // height: "40px",
                  cursor: "pointer",
                },
              }}
            />
            <EditRoundedIcon
              sx={{
                color: "#1F8E1F",
                width: "30px",
                height: "30px",
                "&:hover": {
                  borderRadius: "900px",
                  transform: "scale(1.3)",
                  transition: "0.1s ease",
                  // width: "40px",
                  // height: "40px",
                  cursor: "pointer",
                },
              }}
              onClick={handleOpenParent}
            />
          </Box>
          {getParentQuery.isPending ? (
            <CircularProgress
              sx={{ color: "green", size: "50px", margin: "auto" }}
            />
          ) : (
            <Grid container spacing={3} sx={{ width: "80%" }}>
              <Grid
                size={6}
                sx={{
                  margin: "auto",
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
                  {/* <Avatar
                    src={avatar}
                    sx={{ height: "50px", width: "50px", margin: "auto" }}
                  /> */}
                  <Typography
                    sx={{
                      color: "#1F8E1F",
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "24px",
                    }}
                  >
                    {getParentQuery.data.data.firstName}{" "}
                    {getParentQuery.data.data.lastName}
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
                    {getParentQuery.data.data.title} | {age} years
                  </Typography>
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
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
                      sx={{
                        fontWeight: 400,
                        fontSize: "16px",
                        color: "#222222CC",
                      }}
                    >
                      Hospital Number:{" "}
                      {getParentQuery.data.data.hospitalNumber
                        ? getParentQuery.data.data.hospitalNumber
                        : "Not provided"}
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
                      sx={{
                        fontWeight: 400,
                        fontSize: "16px",
                        color: "#222222CC",
                      }}
                    >
                      NHIS:{" "}
                      {getParentQuery.data.data.nhis
                        ? getParentQuery.data.data.nhis
                        : "Not provided"}
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
                      sx={{
                        fontWeight: 400,
                        fontSize: "16px",
                        color: "#222222CC",
                      }}
                    >
                      {getParentQuery.data.data.email
                        ? getParentQuery.data.data.email
                        : "Not provided"}
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
                      sx={{
                        fontWeight: 400,
                        fontSize: "16px",
                        color: "#222222CC",
                      }}
                    >
                      {getParentQuery.data.data.phoneNumber
                        ? getParentQuery.data.data.phoneNumber
                        : "Not provided"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "20px",
                  paddingY: "4%",
                  paddingX: "2%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  alignItems: "center",
                  maxHeight: "400px",
                  justifyContent: "center",
                }}
                size={6}
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
                  {getChildrenQuery.isPending ? (
                    <Typography sx={{ margin: "auto", color: "gray" }}>
                      Fetching children...
                    </Typography>
                  ) : (
                    getChildrenQuery.data.data.map((child) => {
                      return (
                        <Link
                          key={child._id}
                          to={`/children/${child._id}`}
                          style={{
                            color: "#000000",
                            fontWeight: "400px",
                            fontSize: "16px",
                            textDecoration: "none",
                            zIndex: 4,
                          }}
                        >
                          {child.firstName} {child.lastName}
                        </Link>
                      );
                    })
                  )}
                </Grid>
                <AddCircleRoundedIcon
                  sx={{
                    width: "35px",
                    height: "35px",
                    color: "#1F8E1F",
                    marginRight: "3%",
                    "&:hover": {
                      borderRadius: "900px",
                      transform: "scale(1.1)",
                      transition: "0.1s ease",
                      cursor: "pointer",
                    },
                  }}
                  onClick={handleOpenChild}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </ModalWindow>
    </>
  );
}
