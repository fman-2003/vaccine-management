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
import { getErrorMessage, getValidationErrors } from "../helper/get-error-message";

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
              {updateParentMutation.isError && parentError.validationError && (
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
                  defaultValue={getParentQuery.data?.data?.firstName ?? ""}
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
                  defaultValue={getParentQuery.data?.data?.lastName ?? ""}
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
                  defaultValue={getParentQuery.data?.data?.title ?? ""}
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
                  defaultValue={getParentQuery.data?.data?.dateOfBirth ?? ""}
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
                  defaultValue={getParentQuery.data?.data?.hospitalNumber ?? ""}
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
                  defaultValue={getParentQuery.data?.data?.nhis ?? ""}
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
                  defaultValue={getParentQuery.data?.data?.email ?? ""}
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
                  defaultValue={getParentQuery.data?.data?.phoneNumber ?? ""}
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
                disabled={updateParentMutation.isPending}
                // onClick={handleCloseParent}
              >
                {updateParentMutation.isPending ? (
                  <CircularProgress
                    sx={{
                      color: "green",
                      margin: "auto",
                    }}
                    size={"1.875rem"}
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
                    <CircularProgress
                      size={"1.25rem"}
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
          sx={{
            borderRadius: "1.25rem",
            backgroundColor: "#FFFFFF",
            width: "62.5rem",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "1.875rem",
            }}
          >
            <CancelRoundedIcon
              //   component={Button}
              onClick={onClose}
              sx={{
                color: "#1F8E1F",
                width: "1.875rem",
                height: "1.875rem",
                "&:hover": {
                  borderRadius: "56.25rem",
                  transform: "scale(1.3)",
                  transition: "0.1s ease",
                  // width: "2.5rem",
                  // height: "2.5rem",
                  cursor: "pointer",
                },
              }}
            />
            <EditRoundedIcon
              sx={{
                color: "#1F8E1F",
                width: "1.875rem",
                height: "1.875rem",
                "&:hover": {
                  borderRadius: "56.25rem",
                  transform: "scale(1.3)",
                  transition: "0.1s ease",
                  // width: "2.5rem",
                  // height: "2.5rem",
                  cursor: "pointer",
                },
              }}
              onClick={handleOpenParent}
            />
          </Box>
          {getParentQuery.isPending ? (
            <CircularProgress
              sx={{ color: "green", size: "3.125rem", margin: "auto" }}
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
                  borderRadius: "1.25rem",
                  marginBottom: "1.25rem",
                }}
              >
                <Grid sx={{ margin: "auto", textAlign: "center" }}>
                  {/* <Avatar
                    src={avatar}
                    sx={{ height: "3.125rem", width: "3.125rem", margin: "auto" }}
                  /> */}
                  <Typography
                    sx={{
                      color: "#1F8E1F",
                      fontWeight: 600,
                      fontSize: "1rem",
                      lineHeight: "1.5rem",
                    }}
                  >
                    {getParentQuery.data.data.firstName}{" "}
                    {getParentQuery.data.data.lastName}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#000000",
                      fontWeight: 400,
                      fontSize: "1rem",
                      lineHeight: "1.5rem",
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
                        padding: "0.5rem",
                        borderRadius: "56.25rem",
                        height: "2.5rem",
                        width: "2.5rem",
                      }}
                    />{" "}
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: "1rem",
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
                        padding: "0.5rem",
                        borderRadius: "56.25rem",
                        height: "2.5rem",
                        width: "2.5rem",
                      }}
                    />{" "}
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: "1rem",
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
                        padding: "0.5rem",
                        borderRadius: "56.25rem",
                        height: "2.5rem",
                        width: "2.5rem",
                      }}
                    />{" "}
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: "1rem",
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
                        padding: "0.5rem",
                        borderRadius: "56.25rem",
                        height: "2.5rem",
                        width: "2.5rem",
                      }}
                    />{" "}
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: "1rem",
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
                  borderRadius: "1.25rem",
                  paddingY: "4%",
                  paddingX: "2%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  alignItems: "center",
                  maxHeight: "25rem",
                  justifyContent: "center",
                }}
                size={6}
              >
                <Typography
                  sx={{ fontWeight: 600, fontSize: "1.5rem", lineHeight: "2.25rem" }}
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
                            fontWeight: 400,
                            fontSize: "1rem",
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
                    width: "2.1875rem",
                    height: "2.1875rem",
                    color: "#1F8E1F",
                    marginRight: "3%",
                    "&:hover": {
                      borderRadius: "56.25rem",
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
