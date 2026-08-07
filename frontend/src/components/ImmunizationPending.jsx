import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";
import formatDate from "../helper/format-date";

// pending vs. missed get slightly different accent colors so the tab
// isn't visually flat when a child has overdue doses mixed in
const STATUS_COLORS = {
  pending: "#C91919",
  missed: "#FF9900",
};

export default function ImmunizationPending({ schedules = [] }) {
  if (schedules.length === 0) {
    return (
      <Grid sx={{ padding: "5%", textAlign: "center" }}>
        <Typography sx={{ color: "#00000099" }}>
          No pending immunizations. All caught up!
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "95%",
          paddingX: "4%",
          paddingY: "1%",
          margin: "auto",
        }}
      >
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "18px",
            color: "#000000",
            opacity: 0.7,
          }}
        >
          Vaccine
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "18px",
            color: "#000000",
            opacity: 0.7,
          }}
        >
          Status
        </Typography>
      </Grid>

      <Grid>
        {schedules.map((schedule) => {
          const statusColor =
            STATUS_COLORS[schedule.status] ?? STATUS_COLORS.pending;
          const statusLabel =
            schedule.status === "missed" ? "Missed" : "Pending";

          return (
            <Accordion
              key={schedule._id}
              elevation={0}
              sx={{
                backgroundColor: "#FFFFFF",
                borderBottom: 1,
                borderColor: "#0000001A",
                "&:hover": {
                  backgroundColor: "#1F8E1F0D",
                  borderRadius: "12px",
                  border: 1,
                  borderColor: "#1F8E1F",
                  cursor: "pointer",
                },
                "&.Mui-expanded": {
                  backgroundColor: "#1F8E1F0D",
                  borderRadius: "12px",
                  border: 1,
                  borderColor: "#1F8E1F",
                  cursor: "pointer",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ flexDirection: "row-reverse", paddingY: "2%" }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#000000",
                      paddingLeft: "2%",
                    }}
                  >
                    {schedule.vaccine?.type ?? "Unknown vaccine"}
                  </Typography>
                  <Typography
                    sx={{
                      color: statusColor,
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "14px",
                      backgroundColor: `${statusColor}26`,
                      borderRadius: "900px",
                      paddingY: "8px",
                      paddingX: "16px",
                    }}
                  >
                    {statusLabel}
                  </Typography>
                </Grid>
              </AccordionSummary>

              <AccordionDetails>
                <Typography
                  component="p"
                  sx={{
                    color: "#000000",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "24px",
                    marginBottom: "5px",
                  }}
                >
                  {schedule.vaccine?.type}
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    color: "#222222B2",
                    fontWeight: 300,
                    fontSize: "12px",
                    lineHeight: "18px",
                    marginBottom: "20px",
                  }}
                >
                  Dosage: {schedule.vaccine?.dosage || "—"} • Route:{" "}
                  {schedule.vaccine?.routeOfAdministration || "—"} • Site:{" "}
                  {schedule.vaccine?.siteOfAdministration || "—"}
                </Typography>

                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 200,
                        fontSize: "12px",
                        lineHeight: "18px",
                        color: "#000000",
                      }}
                      component="p"
                    >
                      Status
                    </Typography>
                    <Box
                      sx={{
                        border: 1,
                        textAlign: "center",
                        borderColor: statusColor,
                        padding: "4px",
                        borderRadius: "4px",
                        height: "30px",
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 200,
                        fontSize: "12px",
                        lineHeight: "18px",
                        color: "#000000",
                      }}
                      component="p"
                    >
                      Earliest Date
                    </Typography>
                    <Box
                      sx={{
                        padding: "16px",
                        borderRadius: "8px",
                        backgroundColor: "#EEEEEE",
                        color: "#222222",
                        fontWeight: 400,
                        fontSize: "12px",
                      }}
                    >
                      {formatDate(schedule.earliestDate)}
                    </Box>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 200,
                        fontSize: "12px",
                        lineHeight: "18px",
                        color: "#000000",
                      }}
                      component="p"
                    >
                      Date of Immunization
                    </Typography>
                    <Box
                      sx={{
                        padding: "16px",
                        borderRadius: "8px",
                        backgroundColor: "#EEEEEE",
                        color: "#222222",
                        fontWeight: 400,
                        fontSize: "12px",
                      }}
                    >
                      {schedule.dateOfImmunization
                        ? formatDate(schedule.dateOfImmunization)
                        : "Not yet administered"}
                    </Box>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 200,
                        fontSize: "12px",
                        lineHeight: "18px",
                        color: "#000000",
                      }}
                      component="p"
                    >
                      Other Comment
                    </Typography>
                    <Box
                      sx={{
                        padding: "16px",
                        borderRadius: "8px",
                        backgroundColor: "#EEEEEE",
                        color: "#222222",
                        fontWeight: 400,
                        fontSize: "12px",
                      }}
                    >
                      {schedule.comment || "No comment"}
                    </Box>
                  </Box>
                </Grid>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Grid>
    </Grid>
  );
}

ImmunizationPending.propTypes = {
  schedules: PropTypes.array,
};
