import React from "react";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputLabel,
  Autocomplete,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
  IconButton,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";

import splash from "../assets/splash.svg";
import haceyLogo from "../assets/hacey-svg.svg";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import CallMissedSharpIcon from "@mui/icons-material/CallMissedSharp";
import VaccinesRoundedIcon from "@mui/icons-material/VaccinesRounded";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";

import ModalWindow from "./Modal";
import ScheduleDaily from "./ScheduleDaily";
import Pagination from "./Pagination";
import AlertMessage from "./AlertMessage";
import useAlert from "../hooks/useAlert";
import formatDate from "../helper/format-date";
import {
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getDailySummary,
  getChildren,
  getVaccines,
} from "../query";
import { getErrorMessage, getValidationErrors } from "../helper/get-error-message";

const TABS_PER_PAGE = 15;

function getDateKey(dateValue) {
  if (!dateValue) return null;
  return new Date(dateValue).toISOString().slice(0, 10);
}

export default function Schedules() {
  const alert = useAlert();
  const queryClient = useQueryClient();

  const [openCreateSchedule, setOpenCreateSchedule] = React.useState(false);
  const [scheduleError, setScheduleError] = React.useState({});
  const [selectedChild, setSelectedChild] = React.useState(null);
  const [selectedVaccine, setSelectedVaccine] = React.useState(null);
  const [openEditSchedule, setOpenEditSchedule] = React.useState(false);
  const [editingSchedule, setEditingSchedule] = React.useState(null);
  const [editError, setEditError] = React.useState({});
  const [editChild, setEditChild] = React.useState(null);
  const [editVaccine, setEditVaccine] = React.useState(null);
  const [editStatus, setEditStatus] = React.useState("pending");
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [dateSearch, setDateSearch] = React.useState("");
  const [page, setPage] = React.useState(1);

  const getSchedulesQuery = useQuery({
    queryKey: ["schedules", "all"],
    queryFn: () => getSchedules({ limit: 2000 }),
  });

  const dailySummaryQuery = useQuery({
    queryKey: ["dailySchedules"],
    queryFn: getDailySummary,
  });

  const childrenOptionsQuery = useQuery({
    queryKey: ["children", "scheduleFormOptions"],
    queryFn: () => getChildren({ limit: 1000 }),
  });

  const vaccinesOptionsQuery = useQuery({
    queryKey: ["vaccines", "scheduleFormOptions"],
    queryFn: () => getVaccines({ limit: 1000 }),
  });

  const childOptions = childrenOptionsQuery.data?.data ?? [];
  const vaccineOptions = vaccinesOptionsQuery.data?.data ?? [];

  const createMutation = useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.invalidateQueries({ queryKey: ["dailySchedules"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateSchedule(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.invalidateQueries({ queryKey: ["dailySchedules"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteSchedule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.invalidateQueries({ queryKey: ["dailySchedules"] });
    },
  });

  const handleOpenCreateSchedule = () => setOpenCreateSchedule(true);
  const handleCloseCreateSchedule = () => {
    setOpenCreateSchedule(false);
    setSelectedChild(null);
    setSelectedVaccine(null);
    setScheduleError({});
  };

  const handleSubmitSchedule = (e) => {
    e.preventDefault();
    setScheduleError({ error: "", validationError: [] });

    if (!selectedChild || !selectedVaccine) {
      alert.showError("Please select both a child and a vaccine.");
      return;
    }

    const formData = new FormData(e.target);
    const dateOfImmunization = formData.get("dateOfImmunization");
    const comment = formData.get("comment").trim();

    const payload = {
      child: selectedChild._id,
      vaccine: selectedVaccine._id,
      // earliestDate mirrors dateOfImmunization at creation
      earliestDate: dateOfImmunization,
      dateOfImmunization,
      comment,
    };

    createMutation.mutate(payload, {
      onSuccess: (data) => {
        handleCloseCreateSchedule();
        alert.showSuccess(data.message);
      },
      onError: (error) => {
        if (getValidationErrors(error)) {
          setScheduleError((prev) => ({
            ...prev,
            validationError: getValidationErrors(error),
          }));
        }
        alert.showError(getErrorMessage(error));
      },
    });
  };

  const handleOpenEditSchedule = (schedule) => {
    setEditingSchedule(schedule);
    setEditChild(schedule.child ?? null);
    setEditVaccine(schedule.vaccine ?? null);
    setEditStatus(schedule.status ?? "pending");
    setEditError({});
    setOpenEditSchedule(true);
  };
  const handleCloseEditSchedule = () => {
    setOpenEditSchedule(false);
    setEditingSchedule(null);
  };

  const handleSubmitEditSchedule = (e) => {
    e.preventDefault();
    setEditError({ error: "", validationError: [] });

    if (!editChild || !editVaccine) {
      alert.showError("Please select both a child and a vaccine.");
      return;
    }

    const formData = new FormData(e.target);
    const comment = formData.get("comment").trim();

    const payload = {
      child: editChild._id,
      vaccine: editVaccine._id,
      status: editStatus,
      comment,
    };

    updateMutation.mutate(
      { id: editingSchedule._id, data: payload },
      {
        onSuccess: (data) => {
          handleCloseEditSchedule();
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
        },
      },
    );
  };

  const handleDeleteSchedule = (schedule) => {
    const confirmed = window.confirm(
      `Delete this schedule entry for ${schedule.child?.firstName ?? "this child"}? This can't be undone.`,
    );
    if (!confirmed) return;

    deleteMutation.mutate(schedule._id, {
      onSuccess: (data) => alert.showSuccess(data.message),
      onError: (error) => alert.showError(getErrorMessage(error)),
    });
  };

  const allSchedules = React.useMemo(
    () => getSchedulesQuery.data?.data ?? [],
    [getSchedulesQuery.data?.data],
  );

  const searchedSchedules = React.useMemo(() => {
    if (!searchTerm.trim()) return allSchedules;
    const term = searchTerm.trim().toLowerCase();
    return allSchedules.filter((s) => {
      const childName =
        `${s.child?.firstName ?? ""} ${s.child?.lastName ?? ""}`.toLowerCase();
      const vaccineType = (s.vaccine?.type ?? "").toLowerCase();
      return childName.includes(term) || vaccineType.includes(term);
    });
  }, [allSchedules, searchTerm]);

  const groups = React.useMemo(() => {
    const map = new Map();
    searchedSchedules.forEach((s) => {
      const key = getDateKey(s.dateOfImmunization || s.earliestDate);
      if (!key) return;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(s);
    });
    return map;
  }, [searchedSchedules]);

  let sortedKeys = Array.from(groups.keys()).sort();
  if (dateSearch) {
    sortedKeys = sortedKeys.filter((key) => key === dateSearch);
  }

  const totalPages = Math.max(1, Math.ceil(sortedKeys.length / TABS_PER_PAGE));
  const currentKeys = sortedKeys.slice(
    (page - 1) * TABS_PER_PAGE,
    page * TABS_PER_PAGE,
  );

  React.useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  React.useEffect(() => {
    setPage(1);
  }, [searchTerm, dateSearch]);

  const hasActiveFilters = Boolean(searchTerm || dateSearch);

  return (
    <Grid container spacing={3} sx={{ width: "95%", minHeight: "100vh" }}>
      {<AlertMessage {...alert.props} />}
      <ModalWindow
        onClose={handleCloseCreateSchedule}
        open={openCreateSchedule}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Button
            onClick={handleCloseCreateSchedule}
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
              marginBottom: "0.3125rem",
            }}
          >
            New Schedule Entry
          </Typography>
          <Grid sx={{ width: "100%" }}>
            <form onSubmit={handleSubmitSchedule}>
              {createMutation.isError && scheduleError.validationError && (
                <Box sx={{ marginBottom: "0.3125rem" }}>
                  <ul>
                    {scheduleError.validationError.map((valErr) => (
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
                  Child
                </InputLabel>
                <Autocomplete
                  options={childOptions}
                  loading={childrenOptionsQuery.isPending}
                  getOptionLabel={(option) =>
                    `${option.firstName} ${option.lastName}`
                  }
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  value={selectedChild}
                  onChange={(event, newValue) => setSelectedChild(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Start typing a child's name"
                      sx={{ width: "37.5rem" }}
                    />
                  )}
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
                  Vaccine
                </InputLabel>
                <Autocomplete
                  options={vaccineOptions}
                  loading={vaccinesOptionsQuery.isPending}
                  getOptionLabel={(option) => option.type ?? ""}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  value={selectedVaccine}
                  onChange={(event, newValue) => setSelectedVaccine(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Start typing a vaccine type"
                      sx={{ width: "37.5rem" }}
                    />
                  )}
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
                  Date of Immunization
                </InputLabel>
                <TextField
                  sx={{ width: "37.5rem" }}
                  name="dateOfImmunization"
                  type="date"
                  required
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
                  Comment{" "}
                  <Typography
                    component="span"
                    sx={{ color: "#222222", fontWeight: 300, fontSize: "0.75rem" }}
                  >
                    (optional)
                  </Typography>
                </InputLabel>
                <TextField
                  sx={{ width: "37.5rem" }}
                  name="comment"
                  type="text"
                  multiline
                  rows={3}
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
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? (
                  <CircularProgress size="1.5rem" sx={{ color: "white" }} />
                ) : (
                  "Create Schedule Entry"
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
      <ModalWindow onClose={handleCloseEditSchedule} open={openEditSchedule}>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Button
            onClick={handleCloseEditSchedule}
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
              marginBottom: "0.3125rem",
            }}
          >
            Edit Schedule Entry
          </Typography>

          {editingSchedule && (
            <Box
              sx={{
                width: "100%",
                backgroundColor: "#EEEEEE",
                borderRadius: "0.5rem",
                padding: "0.75rem 1rem",
                marginBottom: "0.9375rem",
              }}
            >
              <Typography sx={{ fontSize: "0.75rem", color: "#00000099" }}>
                Date of Immunization (fixed at creation)
              </Typography>
              <Typography
                sx={{ fontSize: "0.875rem", fontWeight: 500, color: "#222222" }}
              >
                {formatDate(
                  editingSchedule.dateOfImmunization ||
                    editingSchedule.earliestDate,
                )}
              </Typography>
            </Box>
          )}

          <Grid sx={{ width: "100%" }}>
            <form onSubmit={handleSubmitEditSchedule}>
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
                  Child
                </InputLabel>
                <Autocomplete
                  options={childOptions}
                  loading={childrenOptionsQuery.isPending}
                  getOptionLabel={(option) =>
                    `${option.firstName} ${option.lastName}`
                  }
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  value={editChild}
                  onChange={(event, newValue) => setEditChild(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} sx={{ width: "37.5rem" }} />
                  )}
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
                  Vaccine
                </InputLabel>
                <Autocomplete
                  options={vaccineOptions}
                  loading={vaccinesOptionsQuery.isPending}
                  getOptionLabel={(option) => option.type ?? ""}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  value={editVaccine}
                  onChange={(event, newValue) => setEditVaccine(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} sx={{ width: "37.5rem" }} />
                  )}
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
                  Status
                </InputLabel>
                <FormControl sx={{ width: "37.5rem" }}>
                  <Select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="missed">Missed</MenuItem>
                  </Select>
                </FormControl>
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
                  Comment
                </InputLabel>
                <TextField
                  sx={{ width: "37.5rem" }}
                  name="comment"
                  type="text"
                  multiline
                  rows={3}
                  defaultValue={editingSchedule?.comment ?? ""}
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
      <Grid
        size={12}
        sx={{
          paddingY: "3%",
          paddingX: "4%",
          backgroundColor: "#FFFFFF",
          borderRadius: "1.25rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Grid sx={{ display: "flex", flexDirection: "column", width: "37.5rem" }}>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              borderBottom: 1,
              borderColor: "#1F8E1F66",
              paddingBottom: "1.875rem",
            }}
          >
            <Typography
              component="p"
              sx={{
                color: "#1F8E1F",
                fontWeight: 700,
                fontSize: "1.5rem",
                lineHeight: "2.25rem",
              }}
            >
              Schedules Today
            </Typography>
            <Typography
              component="p"
              sx={{
                color: "#000000",
                opacity: 0.7,
                fontWeight: 400,
                fontSize: "1rem",
                lineHeight: "1.5rem",
                marginTop: "0.625rem",
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
            sx={{ display: "flex", flexDirection: "row", paddingTop: "1.875rem" }}
          >
            <Grid
              sx={{ width: "20.3125rem", borderRight: 1, borderColor: "#1F8E1F66" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  alignItems: "center",
                  paddingBottom: "0.625rem",
                }}
              >
                <EventAvailableRoundedIcon
                  sx={{ color: "#1F8E1F", width: "1.5rem", height: "1.5rem" }}
                />
                <Typography
                  sx={{
                    color: "#000000",
                    fontWeight: 300,
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
                  }}
                >
                  {dailySummaryQuery.isPending
                    ? "Loading…"
                    : `${dailySummaryQuery.data.totalScheduledToday} scheduled children today`}
                </Typography>
              </Box>

              <Box
                sx={{
                  maxHeight: "9.375rem",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {dailySummaryQuery.isSuccess &&
                  Object.entries(dailySummaryQuery.data.breakdownByVaccineType)
                    .length === 0 && (
                    <Typography sx={{ color: "#00000066", fontSize: "0.875rem" }}>
                      No vaccine types scheduled today
                    </Typography>
                  )}
                {dailySummaryQuery.isSuccess &&
                  Object.entries(
                    dailySummaryQuery.data.breakdownByVaccineType,
                  ).map(([type, count]) => (
                    <Box
                      key={type}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <VaccinesRoundedIcon
                        sx={{ color: "#1F8E1F", width: "1.25rem", height: "1.25rem" }}
                      />
                      <Typography
                        sx={{
                          color: "#000000",
                          fontWeight: 300,
                          fontSize: "1rem",
                          lineHeight: "1.5rem",
                        }}
                      >
                        {count} {type} scheduled
                      </Typography>
                    </Box>
                  ))}
              </Box>
            </Grid>

            <Box
              sx={{
                marginLeft: "1.875rem",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <CallMissedSharpIcon
                sx={{ color: "#C91919", width: "1.5625rem", height: "1.5625rem" }}
              />
              <Typography
                sx={{
                  color: "#C91919",
                  fontWeight: 300,
                  fontSize: "1rem",
                  lineHeight: "1.5rem",
                  width: "15.625rem",
                }}
              >
                {dailySummaryQuery.isPending
                  ? "Loading…"
                  : `${dailySummaryQuery.data.missedCount} missed immunization`}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        style={{ width: "100%", }}
      >
        <Grid
          onClick={handleOpenCreateSchedule}
          size={12}
          sx={{
            borderRadius: "1.25rem",
            zIndex: 5,
            marginBottom: "1.875rem",
            minHeight: "25rem",
          }}
        >
          <Grid
            sx={{
              minHeight: "25rem",
              backgroundImage: `url(${splash})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "1.25rem",
              paddingX: "6%",
              paddingY: "12%",
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
                    width: "13.75rem",
                    margin: "auto",
                    textAlign: "center",
                  }}
                >
                  Create New Schedule Entry
                </Typography>
                <Typography
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: 400,
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
                    zIndex: 10,
                    width: "16.25rem",
                    textAlign: "center",
                    margin: "auto",
                  }}
                >
                  Schedule a child for an upcoming or recorded vaccination
                </Typography>
              </Grid>
              <Grid sx={{ zIndex: 17 }}>
                <AddCircleRoundedIcon
                  sx={{
                    color: "#FFFFFF",
                    width: "5rem",
                    height: "5rem",
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
          paddingY: "3%",
          paddingX: "3%",
          backgroundColor: "#FFFFFF",
          borderRadius: "1.25rem",
          marginBottom: "1.875rem",
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
            fontSize: "1.5rem",
            lineHeight: "2.25rem",
          }}
        >
          Daily Immunization Schedules
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          {hasActiveFilters && (
            <Button
              onClick={() => {
                setSearchTerm("");
                setDateSearch("");
                setSearchOpen(false);
              }}
              variant="text"
              size="small"
              sx={{ textTransform: "none", color: "#1F8E1F", fontSize: "0.875rem" }}
            >
              Clear filters
            </Button>
          )}

          <TextField
            type="date"
            size="small"
            value={dateSearch}
            onChange={(e) => setDateSearch(e.target.value)}
            sx={{ width: "11.25rem" }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EventAvailableRoundedIcon
                      sx={{ color: "#1F8E1F", fontSize: "1.25rem" }}
                    />
                  </InputAdornment>
                ),
              },
            }}
          />

          {searchOpen && (
            <TextField
              autoFocus
              size="small"
              placeholder="Search child or vaccine"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: "13.75rem" }}
              slotProps={{
                input: {
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setSearchTerm("")}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}

          <IconButton onClick={() => setSearchOpen((v) => !v)} size="small">
            <SearchSharpIcon sx={{ color: "#292D32" }} />
          </IconButton>
        </Box>
      </Grid>

      <Grid sx={{ width: "100%" }}>
        {getSchedulesQuery.isPending && (
          <CircularProgress
            sx={{ color: "green", margin: "auto", display: "block" }}
          />
        )}

        {getSchedulesQuery.isError && (
          <Typography sx={{ textAlign: "center", color: "#C91919" }}>
            Couldn&apos;t load schedules. Try refreshing.
          </Typography>
        )}

        {getSchedulesQuery.isSuccess && allSchedules.length === 0 && (
          <Typography
            sx={{ textAlign: "center", color: "#00000099", paddingY: "5%" }}
          >
            No schedules yet. Create one to get started.
          </Typography>
        )}

        {getSchedulesQuery.isSuccess &&
          allSchedules.length > 0 &&
          sortedKeys.length === 0 && (
            <Typography
              sx={{ textAlign: "center", color: "#00000099", paddingY: "5%" }}
            >
              {dateSearch
                ? `No schedule found for ${formatDate(dateSearch)}.`
                : "No schedules match your search."}
            </Typography>
          )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxHeight: "75vh",
            overflowY: "auto",
          }}
        >
          {currentKeys.map((dateKey) => (
            <ScheduleDaily
              key={dateKey}
              dateLabel={formatDate(dateKey)}
              schedules={groups.get(dateKey)}
              onEdit={handleOpenEditSchedule}
              onDelete={handleDeleteSchedule}
            />
          ))}
        </Box>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </Grid>
    </Grid>
  );
}
