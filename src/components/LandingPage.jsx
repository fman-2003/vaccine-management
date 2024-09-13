import { NavLink, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Stack,
  Button,
  CssBaseline,
  Divider,
} from "@mui/material";
// import CssBaseline from "@mui/material";
import Grid from "@mui/material/Grid2";

import haceyLogo from "../assets/hacey-svg.svg";
import pinLanding from "../assets/pin-1-landing.svg";
// import ellipse from "../assets/ellipse-1.svg";
import motherAndChild from "../assets/mother-child.svg";
import peaceFillOne from "../assets/peace-fill-1.svg";
import peaceFillTwo from "../assets/peace-fill-2.svg";
import peaceFillThree from "../assets/peace-fill-3.svg";
import peaceFillFour from "../assets/peace-fill-4.svg";
import featureOneImage from "../assets/rafiki-1.svg";
import featureTwoImage from "../assets/rafiki-2.svg";
import featureThreeImage from "../assets/rafiki-3.svg";
import featureFourImage from "../assets/rafiki-4.svg";
import smileyNurse from "../assets/smiley-nurse.svg";
import instagramLogo from "../assets/instagram-fill.svg";
import twitterLogo from "../assets/twitter-fill.svg";
import facebookLogo from "../assets/facebook-fill.svg";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div style={{ width: "100%" }}>
      <CssBaseline />
      <Box
        sx={{ minHeight: "100vh", backgroundColor: "#E1F0E1", width: "100%" }}
      >
        <Box
          sx={{
            width: "75%",
            paddingTop: "73px",
            marginX: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <img src={haceyLogo} alt="Hacey Logo" />
          <Box sx={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Stack direction={"row"} sx={{ alignItems: "center", gap: 3.5 }}>
              <NavLink style={{ textDecoration: "none", color: "#000000" }}>
                About us
              </NavLink>
              <NavLink style={{ textDecoration: "none", color: "#000000" }}>
                Features
              </NavLink>
              <NavLink style={{ textDecoration: "none", color: "#000000" }}>
                Procedures
              </NavLink>
            </Stack>
            <Button
              variant="contained"
              onClick={() => navigate("/dashboard")}
              sx={{
                textTransform: "none",
                backgroundColor: "#1F8E1F",
                paddingY: "12px",
                paddingX: "36px",
                height: "48px",
                width: "280px",
                borderRadius: "80px",
                fontWeight: 400,
                fontSize: 16,
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
        <Grid
          sx={{
            width: "100%",
            paddingLeft: "12%",
            paddingTop: "60px",
            // position: "relative",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Grid
            sx={{
              gap: "40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#D9ECD9",
                padding: "1.5px",
                borderRadius: "5px",
                width: "fit-content",
              }}
            >
              <img src={pinLanding} alt="Pin" style={{ marginRight: "3px" }} />
              <Typography sx={{ textWrap: "nowrap" }}>
                Simplify the process of immunisation management .
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  width: "70%",
                  minWidth: "490px",
                  color: "#000000",
                  fontWeight: 700,
                  fontSize: "56px",
                  lineHeight: "80px",
                }}
              >
                Manage Children’s{" "}
                <span style={{ color: "#1F8E1F" }}>Immunization</span> History
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  width: "65%",
                  minWidth: "500px",
                  color: "#888888",
                  fontWeight: 400,
                  fontSize: "24px",
                  lineHeight: "40px",
                }}
              >
                Add details of received vaccinations, including vaccine type,
                date administered, dosage, with timely reminder of upcoming
                vaccinations.
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={() => navigate("/auth")}
              sx={{
                textTransform: "none",
                backgroundColor: "#1F8E1F",
                paddingY: "12px",
                paddingX: "36px",
                height: "48px",
                width: "280px",
                borderRadius: "80px",
                gap: "8px",
                fontWeight: 400,
                fontSize: 16,
              }}
            >
              Login
            </Button>
          </Grid>
          <img
            src={motherAndChild}
            alt=""
            style={{
              //   position: "absolute",
              height: "634px",
              width: "978px",
            }}
          />
        </Grid>
      </Box>
      <Box sx={{ width: "75%", margin: "auto" }}>
        <Typography
          sx={{
            marginTop: "150px",
            textAlign: "center",
            fontWeight: 700,
            fontSize: "48px",
            background: "linear-gradient(to right, #1F8E1F, #092809)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
          }}
        >
          Here is How We Help
        </Typography>
        <Stack
          direction={"row"}
          sx={{
            width: "75%",
            gap: "24px",
            margin: "auto",
            paddingTop: "60px",
            paddingBottom: "150px",
          }}
        >
          <Stack
            direction={"column"}
            sx={{
              width: "23%",
              backgroundColor: "#1F8E1F1A",
              borderWidth: "2px",
              borderStyle: "solid",
              borderRadius: "30px",
              borderColor: "#1F8E1F",
              padding: "24px",
              gap: "16px",
            }}
          >
            <img src={peaceFillOne} style={{ width: "56px" }} alt="" />
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "24px",
                color: "#1F8E1F",
              }}
            >
              Improved Patient Outcomes
            </Typography>
            <Typography
              sx={{
                fontWeight: 300,
                fontSize: "16px",
                lineHeight: "35px",
                color: "#222222",
              }}
            >
              Ensure your patients receive timely and appropriate vaccinations,
              leading to better overall health.
            </Typography>
          </Stack>
          <Stack
            direction={"column"}
            sx={{
              width: "23%",
              backgroundColor: "#DF29351A",
              borderWidth: "2px",
              borderColor: "#DF2935",
              borderStyle: "solid",
              borderRadius: "30px",
              gap: "16px",
              padding: "24px",
            }}
          >
            <img src={peaceFillTwo} style={{ width: "56px" }} alt="" />

            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "24px",
                color: "#DF2935",
              }}
            >
              Enhanced Practice Efficiency
            </Typography>
            <Typography
              sx={{
                fontWeight: 300,
                fontSize: "16px",
                lineHeight: "35px",
                color: "#222222",
              }}
            >
              Save valuable time and resources with streamlined workflows and
              automated tasks.
            </Typography>
          </Stack>
          <Stack
            direction={"column"}
            sx={{
              width: "23%",
              backgroundColor: "#FF99001A",
              borderWidth: "2px",
              borderColor: "#FF9900",
              borderStyle: "solid",
              borderRadius: "30px",
              gap: "16px",
              padding: "24px",
            }}
          >
            <img src={peaceFillThree} style={{ width: "56px" }} alt="" />
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "24px",
                color: "#FF9900",
              }}
            >
              Reduced Errors:
            </Typography>
            <Typography
              sx={{
                fontWeight: 300,
                fontSize: "16px",
                lineHeight: "35px",
                color: "#222222",
              }}
            >
              Minimize the risk of errors with a centralized and secure
              record-keeping system.
            </Typography>
          </Stack>
          <Stack
            direction={"column"}
            sx={{
              width: "23%",
              backgroundColor: "#3772FF1A",
              borderWidth: "2px",
              borderColor: "#3772FF",
              borderStyle: "solid",
              borderRadius: "30px",
              gap: "16px",
              padding: "24px",
            }}
          >
            <img src={peaceFillFour} style={{ width: "56px" }} alt="" />
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "24px",
                color: "#3772FF",
              }}
            >
              Improved Patient Engagement:
            </Typography>
            <Typography
              sx={{
                fontWeight: 300,
                fontSize: "16px",
                lineHeight: "35px",
                color: "#222222",
              }}
            >
              Empower patients to take an active role in their health by
              providing them with easy access to their immunization records.
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Container
        sx={{
          minWidth: "100%",
          backgroundColor: "#E1F0E1",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: "48px",
            background: "linear-gradient(to right, #1F8E1F, #092809)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            paddingTop: "150px",
          }}
        >
          Get Started
        </Typography>
        <Grid sx={{ width: "100%", paddingTop: "80px" }}>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              width: "100%",
              margin: "auto",
              marginBottom: "100px",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "40px",
                width: "70%",
                margin: "auto",
              }}
            >
              <img
                src={featureOneImage}
                style={{ alignSelf: "center" }}
                alt=""
              />
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  alignSelf: "center",
                  maxWidth: "524px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "24px",
                    lineHeight: "34px",
                    color: "#000000",
                    textAlign: "start",
                  }}
                >
                  Create a free account for your practice
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "35px",
                    textAlign: "justify",
                    color: "#00000099",
                  }}
                >
                  Get started quickly with a free account for your practice.
                  Simply enter your healthcare professional information and
                  clinic details in our secure system.
                </Typography>
              </Grid>
            </Grid>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "250px",
                lineHeight: "48px",
                textAlign: "center",
                alignSelf: "center",
                color: "#1F8E1F",
                opacity: 0.1,
              }}
            >
              1
            </Typography>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "100px",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "250px",
                lineHeight: "48px",
                textAlign: "center",
                alignSelf: "center",
                color: "#1F8E1F",
                opacity: 0.1,
              }}
            >
              2
            </Typography>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "40px",
                width: "70%",
                margin: "auto",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  alignSelf: "center",
                  maxWidth: "524px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "24px",
                    lineHeight: "34px",
                    color: "#000000",
                    textAlign: "start",
                  }}
                >
                  Add your healthcare professional information and clinic
                  details.
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "35px",
                    textAlign: "justify",
                    color: "#00000099",
                  }}
                >
                  Get started quickly with a free account for your practice.
                  Simply enter your healthcare professional information and
                  clinic details in our secure system.
                </Typography>
              </Grid>
              <img
                src={featureTwoImage}
                style={{ alignSelf: "center" }}
                alt=""
              />
            </Grid>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "100px",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "40px",
                width: "70%",
                margin: "auto",
              }}
            >
              <img
                src={featureThreeImage}
                style={{ alignSelf: "center" }}
                alt=""
              />
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  alignSelf: "center",
                  maxWidth: "524px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "24px",
                    lineHeight: "34px",
                    color: "#000000",
                    textAlign: "start",
                  }}
                >
                  Upload or manually enter your patients&apos; immunization
                  data.
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "35px",
                    textAlign: "justify",
                    color: "#00000099",
                  }}
                >
                  Upload your patients&apos; immunization data directly or enter
                  it manually with ease. Our system is designed for efficient
                  data management.
                </Typography>
              </Grid>
            </Grid>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "250px",
                lineHeight: "48px",
                textAlign: "center",
                alignSelf: "center",
                color: "#1F8E1F",
                opacity: 0.1,
              }}
            >
              3
            </Typography>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              textAlign: "center",
              margin: "auto",
              marginBottom: "100px",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "250px",
                lineHeight: "48px",
                textAlign: "center",
                alignSelf: "center",
                color: "#1F8E1F",
                opacity: 0.1,
              }}
            >
              4
            </Typography>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "40px",
                width: "70%",
                margin: "auto",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  alignSelf: "center",
                  maxWidth: "524px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "24px",
                    lineHeight: "34px",
                    color: "#000000",
                    textAlign: "start",
                  }}
                >
                  Set up automated reminders and customize reporting
                  preferences.
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "35px",
                    textAlign: "justify",
                    color: "#00000099",
                  }}
                >
                  Never miss a vaccination again! Set up automated alerts for
                  upcoming immunizations and customize reporting preferences to
                  meet your practice&apos;s specific needs.
                </Typography>
              </Grid>
              <img
                src={featureFourImage}
                style={{ alignSelf: "center" }}
                alt=""
              />
            </Grid>
          </Grid>
        </Grid>
        <Box
          sx={{
            margin: "auto",
            paddingY: "100px",
            textAlign: "center",
            minWidth: "100%",
          }}
        >
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#1F8E1F",
              paddingY: "12px",
              paddingX: "36px",
              height: "62px",
              width: "409px",
              borderRadius: "80px",
              fontWeight: 500,
              fontSize: 20,
              lineHeight: "30px",
            }}
          >
            Register Now
          </Button>
        </Box>
        <Box
          sx={{
            minWidth: "100%",
            height: "809px",
            backgroundImage: `url(${smileyNurse})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#1F8E1F4D",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#1F8E1F4D",
              zIndex: 1,
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              top: "50%",
              right: "10%",
              maxWidth: "460px",
            }}
          >
            <Typography
              sx={{
                color: "#FFFFFF",
                fontWeight: 500,
                fontSize: "24px",
                lineHeight: "48px",
                zIndex: 10,
              }}
            >
              Join a growing network of healthcare professionals who are
              transforming immunization management! Sign up for your free
              account today and experience the difference.
            </Typography>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "#1F8E1F",
                paddingY: "12px",
                paddingX: "36px",
                height: "62px",
                width: "409px",
                borderRadius: "80px",
                fontWeight: 500,
                fontSize: "20px",
                lineHeight: "30px",
                zIndex: 10,
              }}
            >
              Register Now
            </Button>
          </Box>
        </Box>
        <Divider
          sx={{
            minWidth: "100%",
            marginTop: "150px",

            color: "#003466",
            backgroundColor: "#003466",
            opacity: 0.4,
          }}
        />
        <Stack
          direction={"row"}
          sx={{
            paddingY: "50px",
            width: "70%",
            margin: "auto",
            justifyContent: "flex-end",
            gap: "16px",
          }}
        >
          <Box sx={{ cursor: "pointer" }}>
            <img src={instagramLogo} alt="" />
          </Box>
          <Box sx={{ cursor: "pointer" }}>
            <img src={twitterLogo} alt="" />
          </Box>
          <Box sx={{ cursor: "pointer" }}>
            <img src={facebookLogo} alt="" />
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
