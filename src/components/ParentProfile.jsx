import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { Typography, Avatar, Box } from "@mui/material";

import avatar from "../assets/avatar.svg";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ModalWindow from "./Modal";

export default function ParentProfile({ onClose, open }) {
  return (
    <ModalWindow onClose={onClose} open={open}>
      <Grid
        sx={{
          borderRadius: "20px",
          backgroundColor: "#FFFFFF",
          width: "1000px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          <CancelRoundedIcon
            //   component={Button}
            onClick={onClose}
            sx={{
              color: "#1F8E1F",
              width: "30px",
              height: "30px",
              "&:hover": {
                borderRadius: "900px",
                transform: "scale(1.3)",
                transition: "0.1s ease",
                // width: "40px",
                // height: "40px",
                cursor: "pointer",
              },
            }}
          />
          <EditRoundedIcon
            sx={{
              color: "#1F8E1F",
              width: "30px",
              height: "30px",
              "&:hover": {
                borderRadius: "900px",
                transform: "scale(1.3)",
                transition: "0.1s ease",
                // width: "40px",
                // height: "40px",
                cursor: "pointer",
              },
            }}
          />
        </Box>
        <Grid container spacing={3} sx={{ width: "80%" }}>
          <Grid
            size={6}
            sx={{
              margin: "auto",
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
                Oluwapelumi Egunjobi
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
                Mom | 32 years
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                marginTop: "3%",
              }}
            >
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <BusinessIcon
                  sx={{
                    color: "#1F8E1F",
                    backgroundColor: "#FFFFFF80",
                    padding: "8px",
                    borderRadius: "900px",
                    height: "40px",
                    width: "40px",
                  }}
                />{" "}
                <Typography
                  sx={{ fontWeight: 400, fontSize: "16px", color: "#222222CC" }}
                >
                  Hospital Number: JUN00222
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <MonitorHeartRoundedIcon
                  sx={{
                    color: "#1F8E1F",
                    backgroundColor: "#FFFFFF80",
                    padding: "8px",
                    borderRadius: "900px",
                    height: "40px",
                    width: "40px",
                  }}
                />{" "}
                <Typography
                  sx={{ fontWeight: 400, fontSize: "16px", color: "#222222CC" }}
                >
                  NHIS: 4567585
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <EmailIcon
                  sx={{
                    color: "#1F8E1F",
                    backgroundColor: "#FFFFFF80",
                    padding: "8px",
                    borderRadius: "900px",
                    height: "40px",
                    width: "40px",
                  }}
                />{" "}
                <Typography
                  sx={{ fontWeight: 400, fontSize: "16px", color: "#222222CC" }}
                >
                  oluwapelumi77@gmail.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <LocalPhoneRoundedIcon
                  sx={{
                    color: "#1F8E1F",
                    backgroundColor: "#FFFFFF80",
                    padding: "8px",
                    borderRadius: "900px",
                    height: "40px",
                    width: "40px",
                  }}
                />{" "}
                <Typography
                  sx={{ fontWeight: 400, fontSize: "16px", color: "#222222CC" }}
                >
                  09066121168
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              paddingY: "4%",
              paddingX: "2%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              maxHeight: "400px",
              justifyContent: "center"
            }}
            size={6}
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
              <Link
                style={{
                  color: "#000000",
                  fontWeight: "400px",
                  fontSize: "16px",
                  textDecoration: "none",
                  zIndex: 4,
                }}
              >
                Kehinde
              </Link>
              <Link
                style={{
                  color: "#000000",
                  fontWeight: "400px",
                  fontSize: "16px",
                  textDecoration: "none",
                }}
              >
                Idowu
              </Link>
              <Link
                style={{
                  color: "#000000",
                  fontWeight: "400px",
                  fontSize: "16px",
                  textDecoration: "none",
                }}
              >
                Taiye
              </Link>
            </Grid>
            <AddCircleRoundedIcon
              sx={{
                width: "35px",
                height: "35px",
                color: "#1F8E1F",
                marginRight: "3%",
                "&:hover": {
                  borderRadius: "900px",
                  transform: "scale(1.3)",
                  transition: "0.1s ease",
                  // width: "40px",
                  // height: "40px",
                  cursor: "pointer",
                },
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </ModalWindow>
  );
}
