import { useCallback, useEffect, useState } from "react";

/**
 * Manages the state an <AlertMessage /> needs: what to say, how
 * severe it is, whether it's visible, and — optionally — clearing
 * itself after a delay.
 *
 * Usage:
 *   const alert = useAlert();
 *   alert.showSuccess("Parent added successfully");
 *   alert.showError("Something went wrong");
 *   <AlertMessage {...alert.props} />
 */
export default function useAlert(autoHideDuration = 6000) {
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [open, setOpen] = useState(false);

  const show = useCallback((newMessage, newSeverity) => {
    setMessage(newMessage);
    setSeverity(newSeverity);
    setOpen(true);
  }, []);

  const showSuccess = useCallback((msg) => show(msg, "success"), [show]);
  const showError = useCallback((msg) => show(msg, "error"), [show]);
  const showInfo = useCallback((msg) => show(msg, "info"), [show]);
  const showWarning = useCallback((msg) => show(msg, "warning"), [show]);

  const hide = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open || !autoHideDuration) return;

    const timer = setTimeout(() => setOpen(false), autoHideDuration);
    return () => clearTimeout(timer);
  }, [open, message, autoHideDuration]);

  return {
    show,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    hide,
    // Spread these straight onto <AlertMessage />
    props: { message, severity, open, onClose: hide },
  };
}
