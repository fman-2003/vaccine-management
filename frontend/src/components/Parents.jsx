import React from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Box,
  TextField,
  // InputAdornment,
  Button,
  InputLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import AlertMessage from "./AlertMessage";
import useAlert from "../hooks/useAlert";
import { motion } from "framer-motion";

import "@fontsource/roboto";
import splash from "../assets/splash.svg";
import haceyLogo from "../assets/hacey-svg.svg";
// import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import WcIcon from "@mui/icons-material/Wc";
import EscalatorWarningRoundedIcon from "@mui/icons-material/EscalatorWarningRounded";
import ModalWindow from "./Modal";
import ParentProfile from "./ParentProfile";
import { createParent, getParents, createChild, getChildren } from "../query";
import { getErrorMessage, getValidationErrors } from "../helper/get-error-message";

export default function Parents() {
  const alert = useAlert();
  const queryClient = useQueryClient();
  const [openParent, setOpenParent] = React.useState(false);
  const [openChild, setOpenChild] = React.useState(false);
  const [parentError, setParentError] = React.useState({});
  const [childError, setChildError] = React.useState({});
  const [openParentProfile, setOpenParentProfile] = React.useState(false);
  const [parentId, setParentId] = React.useState("");

  const getParentsQuery = useQuery({
    queryKey: ["parents"],
    queryFn: getParents,
  });

  const getChildrenQuery = useQuery({
    queryKey: ["children"],
    queryFn: getChildren,
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

  const handleOpenParent = () => setOpenParent(true);
  const handleCloseParent = () => setOpenParent(false);

  const handleCloseChild = () => {
    setOpenChild(false);
    setParentId("");
  };

  const handleOpenParentProfile = (id) => {
    setParentId(id);
    setOpenParentProfile(true);
  };
  const handleCloseParentProfile = () => setOpenParentProfile(false);

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

  return (
    <Grid container spacing={2} sx={{ width: "95%", minHeight: "100vh" }}>
      {<AlertMessage {...alert.props} />}
      <Grid size={8}>
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
          sx={{
            maxHeight: "63.1875rem",
            borderRadius: "1rem",
            overflowY: "auto",
            paddingY: "3%",
            paddingX: "4%",
            backgroundColor: "#FFFFFF",
          }}
          size={12}
        >
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "0.625rem",
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "1.5rem",
                lineHeight: "2.25rem",
                color: "#000000",
              }}
            >
              Parents
            </Typography>
            {/* <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 4,
                alignItems: "center",
              }}
            >
              <SortSharpIcon />
              <TextField
                id="input-with-icon-textfield"
                placeholder="Search"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="start">
                        <SearchSharpIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                variant="standard"
                sx={{ width: "25rem" }}
              />
            </Box> */}
          </Grid>
          <Grid sx={{ display: "flex", flexDirection: "column" }}>
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
                  <>
                    <ParentProfile
                      open={openParentProfile}
                      onClose={handleCloseParentProfile}
                      parentId={parentId}
                      key={parentId}
                    />
                    <Grid
                      key={parentId}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        textTransform: "none",
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
                      component={Button}
                      onClick={() => handleOpenParentProfile(parent._id)}
                      disableRipple
                    >
                      <Typography
                        sx={{
                          color: "#000000",
                          fontWeight: 500,
                          // maxWidth: "7.5rem",
                          fontSize: "1rem",
                          lineHeight: "1.5rem",
                          textDecoration: "none",
                        }}
                      >
                        {parent.firstName} {parent.lastName}
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
                        {parent.phoneNumber}
                      </Typography>
                      <Box>
                        <Typography
                          sx={{
                            color: "#1F8E1F",
                            fontWeight: 300,
                            fontSize: "1rem",
                            lineHeight: "1.5rem",
                          }}
                        >
                          {parent.childrenCount}{" "}
                          {parent.childrenCount === 1 ? "child" : "children"}
                        </Typography>
                      </Box>
                    </Grid>
                  </>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
      <Grid size={3.5}>
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
          sx={{
            backgroundColor: "#D9ECD9",
            borderRadius: "1.25rem",
            paddingX: "10%",
            paddingY: "7%",
            display: "flex",
            flexDirection: "column",
            marginBottom: "1.875rem",
            gap: 5,
          }}
          size={12}
        >
          <Typography
            sx={{ color: "#000000", fontWeight: 300, fontSize: "1.25rem" }}
          >
            No. of Parents
          </Typography>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <WcIcon
              sx={{
                color: "#1F8E1F",
                height: "3.75rem",
                width: "3.75rem",
                padding: "1rem",
                backgroundColor: "#F6FAF6",
                borderRadius: "56.25rem",
              }}
            />
            {getParentsQuery.isSuccess && (
              <Typography
                sx={{ fontSize: "1.875rem", fontWeight: 800, color: "#1F8E1F" }}
              >
                {getParentsQuery.data.pagination.total}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid
          sx={{
            backgroundColor: "#D9ECD9",
            borderRadius: "1.25rem",
            paddingX: "10%",
            paddingY: "7%",
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
          size={12}
        >
          <Typography
            sx={{ color: "#000000", fontWeight: 300, fontSize: "1.25rem" }}
          >
            No. of Children
          </Typography>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <EscalatorWarningRoundedIcon
              sx={{
                color: "#1F8E1F",
                height: "3.75rem",
                width: "3.75rem",
                padding: "1rem",
                backgroundColor: "#F6FAF6",
                borderRadius: "56.25rem",
              }}
            />
            {getChildrenQuery.isSuccess && (
              <Typography
                sx={{ fontSize: "1.875rem", fontWeight: 800, color: "#1F8E1F" }}
              >
                {getChildrenQuery.data.pagination.total}
              </Typography>
            )}
          </Grid>
          <Link to={"/children"} style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                fontSize: "1.125rem",
                fontWeight: 600,
                color: "#1F8E1F",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                  cursor: "pointer",
                },
              }}
            >
              View all
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}
