import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { UserContext } from "../contexts/UserProvider";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import roles from "../utils/constants/roles";
import { auth } from "../services/firebase/client";

export default function NavBar() {
  const router = useRouter();
  const { user, customClaims } = React.useContext(UserContext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Mind Fuzz Records
          </Typography>

          <Box sx={{ ml: 2 }}>
            {!user ? (
              <Button color="inherit" onClick={() => router.push("/login")}>
                Login
              </Button>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.displayName}
                      src={user.photoURL}
                      sx={{
                        width: { xs: 32, sm: 38 },
                        height: { xs: 32, sm: 38 },
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={() => router.push("/")}>
                    <Typography textAlign="center">Home</Typography>
                  </MenuItem>
                  {customClaims?.role === roles.ADMIN && (
                    <MenuItem onClick={() => router.push("/dashboard")}>
                      <Typography textAlign="center">
                        Admin Dashboard
                      </Typography>
                    </MenuItem>
                  )}
                  <MenuItem onClick={() => signOut(auth)}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
