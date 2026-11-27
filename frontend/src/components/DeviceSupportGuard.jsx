import PropTypes from "prop-types";
import { Box, Stack, Typography } from "@mui/material";
import LaptopRoundedIcon from "@mui/icons-material/LaptopRounded";
import DesktopWindowsRoundedIcon from "@mui/icons-material/DesktopWindowsRounded";

import haceyLogo from "../assets/hacey-svg.svg";
import useDeviceSupport, { MIN_SUPPORTED_WIDTH } from "../hooks/useDeviceSupport";

// Note: the wall is sized in px on purpose. The rest of the app scales with
// the viewport (see index.css), but this screen is shown on phones and must
// stay readable there regardless of that scale.

export default function DeviceSupportGuard({ children }) {
  const { supported, reason, deviceKind } = useDeviceSupport();

  // While the wall is up the app is hidden but stays mounted, so a desktop
  // user who briefly narrows their window doesn't lose unsaved form input.
  // It must be display:none rather than just covered: the desktop layout is
  // far wider than a phone, and mobile browsers widen the page to fit it,
  // which pushes the wall off-centre.
  return (
    <>
      <div style={supported ? undefined : { display: "none" }}>{children}</div>
      {!supported && (
        <UnsupportedDeviceWall reason={reason} deviceKind={deviceKind} />
      )}
    </>
  );
}

DeviceSupportGuard.propTypes = {
  children: PropTypes.node,
};

const DEVICE_LABEL = {
  phone: "a phone",
  tablet: "a tablet",
  touch: "a touchscreen device",
};

function UnsupportedDeviceWall({ reason, deviceKind }) {
  const onHandheld = reason === "device";

  return (
    <Box
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="device-wall-title"
      aria-describedby="device-wall-description"
      sx={{
        position: "fixed",
        inset: 0,
        // Above MUI modals (1300), snackbars (1400) and tooltips (1500).
        zIndex: 2000,
        backgroundColor: "#E1F0E1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        overflowY: "auto",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          maxWidth: "440px",
          alignItems: "center",
          textAlign: "center",
          gap: "24px",
          backgroundColor: "#FFFFFF",
          borderRadius: "24px",
          padding: "40px 28px",
          boxShadow: "0 12px 40px rgba(31, 142, 31, 0.12)",
        }}
      >
        <img src={haceyLogo} alt="Hacey Logo" style={{ maxWidth: "140px" }} />

        <Stack
          direction="row"
          sx={{
            gap: "12px",
            alignItems: "flex-end",
            justifyContent: "center",
            color: "#1F8E1F",
            backgroundColor: "#1F8E1F1A",
            borderRadius: "50%",
            width: "112px",
            height: "112px",
            paddingBottom: "28px",
          }}
        >
          <LaptopRoundedIcon sx={{ fontSize: "44px" }} />
          <DesktopWindowsRoundedIcon sx={{ fontSize: "36px", mb: "2px" }} />
        </Stack>

        <Typography
          id="device-wall-title"
          component="h1"
          sx={{ fontWeight: 700, fontSize: "22px", color: "#000000" }}
        >
          {onHandheld
            ? "Please switch to a laptop or desktop"
            : "Please use a larger screen"}
        </Typography>

        <Typography
          id="device-wall-description"
          sx={{ fontSize: "15px", lineHeight: "26px", color: "#555555" }}
        >
          {onHandheld ? (
            <>
              It looks like you&apos;re using{" "}
              {DEVICE_LABEL[deviceKind] ?? "a mobile device"}. This app is built
              for <strong>laptops and desktop computers</strong> and isn&apos;t
              available on phones or tablets.
            </>
          ) : (
            <>
              This app is built for <strong>laptops and desktop computers</strong>{" "}
              and needs a browser window at least{" "}
              <strong>{MIN_SUPPORTED_WIDTH}px</strong> wide.
            </>
          )}
        </Typography>

        <Typography
          sx={{
            fontSize: "13px",
            lineHeight: "22px",
            color: "#888888",
            borderTop: "1px solid #E5E5E5",
            paddingTop: "16px",
            width: "100%",
          }}
        >
          {onHandheld
            ? "Open this page on a laptop or desktop computer to continue."
            : "Maximise your browser window or zoom out (Ctrl/Cmd + −) and this message will disappear."}
        </Typography>
      </Stack>
    </Box>
  );
}

UnsupportedDeviceWall.propTypes = {
  reason: PropTypes.oneOf(["device", "width"]).isRequired,
  deviceKind: PropTypes.oneOf(["phone", "tablet", "touch"]),
};
