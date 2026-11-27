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
import { getErrorMessage, getValidationErrors } from "../helper/get-error-message";

function VaccineCell({ children, color = "#000000", weight = 500 }) {
  return (
    <Typography
      sx={{
        color,
        fontWeight: weight,
        maxWidth: "11.875rem",
        fontSize: "1rem",
        lineHeight: "1.5rem",
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
        if (getValidationErrors(error)) {
          setVaccineError((prev) => ({
            ...prev,
            validationError: getValidationErrors(error),
          }));
        }
        alert.showError(getErrorMessage(error));
        setVaccineError((prev) => ({
          ...prev,
          error: getErrorMessage(error),
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
                gap: "0.3125rem",
                marginBottom: "1.25rem",
              }}
              disableRipple
            >
              <ArrowBackSharpIcon sx={{ color: "#1F8E1F" }} />
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
                      {vaccineError.validationError.map((valErr) => (
                        <li
                          style={{ color: "red", fontSize: "0.9375rem" }}
                          key={valErr.msg}
                        >
                          {valErr.msg}
                        </li>
                      ))}
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
                    placeholder="e.g BCG"
                    sx={{ width: "37.5rem", textTransform: "capitalize" }}
                    name="type"
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
                    placeholder="e.g At Birth"
                    sx={{ width: "37.5rem" }}
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
                    placeholder="e.g 0.5ml"
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
                    placeholder="e.g Intramuscular"
                    sx={{ width: "37.5rem" }}
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
                    placeholder="e.g Left Thigh"
                    sx={{ width: "37.5rem" }}
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
                    <CircularProgress size="1.5rem" sx={{ color: "white" }} />
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
                  fontSize: "1.5rem",
                  lineHeight: "2.25rem",
                  width: "12.5rem",
                  color: "#1F8E1F",
                  marginBottom: "0.625rem",
                }}
              >
                Add a New Vaccine
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "1rem",
                  lineHeight: "1.5rem",
                  width: "15.625rem",
                  color: "#1F8E1F",
                }}
              >
                Add a New Vaccine to be administered to all
              </Typography>
            </Grid>
            <Grid>
              <AddCircleRoundedIcon
                sx={{ color: "#1F8E1F", height: "4.375rem", width: "4.375rem" }}
              />
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
                sx={{ width: "25rem" }}
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
              sx={{ color: "#000000", fontWeight: 400, fontSize: "1rem" }}
            >
              Minimum Target Age
            </Typography>
            <Typography
              sx={{ color: "#000000", fontWeight: 400, fontSize: "1rem" }}
            >
              Type of Vaccine
            </Typography>
            <Typography
              sx={{ color: "#000000", fontWeight: 400, fontSize: "1rem" }}
            >
              Dosage
            </Typography>
            <Typography
              sx={{ color: "#000000", fontWeight: 400, fontSize: "1rem" }}
            >
              Route of Administration
            </Typography>
          </Grid>

          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "63.1875rem",
              overflowY: "auto",
            }}
          >
            {getVaccinesQuery.isPending && (
              <CircularProgress
                size="1.875rem"
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
                      borderRadius: "0.9375rem",
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
            borderRadius: "1.25rem",
            paddingY: "3%",
            paddingX: "7%",
            height: "16.875rem",
            gap: 2,
            position: "fixed",
          }}
        >
          <Typography
            sx={{
              fontWeight: 300,
              fontSize: "1.25rem",
              textAlign: "center",
              width: "12.5rem",
              color: "#000000",
            }}
          >
            No. of Existing Vaccines
          </Typography>
          <Box>
            <VaccinesRoundedIcon
              sx={{
                width: "3.75rem",
                color: "#1F8E1F",
                height: "3.75rem",
                backgroundColor: "#FFFFFF80",
                padding: "1rem",
                borderRadius: "12.5rem",
              }}
            />
            <Typography
              sx={{
                color: "#1F8E1F",
                fontWeight: 900,
                fontSize: "2.25rem",
                lineHeight: "3.375rem",
                textAlign: "center",
              }}
            >
              {getVaccinesQuery.isPending ? (
                <CircularProgress size="1.5rem" sx={{ color: "#1F8E1F" }} />
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
