import * as React from "react";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <MuiLink
        color="inherit"
        sx={{ cursor: "pointer" }}
        onClick={() => window.open("https://www.mindfuzzrecords.com", "_blank")}
      >
        Mind Fuzz Records
      </MuiLink>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}
