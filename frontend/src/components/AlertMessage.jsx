import PropTypes from "prop-types";
import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function AlertMessage({
  message,
  severity = "info",
  open,
  onClose,
}) {
  if (!message) return null;

  return (
    <Collapse sx={{ zIndex: 100 }} in={open}>
      <Alert
        severity={severity}
        variant="filled"
        role="status"
        sx={{ position: "fixed", top: 16, right: 16, zIndex: 1000 }}
        action={
          onClose && (
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          )
        }
      >
        {message}
      </Alert>
    </Collapse>
  );
}

AlertMessage.propTypes = {
  message: PropTypes.string,
  severity: PropTypes.oneOf(["error", "warning", "info", "success"]),
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};
