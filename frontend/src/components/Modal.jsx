/* eslint-disable react/prop-types */
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  // Long forms (e.g. Onboard Parent) are taller than short laptop screens
  // such as 1366x768: keep the whole dialog on screen and scroll inside it.
  maxWidth: "95vw",
  maxHeight: "92vh",
  overflowY: "auto",
  paddingX: "4%",
  paddingY: "2%",
  bgcolor: "background.paper",
  borderRadius: "1.25rem",
  boxShadow: 24,
  //   p: 4,
};

export default function ModalWindow({ children, open, onClose }) {
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        sx={{
          width: "100%",
          margin: "auto",
          borderRadius: "1.25rem",
        }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>{children}</Box>
        </Fade>
      </Modal>
    </div>
  );
}
