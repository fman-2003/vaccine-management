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
          padding: "8px",
          borderRadius: "900px",
          height: "40px",
          width: "40px",
        }}
      />
      <Typography
        sx={{ fontWeight: 400, fontSize: "16px", color: "#222222CC" }}
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
        if (error.message.includes("422")) {
          setChildFormError((prev) => ({
            ...prev,
            validationError: error.response.data.errors,
          }));
        }
        alert.showError(error.response.data.message);
        setChildFormError((prev) => ({
          ...prev,
          error: error.response.data.message,
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
          sx={{ fontWeight: 600, fontSize: "20px", marginBottom: "10px" }}
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
            borderRadius: "20px",
            marginBottom: "30px",
          }}
        >
          <Typography
            sx={{
              color: "#000000",
              fontWeight: 600,
              fontSize: "24px",
              lineHeight: "36px",
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
            borderRadius: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          <Grid
            sx={{ display: "flex", flexDirection: "column", width: "500px" }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 3,
                borderBottom: 1,
                borderColor: "#1F8E1F66",
                paddingBottom: "30px",
              }}
            >
              <Avatar src={avatar} sx={{ height: "60px", width: "60px" }} />
              <Grid>
                <Typography
                  component="p"
                  sx={{
                    color: "#1F8E1F",
                    fontWeight: 700,
                    fontSize: "24px",
                    lineHeight: "36px",
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
                    fontSize: "16px",
                    lineHeight: "24px",
                    marginTop: "10px",
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
              sx={{ display: "flex", flexDirection: "row", paddingTop: "30px" }}
            >
              <Grid
                sx={{
                  width: "140px",
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
                    fontSize: "16px",
                    lineHeight: "24px",
                    marginTop: "10px",
                  }}
                >
                  Last Visit
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    color: "#1F8E1F",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "24px",
                    marginTop: "10px",
                  }}
                >
                  {schedulesQuery.isPending
                    ? "…"
                    : lastVisit
                      ? formatDate(lastVisit)
                      : "No visits yet"}
                </Typography>
              </Grid>
              <Grid sx={{ width: "160px", marginLeft: "40px" }}>
                <Typography
                  component="p"
                  sx={{
                    color: "#000000",
                    opacity: 0.4,
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "24px",
                    marginTop: "10px",
                  }}
                >
                  Next Appointment
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    color: "#1F8E1F",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "24px",
                    marginTop: "10px",
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
                  padding: "8px",
                  borderRadius: "900px",
                  width: "36px",
                  height: "36px",
                }}
              />
            </a>
            <CalendarTodayIcon
              sx={{
                color: "#1F8E1F",
                backgroundColor: "#1F8E1F33",
                padding: "8px",
                borderRadius: "900px",
                width: "36px",
                height: "36px",
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
            borderRadius: "20px",
            marginBottom: "30px",
          }}
        >
          <Typography
            sx={{
              color: "#000000",
              fontWeight: 600,
              fontSize: "24px",
              lineHeight: "36px",
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
            borderRadius: "20px",
            margin: "auto",
            marginBottom: "30px",
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
                    fontSize: "16px",
                    lineHeight: "27px",
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
                    fontSize: "16px",
                    lineHeight: "27px",
                  }}
                  disableRipple
                />
              </Tabs>
            </Box>

            {schedulesQuery.isPending && (
              <Box sx={{ textAlign: "center", paddingY: "5%" }}>
                <CircularProgress size="24px" sx={{ color: "#1F8E1F" }} />
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
            borderRadius: "20px",
            marginBottom: "20px",
          }}
        >
          <Grid sx={{ margin: "auto", textAlign: "center" }}>
            <Avatar
              src={avatar}
              sx={{ height: "50px", width: "50px", margin: "auto" }}
            />
            <Typography
              sx={{
                color: "#1F8E1F",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              {parent?.firstName} {parent?.lastName}
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
            borderRadius: "20px",
            paddingY: "7%",
            paddingX: "7%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            maxHeight: "270px",
          }}
          size={12}
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
            {siblingsQuery.isPending && (
              <CircularProgress size="20px" sx={{ color: "#1F8E1F" }} />
            )}
            {siblingsQuery.isSuccess && siblings.length === 0 && (
              <Typography sx={{ color: "#00000099", fontSize: "14px" }}>
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
                  fontSize: "16px",
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
              width: "35px",
              height: "35px",
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
              gap: "5px",
              marginBottom: "5px",
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
              marginBottom: "5px",
            }}
          >
            Onboard a Sibling
          </Typography>
          <Grid sx={{ width: "100%" }}>
            <form onSubmit={handleSubmitChild}>
              {childMutation.isError && childFormError.validationError && (
                <Box sx={{ marginBottom: "5px" }}>
                  <ul>
                    {childFormError.validationError.map((valErr) => (
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
                <TextField sx={{ width: "600px" }} name="dob" type="date" />
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
                    component="span"
                    sx={{ color: "#222222", fontWeight: 300, fontSize: "12px" }}
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
                disabled={childMutation.isPending}
              >
                {childMutation.isPending ? (
                  <CircularProgress size="20px" sx={{ color: "#FFFFFF" }} />
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
    </Grid>
  );
}
