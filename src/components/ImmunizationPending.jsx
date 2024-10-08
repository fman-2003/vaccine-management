import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ImmunizationPending() {
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
        <Accordion
          elevation={0}
          sx={{
            backgroundColor: "#FFFFFF",
            borderBottom: 1,
            borderColor: "#0000001A",
            border: "none",
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
            aria-controls="panel1-content"
            id="panel1-header"
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
                BCG ( Bacilli Calmette Guerin)
              </Typography>
              <Typography
                sx={{
                  color: "#C91919",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "14px",
                  backgroundColor: "#C9191926",
                  borderRadius: "900px",
                  paddingY: "8px",
                  paddingX: "16px",
                }}
              >
                Pending 0/3
              </Typography>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              component={"p"}
              sx={{
                color: "#000000",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "24px",
                marginBottom: "5px",
              }}
            >
              BCG (Dose 1)
            </Typography>
            <Typography
              component={"p"}
              sx={{
                color: "#222222B2",
                fontWeight: 300,
                fontSize: "12px",
                lineHeight: "18px",
                marginBottom: "20px",
              }}
            >
              This dose is taken at birth or as soon as possible after birth
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
                  component={"p"}
                >
                  Status
                </Typography>
                <Box
                  sx={{
                    border: 1,
                    textAlign: "center",
                    borderColor: "#1F8E1F",
                    padding: "4px",
                    borderRadius: "4px",
                    height: "30px",
                  }}
                ></Box>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: 200,
                    fontSize: "12px",
                    lineHeight: "18px",
                    color: "#000000",
                  }}
                  component={"p"}
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
                  July 24, 2024
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
                  component={"p"}
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
                  July 24, 2024
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
                  component={"p"}
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
                  Immunization went as planned
                </Box>
              </Box>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion
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
            aria-controls="panel1-content"
            id="panel1-header"
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
                BCG ( Bacilli Calmette Guerin)
              </Typography>
              <Typography
                sx={{
                  color: "#C91919",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "14px",
                  backgroundColor: "#C9191926",
                  borderRadius: "900px",
                  paddingY: "8px",
                  paddingX: "16px",
                }}
              >
                Pending 0/3
              </Typography>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              component={"p"}
              sx={{
                color: "#000000",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "24px",
                marginBottom: "5px",
              }}
            >
              BCG (Dose 1)
            </Typography>
            <Typography
              component={"p"}
              sx={{
                color: "#222222B2",
                fontWeight: 300,
                fontSize: "12px",
                lineHeight: "18px",
                marginBottom: "20px",
              }}
            >
              This dose is taken at birth or as soon as possible after birth
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
                  component={"p"}
                >
                  Status
                </Typography>
                <Box
                  sx={{
                    border: 1,
                    textAlign: "center",
                    borderColor: "#1F8E1F",
                    padding: "4px",
                    borderRadius: "4px",
                    height: "30px",
                  }}
                >
                  
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
                  component={"p"}
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
                  July 24, 2024
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
                  component={"p"}
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
                  July 24, 2024
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
                  component={"p"}
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
                  Immunization went as planned
                </Box>
              </Box>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
}
