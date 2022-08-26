import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { IconButton, Tooltip } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

export default function SearchBar({ setSearch }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        height: 72,
        borderRadius: 2,
        border: (theme) => `1px solid ${theme.palette.grey[300]}`,
        backgroundColor: (theme) => `${theme.palette.background.paper}`,
        mb: (theme) => theme.spacing(3),
        p: (theme) => theme.spacing(2),
      }}
    >
      <Search sx={{ width: { xs: "100%", sm: 275 } }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          size="small"
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>
      <Tooltip title="Filter">
        <IconButton
          disableTouchRipple
          sx={{
            borderRadius: 2,
            border: (theme) => `1px solid ${theme.palette.grey[300]}`,
            width: 38,
            height: 38,
            ml: 2,
          }}
        >
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
