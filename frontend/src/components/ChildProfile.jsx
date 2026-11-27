import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Typography, Box, TextField, InputLabel, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CircularProgress from "@mui/material/CircularProgress";

import avatar from "../assets/avatar.svg";
import haceyLogo from "../assets/hacey-svg.svg";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";

import ImmunizationPending from "./ImmunizationPending";
import ImmunizationCompleted from "./ImmunizationComplete";
import ModalWindow from "./Modal";
import AlertMessage from "./AlertMessage";
import useAlert from "../hooks/useAlert";
import formatDate from "../helper/format-date";
import {
  getChildById,
  getSchedulesByChild,
  getChildren,
  createChild,
} from "../query";
import { getErrorMessage, getValidationErrors } from "../helper/get-error-message";


function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ContactRow({ icon: Icon, text, href }) {
  const row = (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <Icon
        sx={{
          color: "#1F8E1F",
          backgroundColor: "#FFFFFF80",
          padding: "0.5rem",
          borderRadius: "56.25rem",
          height: "2.5rem",
          width: "2.5rem",
        }}
      />
      <Typography
        sx={{ fontWeight: 400, fontSize: "1rem", color: "#222222CC" }}
      >
        {text}
      </Typography>
    </Box>
  );
  return href ? (
    <a href={href} style={{ textDecoration: "none" }}>
      {row}
    </a>
  ) : (
    row
  );
}
ContactRow.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
};

export default function ChildProfile() {
  const { childId } = useParams();
  const alert = useAlert();
  const queryClient = useQueryClient();

  const [tabValue, setTabValue] = React.useState(0);
  const [openAddChild, setOpenAddChild] = React.useState(false);
  const [childFormError, setChildFormError] = React.useState({});

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const childQuery = useQuery({
    queryKey: ["children", childId],
    queryFn: () => getChildById(childId),
    enabled: !!childId,
  });

  const child = childQuery.data?.data;
  const parent = child?.parent;

  const schedulesQuery = useQuery({
    queryKey: ["schedules", childId],
    queryFn: () => getSchedulesByChild(childId),
    enabled: !!childId,
  });
  const schedules = schedulesQuery.data?.data ?? [];
  const completedSchedules = schedules.filter((s) => s.status === "completed");
  const pendingSchedules = schedules.filter((s) => s.status !== "completed");

  const siblingsQuery = useQuery({
    queryKey: ["children", "siblings", parent?._id],
    queryFn: () => getChildren({ parent: parent._id, limit: 50 }),
    enabled: !!parent?._id,
  });
  const siblings = (siblingsQuery.data?.data ?? []).filter(
    (c) => c._id !== childId,
  );

  const lastVisit = completedSchedules.reduce((latest, s) => {
    if (!s.dateOfImmunization) return latest;
    const date = new Date(s.dateOfImmunization);
    return !latest || date > latest ? date : latest;
  }, null);

  const nextAppointment = pendingSchedules.reduce((soonest, s) => {
    const date = new Date(s.earliestDate);
    if (date < new Date()) return soonest; 
    return !soonest || date < soonest ? date : soonest;
  }, null);

  const childMutation = useMutation({
    mutationFn: createChild,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["children", "siblings", parent?._id],
      });
      queryClient.invalidateQueries({ queryKey: ["children"] });
    },
  });

  const handleOpenAddChild = () => setOpenAddChild(true);
  const handleCloseAddChild = () => setOpenAddChild(false);

  const handleSubmitChild = (e) => {
    e.preventDefault();
    setChildFormError({ error: "", validationError: [] });
    const formData = new FormData(e.target);
    const childDetails = {
      firstName: formData.get("firstname").trim(),
      lastName: formData.get("lastname").trim(),
      gender: formData.get("sex").toUpperCase().trim(),
      dateOfBirth: formData.get("dob").toString().trim(),
      weightAtBirth: formData.get("weightAtBirth").toString().trim(),
      parentId: parent._id,
    };
    childMutation.mutate(childDetails, {
      onSuccess: (data) => {
        setOpenAddChild(false);
        alert.showSuccess(data.message);
      },
      onError: (error) => {
        if (getValidationErrors(error)) {
          setChildFormError((prev) => ({
            ...prev,
            validationError: getValidationErrors(error),
          }));
        }
        alert.showError(getErrorMessage(error));
        setChildFormError((prev) => ({
          ...prev,
          error: getErrorMessage(error),
        }));
      },
    });
  };

  // -- loading / not-found gates, kept up front and simple --
  if (childQuery.isPending) {
    return (
      <Grid sx={{ width: "90%", textAlign: "center", paddingTop: "10%" }}>
        <CircularProgress sx={{ color: "#1F8E1F" }} />
      </Grid>
    );
  }

  if (childQuery.isError || !child) {
    const notFound = childQuery.error?.response?.status === 404;
    return (
      <Grid sx={{ width: "90%", paddingTop: "5%" }}>
        <Typography
          sx={{ fontWeight: 600, fontSize: "1.25rem", marginBottom: "0.625rem" }}
        >
          {notFound
            ? "We couldn't find that child."
            : "Something went wrong loading this profile."}
        </Typography>
        <Link to="/children" style={{ color: "#1F8E1F" }}>
          Back to Children
        </Link>
      </Grid>
    );
  }

  const parentAge = parent?.dateOfBirth
    ? new Date().getUTCFullYear() -
      new Date(parent.dateOfBirth).getUTCFullYear()
    : null;

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
            Child’s Profile
          </Typography>
        </Grid>

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
            marginBottom: "1.875rem",
          }}
        >
          <Grid
            sx={{ display: "flex", flexDirection: "column", width: "31.25rem" }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 3,
                borderBottom: 1,
                borderColor: "#1F8E1F66",
                paddingBottom: "1.875rem",
              }}
            >
              <Avatar src={avatar} sx={{ height: "3.75rem", width: "3.75rem" }} />
              <Grid>
                <Typography
                  component="p"
                  sx={{
                    color: "#1F8E1F",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    lineHeight: "2.25rem",
                  }}
                >
                  {child.firstName} {child.lastName}
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    color: "#000000",
                    opacity: 0.4,
                    fontWeight: 400,
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
                    marginTop: "0.625rem",
                  }}
                >
                  {child.gender === "MALE" ? "Male" : "Female"} | DOB:{" "}
                  {formatDate(child.dateOfBirth)} |{" "}
                  {child.weightAtBirth
                    ? `${child.weightAtBirth} Kg`
                    : "Weight not recorded"}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              sx={{ display: "flex", flexDirection: "row", paddingTop: "1.875rem" }}
            >
              <Grid
                sx={{
                  width: "8.75rem",
                  borderRight: 1,
                  borderColor: "#1F8E1F66",
                }}
              >
                <Typography
                  component="p"
                  sx={{
                    color: "#000000",
                    opacity: 0.4,
                    fontWeight: 400,
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
                    marginTop: "0.625rem",
                  }}
                >
                  Last Visit
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    color: "#1F8E1F",
                    fontWeight: 600,
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
                    marginTop: "0.625rem",
                  }}
                >
                  {schedulesQuery.isPending
                    ? "…"
                    : lastVisit
                      ? formatDate(lastVisit)
                      : "No visits yet"}
                </Typography>
              </Grid>
              <Grid sx={{ width: "10rem", marginLeft: "2.5rem" }}>
                <Typography
                  component="p"
                  sx={{
                    color: "#000000",
                    opacity: 0.4,
                    fontWeight: 400,
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
                    marginTop: "0.625rem",
                  }}
                >
                  Next Appointment
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    color: "#1F8E1F",
                    fontWeight: 600,
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
                    marginTop: "0.625rem",
                  }}
                >
                  {schedulesQuery.isPending
                    ? "…"
                    : nextAppointment
                      ? formatDate(nextAppointment)
                      : "None scheduled"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
            <a
              href={parent?.email ? `mailto:${parent.email}` : undefined}
              style={{ textDecoration: "none" }}
            >
              <EmailRoundedIcon
                sx={{
                  color: "#1F8E1F",
                  backgroundColor: "#1F8E1F33",
                  padding: "0.5rem",
                  borderRadius: "56.25rem",
                  width: "2.25rem",
                  height: "2.25rem",
                }}
              />
            </a>
            <CalendarTodayIcon
              sx={{
                color: "#1F8E1F",
                backgroundColor: "#1F8E1F33",
                padding: "0.5rem",
                borderRadius: "56.25rem",
                width: "2.25rem",
                height: "2.25rem",
              }}
            />
          </Grid>
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
          <Typography
            sx={{
              color: "#000000",
              fontWeight: 600,
              fontSize: "1.5rem",
              lineHeight: "2.25rem",
            }}
          >
            Immunization History
          </Typography>
        </Grid>

        <Grid
          size={12}
          sx={{
            paddingY: "3%",
            paddingX: "4%",
            backgroundColor: "#FFFFFF",
            borderRadius: "1.25rem",
            margin: "auto",
            marginBottom: "1.875rem",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                sx={{ width: "100%" }}
                scrollButtons={false}
                variant="fullWidth"
                TabIndicatorProps={{ style: { backgroundColor: "#1F8E1F66" } }}
              >
                <Tab
                  label="Completed"
                  {...a11yProps(0)}
                  sx={{
                    color: tabValue === 0 ? "#1F8E1F" : "#000000",
                    fontWeight: tabValue === 0 ? 400 : 300,
                    width: "50%",
                    backgroundColor: tabValue === 0 ? "#1F8E1F0A" : "#FFFFFF",
                    textTransform: "none",
                    opacity: 0.7,
                    fontSize: "1rem",
                    lineHeight: "1.6875rem",
                  }}
                  disableRipple
                />
                <Tab
                  label="Pending"
                  {...a11yProps(1)}
                  sx={{
                    color: tabValue === 1 ? "#1F8E1F" : "#000000",
                    fontWeight: tabValue === 1 ? 400 : 300,
                    backgroundColor: tabValue === 1 ? "#1F8E1F0A" : "#FFFFFF",
                    width: "50%",
                    textTransform: "none",
                    opacity: 0.7,
                    fontSize: "1rem",
                    lineHeight: "1.6875rem",
                  }}
                  disableRipple
                />
              </Tabs>
            </Box>

            {schedulesQuery.isPending && (
              <Box sx={{ textAlign: "center", paddingY: "5%" }}>
                <CircularProgress size="1.5rem" sx={{ color: "#1F8E1F" }} />
              </Box>
            )}
            {schedulesQuery.isError && (
              <Typography
                sx={{ color: "#C91919", textAlign: "center", paddingY: "5%" }}
              >
                Couldn&apos;t load immunization records. Try refreshing.
              </Typography>
            )}
            {schedulesQuery.isSuccess && (
              <>
                <CustomTabPanel value={tabValue} index={0}>
                  <ImmunizationCompleted schedules={completedSchedules} />
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={1}>
                  <ImmunizationPending schedules={pendingSchedules} />
                </CustomTabPanel>
              </>
            )}
          </Box>
        </Grid>
      </Grid>

      <Grid sx={{ position: "fixed", right: "2%" }} size={4}>
        <Grid
          size={12}
          sx={{
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
            <Avatar
              src={avatar}
              sx={{ height: "3.125rem", width: "3.125rem", margin: "auto" }}
            />
            <Typography
              sx={{
                color: "#1F8E1F",
                fontWeight: 600,
                fontSize: "1rem",
                lineHeight: "1.5rem",
              }}
            >
              {parent?.firstName} {parent?.lastName}
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
              {parent?.title}
              {parentAge ? ` | ${parentAge} years` : ""}
            </Typography>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              marginTop: "3%",
            }}
          >
            <ContactRow
              icon={BusinessIcon}
              text={`Hospital Number: ${parent?.hospitalNumber || "Not provided"}`}
            />
            <ContactRow
              icon={MonitorHeartRoundedIcon}
              text={`NHIS: ${parent?.nhis || "Not provided"}`}
            />
            <ContactRow
              icon={EmailIcon}
              text={parent?.email || "Not provided"}
              href={parent?.email ? `mailto:${parent.email}` : undefined}
            />
            <ContactRow
              icon={LocalPhoneRoundedIcon}
              text={parent?.phoneNumber || "Not provided"}
              href={
                parent?.phoneNumber ? `tel:${parent.phoneNumber}` : undefined
              }
            />
          </Grid>
        </Grid>

        <Grid
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "1.25rem",
            paddingY: "7%",
            paddingX: "7%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            maxHeight: "16.875rem",
          }}
          size={12}
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
            {siblingsQuery.isPending && (
              <CircularProgress size="1.25rem" sx={{ color: "#1F8E1F" }} />
            )}
            {siblingsQuery.isSuccess && siblings.length === 0 && (
              <Typography sx={{ color: "#00000099", fontSize: "0.875rem" }}>
                No siblings yet
              </Typography>
            )}
            {siblings.map((sibling) => (
              <Link
                key={sibling._id}
                to={`/children/${sibling._id}`}
                style={{
                  color: "#000000",
                  fontWeight: 400,
                  fontSize: "1rem",
                  textDecoration: "none",
                }}
              >
                {sibling.firstName} {sibling.lastName}
              </Link>
            ))}
          </Grid>
          <AddCircleRoundedIcon
            onClick={handleOpenAddChild}
            sx={{
              width: "2.1875rem",
              height: "2.1875rem",
              color: "#1F8E1F",
              marginRight: "3%",
              cursor: "pointer",
              "&:hover": { transform: "scale(1.1)" },
            }}
          />
        </Grid>
      </Grid>

      <ModalWindow onClose={handleCloseAddChild} open={openAddChild}>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Button
            onClick={handleCloseAddChild}
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
            Onboard a Sibling
          </Typography>
          <Grid sx={{ width: "100%" }}>
            <form onSubmit={handleSubmitChild}>
              {childMutation.isError && childFormError.validationError && (
                <Box sx={{ marginBottom: "0.3125rem" }}>
                  <ul>
                    {childFormError.validationError.map((valErr) => (
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
                <TextField sx={{ width: "37.5rem" }} name="dob" type="date" />
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
                    component="span"
                    sx={{ color: "#222222", fontWeight: 300, fontSize: "0.75rem" }}
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
                disabled={childMutation.isPending}
              >
                {childMutation.isPending ? (
                  <CircularProgress size="1.25rem" sx={{ color: "#FFFFFF" }} />
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
    </Grid>
  );
}
