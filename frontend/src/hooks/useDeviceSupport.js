import useMediaQuery from "@mui/material/useMediaQuery";

// Smallest viewport width (in CSS pixels) the app's layouts are built for.
export const MIN_SUPPORTED_WIDTH = 1024;

const PHONE_UA =
  /iPhone|iPod|Windows Phone|IEMobile|BlackBerry|BB10|Opera Mini|webOS|Android.*Mobile|Mobile.*Firefox/i;
const TABLET_UA = /iPad|Tablet|Silk|Kindle|PlayBook|Android/i;

// Works out from the browser's own identification whether this is a phone or
// tablet. Read once: a device doesn't change what it is while the page is open.
function detectHandheldFromBrowser() {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent || "";

  // Chromium browsers report this directly (Client Hints).
  if (navigator.userAgentData?.mobile) return "phone";
  if (PHONE_UA.test(ua)) return "phone";
  if (TABLET_UA.test(ua)) return "tablet";

  // iPadOS 13+ Safari pretends to be a Mac ("Request Desktop Website" is on by
  // default), but real Macs have no touchscreen.
  if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return "tablet";

  return null;
}

const handheldFromBrowser = detectHandheldFromBrowser();

/**
 * Decides whether this device can use the app.
 *
 * Returns { supported, reason, deviceKind }, where reason is:
 *  - "device": a phone or tablet, whatever its screen size
 *  - "width":  a computer whose browser window is too narrow
 *  - null:     supported
 */
export default function useDeviceSupport() {
  // noSsr reads the queries on the first render, so a phone never sees a
  // flash of the desktop layout before the wall appears.
  const isNarrow = useMediaQuery(
    `(max-width: ${MIN_SUPPORTED_WIDTH - 0.02}px)`,
    { noSsr: true }
  );

  // Backstop for devices whose browser hides what they are (e.g. Android
  // tablets, which request desktop sites by default): the only input is a
  // finger, with no mouse or trackpad attached. Touchscreen laptops still have
  // a fine pointer, so they pass. These are live, so attaching a keyboard with
  // a trackpad to a convertible lifts the wall.
  const primaryIsTouch = useMediaQuery("(hover: none) and (pointer: coarse)", {
    noSsr: true,
  });
  const hasFinePointer = useMediaQuery("(any-pointer: fine)", { noSsr: true });
  const isTouchOnly = primaryIsTouch && !hasFinePointer;

  const deviceKind = handheldFromBrowser ?? (isTouchOnly ? "touch" : null);

  if (deviceKind) return { supported: false, reason: "device", deviceKind };
  if (isNarrow) return { supported: false, reason: "width", deviceKind: null };
  return { supported: true, reason: null, deviceKind: null };
}
