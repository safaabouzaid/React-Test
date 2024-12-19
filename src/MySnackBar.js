import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";

export default function MySnackbar({ open, message }) {
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small">
        UNDO
      </Button>
      <IconButton size="small" aria-label="close" color="inherit">
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        message="Note archived"
        action={action}
      >
        <Alert
          sx={{ width: "100%", direction: "rtl" }}
          variant="filled"
          severity="success"
        >
          {message}{" "}
        </Alert>
      </Snackbar>
    </div>
  );
}