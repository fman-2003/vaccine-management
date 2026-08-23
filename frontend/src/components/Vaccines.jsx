/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import {
  Typography,
  Button,
  TextField,
  InputLabel,
  Box,
  // InputAdornment,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";

import haceyLogo from "../assets/hacey-svg.svg";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
// import SearchSharpIcon from "@mui/icons-material/SearchSharp";
// import SortSharpIcon from "@mui/icons-material/SortSharp";
import VaccinesRoundedIcon from "@mui/icons-material/VaccinesRounded";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import ModalWindow from "./Modal";
import AlertMessage from "./AlertMessage";
import useAlert from "../hooks/useAlert";
import { getVaccines, createVaccine } from "../query";

function VaccineCell({ children, color = "#000000", weight = 500 }) {
  return (
    <Typography
      sx={{
        color,
        fontWeight: weight,
        maxWidth: "190px",
        fontSize: "16px",
        lineHeight: "24px",
      }}
    >
      {children}
    </Typography>
  );
}

export default function Vaccines() {
  const alert = useAlert();
  const queryClient = useQueryClient();

  const [openVaccine, setOpenVaccine] = React.useState(false);
  const [vaccineError, setVaccineError] = React.useState({});

  const getVaccinesQuery = useQuery({
    queryKey: ["vaccines"],
    queryFn: getVaccines,
  });

  const vaccineMutation = useMutation({
    mutationFn: createVaccine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaccines"] });
    },
  });

  const handleOpenVaccine = () => setOpenVaccine(true);
  const handleCloseVaccine = () => setOpenVaccine(false);

  const handleSubmitVaccine = (e) => {
    e.preventDefault();
    setVaccineError({ error: "", validationError: [] });
    const formData = new FormData(e.target);
    const vaccineDetails = {
      type: formData.get("type").trim(),
      minimumTargetAge: formData.get("minimumTargetAge").trim(),
      dosage: formData.get("dosage").trim(),
      routeOfAdministration: formData.get("routeOfAdministration").trim(),
      siteOfAdministration: formData.get("siteOfAdministration").trim(),
    };
    vaccineMutation.mutate(vaccineDetails, {
      onSuccess: (data) => {
        setOpenVaccine(false);
        alert.showSuccess(data.message);
        e.target.reset();
      },
      onError: (error) => {
        if (error.message.includes("422")) {
          setVaccineError((prev) => ({
            ...prev,
            validationError: error.response.data.errors,
          }));
        }
        alert.showError(error.response.data.message);
        setVaccineError((prev) => ({
          ...prev,
          error: error.response.data.message,
        }));
      },
    });
  };

  const vaccines = getVaccinesQuery.data?.data ?? [];
  const total = getVaccinesQuery.data?.pagination?.total;

  return (
    <Grid container spacing={5} sx={{ width: "95%", minHeight: "100vh" }}>
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
                gap: "5px",
                marginBottom: "20px",
              }}
              disableRipple
            >
              <ArrowBackSharpIcon sx={{ color: "#1F8E1F" }} />
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
              <form onSubmit={handleSubmitVaccine}>
                {vaccineMutation.isError && vaccineError.validationError && (
                  <Box sx={{ marginBottom: "5px" }}>
                    <ul>
                      {vaccineError.validationError.map((valErr) => (
                        <li
                          style={{ color: "red", fontSize: "15px" }}
                          key={valErr.msg}
                        >
                          {valErr.msg}
                        </li>
                      ))}
                    </ul>
                  </Box>
                )}
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
                    placeholder="e.g BCG"
                    sx={{ width: "600px", textTransform: "capitalize" }}
                    name="type"
                    type="text"
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
                    placeholder="e.g At Birth"
                    sx={{ width: "600px" }}
                    name="minimumTargetAge"
                    type="text"
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
                    placeholder="e.g 0.5ml"
                    sx={{ width: "600px" }}
                    name="dosage"
                    type="text"
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
                    placeholder="e.g Intramuscular"
                    sx={{ width: "600px" }}
                    name="routeOfAdministration"
                    type="text"
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
                    placeholder="e.g Left Thigh"
                    sx={{ width: "600px" }}
                    name="siteOfAdministration"
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
                  disabled={vaccineMutation.isPending}
                >
                  {vaccineMutation.isPending ? (
                    <CircularProgress size="24px" sx={{ color: "white" }} />
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

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
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
              justifyContent: "space-between",
              "&:hover": {
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
                  fontSize: "24px",
                  lineHeight: "36px",
                  width: "200px",
                  color: "#1F8E1F",
                  marginBottom: "10px",
                }}
              >
                Add a New Vaccine
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "24px",
                  width: "250px",
                  color: "#1F8E1F",
                }}
              >
                Add a New Vaccine to be administered to all
              </Typography>
            </Grid>
            <Grid>
              <AddCircleRoundedIcon
                sx={{ color: "#1F8E1F", height: "70px", width: "70px" }}
              />
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
              Existing Vaccines
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
                sx={{ width: "400px" }}
              />
            </Box> */}
          </Grid>

          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              paddingY: "5%",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ color: "#000000", fontWeight: 400, fontSize: "16px" }}
            >
              Minimum Target Age
            </Typography>
            <Typography
              sx={{ color: "#000000", fontWeight: 400, fontSize: "16px" }}
            >
              Type of Vaccine
            </Typography>
            <Typography
              sx={{ color: "#000000", fontWeight: 400, fontSize: "16px" }}
            >
              Dosage
            </Typography>
            <Typography
              sx={{ color: "#000000", fontWeight: 400, fontSize: "16px" }}
            >
              Route of Administration
            </Typography>
          </Grid>

          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "1011px",
              overflowY: "auto",
            }}
          >
            {getVaccinesQuery.isPending && (
              <CircularProgress
                size="30px"
                sx={{ color: "green", margin: "auto" }}
              />
            )}
            {getVaccinesQuery.isError && (
              <Typography sx={{ margin: "auto", color: "#C91919" }}>
                Couldn&apos;t load vaccines. Try refreshing.
              </Typography>
            )}
            {getVaccinesQuery.isSuccess && vaccines.length === 0 && (
              <Typography sx={{ margin: "auto" }}>
                Vaccines appear here
              </Typography>
            )}
            {vaccines.map((vaccine) => (
              <Link
                key={vaccine._id}
                to={`/vaccines/${vaccine._id}`}
                style={{ textDecoration: "none" }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "23%",
                    alignItems: "center",
                    paddingY: "3%",
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
                  <VaccineCell>{vaccine.minimumTargetAge}</VaccineCell>
                  <VaccineCell>{vaccine.type}</VaccineCell>
                  <VaccineCell color="#000000" weight={300}>
                    {vaccine.dosage}
                  </VaccineCell>
                  <VaccineCell color="#1F8E1F" weight={300}>
                    {vaccine.routeOfAdministration}
                  </VaccineCell>
                </Grid>
              </Link>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Grid size={3}>
        <Grid
          size={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#D9ECD9",
            borderRadius: "20px",
            paddingY: "3%",
            paddingX: "7%",
            height: "270px",
            gap: 2,
            position: "fixed",
          }}
        >
          <Typography
            sx={{
              fontWeight: 300,
              fontSize: "20px",
              textAlign: "center",
              width: "200px",
              color: "#000000",
            }}
          >
            No. of Existing Vaccines
          </Typography>
          <Box>
            <VaccinesRoundedIcon
              sx={{
                width: "60px",
                color: "#1F8E1F",
                height: "60px",
                backgroundColor: "#FFFFFF80",
                padding: "16px",
                borderRadius: "200px",
              }}
            />
            <Typography
              sx={{
                color: "#1F8E1F",
                fontWeight: 900,
                fontSize: "36px",
                lineHeight: "54px",
                textAlign: "center",
              }}
            >
              {getVaccinesQuery.isPending ? (
                <CircularProgress size="24px" sx={{ color: "#1F8E1F" }} />
              ) : (
                total
              )}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
