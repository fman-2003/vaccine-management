/* eslint-disable react/prop-types */
import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Typography, Box, TextField, InputLabel, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import VaccinesRoundedIcon from "@mui/icons-material/VaccinesRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";

import haceyLogo from "../assets/hacey-svg.svg";
import ModalWindow from "./Modal";
import AlertMessage from "./AlertMessage";
import useAlert from "../hooks/useAlert";
import { getVaccineById, updateVaccine, deleteVaccine } from "../query";
import { getErrorMessage, getValidationErrors } from "../helper/get-error-message";

function DetailRow({ label, value }) {
  return (
    <Box sx={{ marginBottom: "1.25rem" }}>
      <Typography
        sx={{
          color: "#000000",
          opacity: 0.4,
          fontWeight: 400,
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          color: "#000000",
          fontWeight: 600,
          fontSize: "1.125rem",
          lineHeight: "1.6875rem",
        }}
      >
        {value || "—"}
      </Typography>
    </Box>
  );
}

export default function VaccineProfile() {
  const { vaccineId } = useParams();
  const navigate = useNavigate();
  const alert = useAlert();
  const queryClient = useQueryClient();

  const [openEdit, setOpenEdit] = React.useState(false);
  const [editError, setEditError] = React.useState({});

  const vaccineQuery = useQuery({
    queryKey: ["vaccines", vaccineId],
    queryFn: () => getVaccineById(vaccineId),
    enabled: !!vaccineId,
  });
  const vaccine = vaccineQuery.data?.data;

  const updateMutation = useMutation({
    mutationFn: (data) => updateVaccine(vaccineId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaccines", vaccineId] });
      queryClient.invalidateQueries({ queryKey: ["vaccines"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteVaccine(vaccineId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaccines"] });
      navigate("/vaccines");
    },
  });

  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    setEditError({ error: "", validationError: [] });
    const formData = new FormData(e.target);
    const updates = {
      type: formData.get("type").trim(),
      minimumTargetAge: formData.get("minimumTargetAge").trim(),
      dosage: formData.get("dosage").trim(),
      routeOfAdministration: formData.get("routeOfAdministration").trim(),
      siteOfAdministration: formData.get("siteOfAdministration").trim(),
    };
    updateMutation.mutate(updates, {
      onSuccess: (data) => {
        setOpenEdit(false);
        alert.showSuccess(data.message);
      },
      onError: (error) => {
        if (getValidationErrors(error)) {
          setEditError((prev) => ({
            ...prev,
            validationError: getValidationErrors(error),
          }));
        }
        alert.showError(getErrorMessage(error));
        setEditError((prev) => ({
          ...prev,
          error: getErrorMessage(error),
        }));
      },
    });
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete "${vaccine?.type}"? This can't be undone, and will fail if any schedules still reference it.`,
    );
    if (!confirmed) return;

    deleteMutation.mutate(undefined, {
      onSuccess: (data) => alert.showSuccess(data.message),
      onError: (error) => alert.showError(getErrorMessage(error)),
    });
  };

  if (vaccineQuery.isPending) {
    return (
      <Grid sx={{ width: "90%", textAlign: "center", paddingTop: "10%" }}>
        <CircularProgress sx={{ color: "#1F8E1F" }} />
      </Grid>
    );
  }

  if (vaccineQuery.isError || !vaccine) {
    const notFound = vaccineQuery.error?.response?.status === 404;
    return (
      <Grid sx={{ width: "90%", paddingTop: "5%" }}>
        <Typography
          sx={{ fontWeight: 600, fontSize: "1.25rem", marginBottom: "0.625rem" }}
        >
          {notFound
            ? "We couldn't find that vaccine."
            : "Something went wrong loading this vaccine."}
        </Typography>
        <Link to="/vaccines" style={{ color: "#1F8E1F" }}>
          Back to Vaccines
        </Link>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3} sx={{ width: "90%", minHeight: "100vh" }}>
      <AlertMessage {...alert.props} />

      <Grid size={8}>
        <Grid
          size={12}
          sx={{
            paddingY: "3%",
            paddingX: "4%",
            backgroundColor: "#FFFFFF",
            borderRadius: "1.25rem",
            marginBottom: "1.875rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <VaccinesRoundedIcon
              sx={{
                color: "#1F8E1F",
                backgroundColor: "#1F8E1F1A",
                padding: "0.625rem",
                borderRadius: "56.25rem",
                width: "2.75rem",
                height: "2.75rem",
              }}
            />
            <Typography
              sx={{
                color: "#000000",
                fontWeight: 600,
                fontSize: "1.5rem",
                lineHeight: "2.25rem",
              }}
            >
              {vaccine.type}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <EditRoundedIcon
              onClick={handleOpenEdit}
              sx={{
                color: "#1F8E1F",
                width: "1.75rem",
                height: "1.75rem",
                cursor: "pointer",
                "&:hover": { transform: "scale(1.15)" },
              }}
            />
            <DeleteRoundedIcon
              onClick={handleDelete}
              sx={{
                color: "#C91919",
                width: "1.75rem",
                height: "1.75rem",
                cursor: "pointer",
                "&:hover": { transform: "scale(1.15)" },
              }}
            />
          </Box>
        </Grid>

        <Grid
          size={12}
          sx={{
            paddingY: "3%",
            paddingX: "4%",
            backgroundColor: "#FFFFFF",
            borderRadius: "1.25rem",
            marginBottom: "1.875rem",
          }}
        >
          <DetailRow label="Type of Vaccine" value={vaccine.type} />
          <DetailRow
            label="Minimum Target Age"
            value={vaccine.minimumTargetAge}
          />
          <DetailRow label="Dosage" value={vaccine.dosage} />
          <DetailRow
            label="Route of Administration"
            value={vaccine.routeOfAdministration}
          />
          <DetailRow
            label="Site of Administration"
            value={vaccine.siteOfAdministration}
          />
        </Grid>
      </Grid>

      <ModalWindow onClose={handleCloseEdit} open={openEdit}>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Button
            onClick={handleCloseEdit}
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
            Edit Vaccine
          </Typography>
          <Grid sx={{ width: "100%" }}>
            <form onSubmit={handleSubmitEdit}>
              {updateMutation.isError && editError.validationError && (
                <Box sx={{ marginBottom: "0.3125rem" }}>
                  <ul>
                    {editError.validationError.map((valErr) => (
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
                  sx={{ width: "37.5rem" }}
                  name="type"
                  type="text"
                  defaultValue={vaccine.type}
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
                  sx={{ width: "37.5rem" }}
                  name="minimumTargetAge"
                  type="text"
                  defaultValue={vaccine.minimumTargetAge}
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
                  sx={{ width: "37.5rem" }}
                  name="dosage"
                  type="text"
                  defaultValue={vaccine.dosage}
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
                  sx={{ width: "37.5rem" }}
                  name="routeOfAdministration"
                  type="text"
                  defaultValue={vaccine.routeOfAdministration}
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
                  sx={{ width: "37.5rem" }}
                  name="siteOfAdministration"
                  type="text"
                  defaultValue={vaccine.siteOfAdministration}
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
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? (
                  <CircularProgress size="1.5rem" sx={{ color: "white" }} />
                ) : (
                  "Save Changes"
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
    </Grid>
  );
}
