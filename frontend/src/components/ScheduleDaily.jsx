import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import SortSharpIcon from "@mui/icons-material/SortSharp";

export default function ScheduleDaily() {
  return (
    <Grid
      size={8}
      sx={{
        display: "flex",
        marginBottom: "30px",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        maxHeight: "577px",
        borderRadius: "20px",
        paddingX: "2%",
        paddingY: "1%",

        width: "500px",
        marginRight: "30px",
        "&:hover": {
          border: 1,
          borderColor: "#1F8E1F",
          cursor: "default",
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
        <Typography
          sx={{
            color: "#000000",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "36px",
          }}
        >
          Today
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <SortSharpIcon />
          <SearchSharpIcon />
        </Box>
      </Grid>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingY: "4%",
        }}
      >
        <Typography
          sx={{
            color: "#000000",
            opacity: 0.6,
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "18px",
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
          }}
        >
          Vaccine
        </Typography>
      </Grid>

      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          width: "110%",
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingY: "5%",

            "&:hover": {
              backgroundColor: "#1F8E1F0D",
              cursor: "default",
            },
          }}
        >
          <Typography
            sx={{
              color: "#000000",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "24px",
              maxWidth: "145px",
            }}
          >
            Taiwo Awoniyi
          </Typography>
          <Typography
            sx={{
              color: "#1F8E1F",
              fontWeight: 300,
              fontSize: "16px",
              lineHeight: "24px",
            }}
          >
            OPV 0 (Oral Polio Vaccine)
          </Typography>
        </Box>

        <Box
          sx={{
            borderBottom: 1,
            borderColor: "rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingY: "5%",

            "&:hover": {
              backgroundColor: "#1F8E1F0D",
              cursor: "default",
            },
          }}
        >
          <Typography
            sx={{
              color: "#000000",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "24px",
            }}
          >
            Taiwo Awoniyi
          </Typography>
          <Typography
            sx={{
              color: "#1F8E1F",
              fontWeight: 300,
              fontSize: "16px",
              lineHeight: "24px",
            }}
          >
            OPV 0 (Oral Polio Vaccine)
          </Typography>
        </Box>

        <Box
          sx={{
            borderBottom: 1,
            borderColor: "rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingY: "5%",

            "&:hover": {
              backgroundColor: "#1F8E1F0D",
              cursor: "default",
            },
          }}
        >
          <Typography
            sx={{
              color: "#000000",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "24px",
            }}
          >
            Taiwo Awoniyi
          </Typography>
          <Typography
            sx={{
              color: "#1F8E1F",
              fontWeight: 300,
              fontSize: "16px",
              lineHeight: "24px",
            }}
          >
            OPV 0 (Oral Polio Vaccine)
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingY: "5%",

              "&:hover": {
                backgroundColor: "#1F8E1F0D",
                cursor: "default",
              },
            }}
          >
            <Typography
              sx={{
                color: "#000000",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              Taiwo Awoniyi
            </Typography>
            <Typography
              sx={{
                color: "#1F8E1F",
                fontWeight: 300,
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              OPV 0 (Oral Polio Vaccine)
            </Typography>
          </Box>
          <Box>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingY: "5%",
                "&:hover": {
                  backgroundColor: "#1F8E1F0D",
                  cursor: "default",
                },
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                Taiwo Awoniyi
              </Typography>

              <Typography
                sx={{
                  color: "#1F8E1F",
                  fontWeight: 300,
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                OPV 0 (Oral Polio Vaccine)
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
