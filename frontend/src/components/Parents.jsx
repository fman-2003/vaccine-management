import React from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  InputLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";

import "@fontsource/roboto";
import splash from "../assets/splash.svg";
import haceyLogo from "../assets/hacey-svg.svg";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import SortSharpIcon from "@mui/icons-material/SortSharp";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import WcIcon from "@mui/icons-material/Wc";
import EscalatorWarningRoundedIcon from "@mui/icons-material/EscalatorWarningRounded";
import ModalWindow from "./Modal";
import ParentProfile from "./ParentProfile";
import { createParent } from "../query";

export default function Parents() {
  const queryClient = useQueryClient();
  const [openParent, setOpenParent] = React.useState(false);
  const [openParentProfile, setOpenParentProfile] = React.useState(false);

  const handleOpenParentProfile = () => setOpenParentProfile(true);
  const handleCloseParentProfile = () => setOpenParentProfile(false);
  const handleOpenParent = () => setOpenParent(true);
  const handleCloseParent = () => setOpenParent(false);

  const { error, isError, isPending, mutate } = useMutation({
    mutationFn: createParent,
    onSuccess: () => {
      setOpenParent(false);
      queryClient.invalidateQueries({ queryKey: ["parents"] });
    },
    // onError: ()
  });

  const handleSubmitParent = (e) => {
    e.preventDefault();
    const parentDetails = new FormData(e.target);
    mutate({
      firstName: parentDetails.get("firstName"),
      lastName: parentDetails.get("lastName"),
      title: parentDetails.get("title"),
      email: parentDetails.get("email"),
      phoneNumber: parentDetails.get("phoneNumber"),
      dateOfBirth: parentDetails.get("dateOfBirth"),
      hospitalNumber: parentDetails.get("hospitalNumber"),
      nhis: parentDetails.get("nhis"),
    });
  };
  return (
    <Grid container spacing={3} sx={{ width: "95%" }}>
      <Grid size={9}>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
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
        </motion.div>
        <Grid
          sx={{
            maxHeight: "1011px",
            borderRadius: "16px",
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
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "24px",
                lineHeight: "36px",
                color: "#000000",
              }}
            >
              Parents
            </Typography>
            <Box
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
                sx={{ width: "400px" }}
              />
            </Box>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              paddingY: "5%",
              paddingX: "4%",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ color: "#000000", fontWeight: 400, fontSize: "16px" }}
            >
              Name
            </Typography>
            <Typography
              sx={{ color: "#000000", fontWeight: 400, fontSize: "16px" }}
            >
              Status
            </Typography>
          </Grid>
          <Grid sx={{ display: "flex", flexDirection: "column" }}>
            {
              <ParentProfile
                open={openParentProfile}
                onClose={handleCloseParentProfile}
              />
            }
            <Grid
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
                  borderRadius: "15px",
                  border: 1,
                  borderColor: "#1F8E1F",
                  cursor: "pointer",
                },
              }}
              component={Button}
              onClick={handleOpenParentProfile}
              disableRipple
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 500,
                  maxWidth: "120px",
                  fontSize: "16px",
                  lineHeight: "24px",
                  textDecoration: "none",
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
                09097776667
              </Typography>
              <Box>
                <Typography
                  sx={{
                    color: "#1F8E1F",
                    fontWeight: 300,
                    fontSize: "16px",
                    lineHeight: "24px",
                  }}
                >
                  3 Children
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
                  textDecoration: "none",
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
                09097776667
              </Typography>
              <Box>
                <Typography
                  sx={{
                    color: "#1F8E1F",
                    fontWeight: 300,
                    fontSize: "16px",
                    lineHeight: "24px",
                  }}
                >
                  3 Children
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
                  textDecoration: "none",
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
                09097776667
              </Typography>
              <Box>
                <Typography
                  sx={{
                    color: "#1F8E1F",
                    fontWeight: 300,
                    fontSize: "16px",
                    lineHeight: "24px",
                  }}
                >
                  3 Children
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
                  textDecoration: "none",
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
                09097776667
              </Typography>
              <Box>
                <Typography
                  sx={{
                    color: "#1F8E1F",
                    fontWeight: 300,
                    fontSize: "16px",
                    lineHeight: "24px",
                  }}
                >
                  3 Children
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={3}>
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
                {isError && <Typography>An error occured: {error}</Typography>}
                <form onSubmit={handleSubmitParent}>
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
                      name="normalizeEmail"
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
                    disabled={isPending}
                    // onClick={handleCloseParent}
                  >
                    {isPending ? (
                      <CircularProgress
                        sx={{
                          color: "#FFFFFF",
                        }}
                        size={"30px"}
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
          sx={{
            backgroundColor: "#D9ECD9",
            borderRadius: "20px",
            paddingX: "10%",
            paddingY: "7%",
            display: "flex",
            flexDirection: "column",
            marginBottom: "30px",
            gap: 5,
          }}
          size={12}
        >
          <Typography
            sx={{ color: "#000000", fontWeight: 300, fontSize: "20px" }}
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
                height: "60px",
                width: "60px",
                padding: "16px",
                backgroundColor: "#F6FAF6",
                borderRadius: "900px",
              }}
            />
            <Typography
              sx={{ fontSize: "30px", fontWeight: 800, color: "#1F8E1F" }}
            >
              1,500+
            </Typography>
          </Grid>
          <Link style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                fontSize: "18px",
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
        <Grid
          sx={{
            backgroundColor: "#D9ECD9",
            borderRadius: "20px",
            paddingX: "10%",
            paddingY: "7%",
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
          size={12}
        >
          <Typography
            sx={{ color: "#000000", fontWeight: 300, fontSize: "20px" }}
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
                height: "60px",
                width: "60px",
                padding: "16px",
                backgroundColor: "#F6FAF6",
                borderRadius: "900px",
              }}
            />
            <Typography
              sx={{ fontSize: "30px", fontWeight: 800, color: "#1F8E1F" }}
            >
              2,500+
            </Typography>
          </Grid>
          <Link style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                fontSize: "18px",
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
