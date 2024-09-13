import doodleBackground from "../assets/medicine-doodle-set.svg";

export const styles = {
  container: {
    position: "relative", // Necessary for absolute positioning of the overlay
    width: "100vw",
    height: "100vh",
    maxWidth: "1685px",
    margin: "0 auto", // Center the container horizontally
    backgroundImage: `url(${doodleBackground})`,
    backgroundSize: "cover", // Ensure the SVG covers the entire container
    backgroundPosition: "center",
    opacity: 0.8, // 80% opacity for the background image
  },
  content: {
    position: "relative", // This ensures the content stays above the background and overlay
    zIndex: 12, // Content above everything else
    minWidth: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute", // Overlay sits on top of the SVG background
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(31, 142, 31, 0.3)", // Accent color with 30% opacity
    zIndex: 1, // Ensure the overlay is below the content
    pointerEvents: "none", // This ensures the overlay does not block interactions with content
  },
};
