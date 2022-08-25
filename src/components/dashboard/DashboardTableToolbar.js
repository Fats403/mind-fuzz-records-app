import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DialogContext } from "../../contexts/DialogProvider";

const DashboardTableToolbar = ({ numSelected, onSearchChange, searchText }) => {
  const { openDialog } = React.useContext(DialogContext);
  return (
    <Toolbar
      sx={{
        px: { xs: 2 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
        height: 72,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h5" fontWeight={500}>
        Product Dashboard
      </Typography>

      <Box>
        <TextField
          size="small"
          placeholder="Search..."
          variant="outlined"
          disabled={numSelected > 0}
          value={searchText}
          onChange={onSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Tooltip title="Add Product">
          <IconButton
            sx={{
              width: 40,
              height: 40,
              border: (theme) => `1px solid ${theme.palette.grey[400]}`,
              ml: 2,
              borderRadius: 2,
            }}
            variant="contained"
            onClick={() => openDialog({ open: true, name: "add-product" })}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Toolbar>
  );
};

DashboardTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
};

export default DashboardTableToolbar;
