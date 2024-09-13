import React from "react";
import Grid from "@mui/material/Grid2";
import {
  Typography,
  Button,
  TextField,
  InputLabel,
  Box,
  InputAdornment,
} from "@mui/material";

import haceyLogo from "../assets/hacey-svg.svg";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import SortSharpIcon from "@mui/icons-material/SortSharp";
import VaccinesRoundedIcon from "@mui/icons-material/VaccinesRounded";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import ModalWindow from "./Modal";

export default function Vaccines() {
  const [openVaccine, setOpenVaccine] = React.useState(false);

  const handleOpenVaccine = () => setOpenVaccine(true);
  const handleCloseVaccine = () => setOpenVaccine(false);
  return (
    <Grid container spacing={5} sx={{ width: "95%" }}>
      <Grid size={8}>
        {
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
                <ArrowBackSharpIcon sx={{ color: "#1F8E1F" }} />{" "}
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
                    placeholder="johndoe@gmail.com"
                    sx={{ width: "600px" }}
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
                    placeholder="johndoe@gmail.com"
                    sx={{ width: "600px" }}
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
                    placeholder="johndoe@gmail.com"
                    sx={{ width: "600px" }}
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
                    placeholder="johndoe@gmail.com"
                    sx={{ width: "600px" }}
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
                    placeholder="johndoe@gmail.com"
                    sx={{ width: "600px" }}
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
                >
                  Create New Vaccine
                </Button>
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
        }
        {
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
                <ArrowBackSharpIcon sx={{ color: "#1F8E1F" }} />{" "}
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
                    placeholder="johndoe@gmail.com"
                    sx={{ width: "600px" }}
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
                    placeholder="johndoe@gmail.com"
                    sx={{ width: "600px" }}
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
                    placeholder="johndoe@gmail.com"
                    sx={{ width: "600px" }}
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
                    placeholder="johndoe@gmail.com"
                    sx={{ width: "600px" }}
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
                    placeholder="johndoe@gmail.com"
                    sx={{ width: "600px" }}
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
                >
                  Create New Vaccine
                </Button>
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
        }
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
              transform: "scale(1.05)",
              transition: "0.3s ease",
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
              Add a New Vaccine to be administer to all
            </Typography>
          </Grid>
          <Grid>
            <AddCircleRoundedIcon
              sx={{ color: "#1F8E1F", height: "70px", width: "70px" }}
            />
          </Grid>
        </Grid>
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
              Existitng Vaccines
            </Typography>
            <Box
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
            </Box>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              paddingY: "5%",
              //   paddingX: "1%",
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
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "23%",
                alignItems: "flex-start",
                paddingY: "3%",
                borderBottom: 1,
                borderColor: "rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: "#1F8E1F0D",
                  borderRadius: "15px",
                  border: 1,
                  borderColor: "#1F8E1F",
                  cursor: "default",
                },
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 500,
                  maxWidth: "120px",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                At Birth
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 500,
                  maxWidth: "190px",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                HEP BO
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 300,
                  opacity: 0.8,
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                0.5ml
              </Typography>
              <Typography
                sx={{
                  color: "#1F8E1F",
                  fontWeight: 300,
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                Intramuscular
              </Typography>
            </Grid>
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
                  cursor: "default",
                },
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 500,
                  maxWidth: "120px",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                At Birth
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 500,
                  maxWidth: "190px",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                OPV0
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 300,
                  opacity: 0.8,
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                2 Drops
              </Typography>
              <Typography
                sx={{
                  color: "#1F8E1F",
                  fontWeight: 300,
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                Oral
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "24%",
                alignItems: "center",
                paddingY: "3%",

                borderBottom: 1,
                borderColor: "rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: "#1F8E1F0D",
                  borderRadius: "15px",
                  border: 1,
                  borderColor: "#1F8E1F",
                  cursor: "default",
                },
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 500,
                  maxWidth: "120px",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                At Birth
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 500,
                  maxWidth: "190px",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                BCG
              </Typography>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: 300,
                  opacity: 0.8,
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                0.05ML
              </Typography>
              <Typography
                sx={{
                  color: "#1F8E1F",
                  fontWeight: 300,
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                Intra Dermal
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={4}>
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
              25
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
