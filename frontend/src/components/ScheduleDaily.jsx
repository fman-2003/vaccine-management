import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PropTypes from "prop-types";

export default function ScheduleDaily({
  dateLabel,
  schedules = [],
  onEdit,
  onDelete,
}) {
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "20px",
        backgroundColor: "#FFFFFF",
        borderRadius: "20px",
        paddingX: "2%",
        paddingY: "1.5%",
        width: "100%",
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
        <Typography
          sx={{
            color: "#000000",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "36px",
          }}
        >
          {dateLabel}
        </Typography>
        <Typography
          sx={{ color: "#00000099", fontWeight: 400, fontSize: "14px" }}
        >
          {schedules.length} {schedules.length === 1 ? "entry" : "entries"}
        </Typography>
      </Grid>

      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingY: "2%",
        }}
      >
        <Typography
          sx={{
            color: "#000000",
            opacity: 0.6,
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "18px",
            width: "40%",
          }}
        >
          Name
        </Typography>
        <Typography
          sx={{
            color: "#000000",
            opacity: 0.6,
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "18px",
            width: "40%",
          }}
        >
          Vaccine
        </Typography>
        <Typography
          sx={{
            color: "#000000",
            opacity: 0.6,
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "18px",
            width: "20%",
            textAlign: "right",
          }}
        >
          Actions
        </Typography>
      </Grid>

      <Grid sx={{ display: "flex", flexDirection: "column" }}>
        {schedules.map((schedule) => (
          <Box
            key={schedule._id}
            sx={{
              borderBottom: 1,
              borderColor: "rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingY: "1.5%",
              "&:hover": { backgroundColor: "#1F8E1F0D" },
            }}
          >
            <Typography
              sx={{
                color: "#000000",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "24px",
                width: "40%",
              }}
            >
              {schedule.child?.firstName} {schedule.child?.lastName}
            </Typography>
            <Typography
              sx={{
                color: "#1F8E1F",
                fontWeight: 300,
                fontSize: "16px",
                lineHeight: "24px",
                width: "40%",
              }}
            >
              {schedule.vaccine?.type}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                width: "20%",
                justifyContent: "flex-end",
              }}
            >
              <EditRoundedIcon
                onClick={() => onEdit(schedule)}
                sx={{
                  color: "#1F8E1F",
                  width: "22px",
                  height: "22px",
                  cursor: "pointer",
                  "&:hover": { transform: "scale(1.15)" },
                }}
              />
              <DeleteRoundedIcon
                onClick={() => onDelete(schedule)}
                sx={{
                  color: "#C91919",
                  width: "22px",
                  height: "22px",
                  cursor: "pointer",
                  "&:hover": { transform: "scale(1.15)" },
                }}
              />
            </Box>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
}

ScheduleDaily.propTypes = {
  dateLabel: PropTypes.string.isRequired,
  schedules: PropTypes.array,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
