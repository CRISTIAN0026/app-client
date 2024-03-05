import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { AuthContext } from "../context/authContext.js";
import { useNavigate } from "react-router-dom";

const pages = ["Productos", "Empresas"];
const settings = ["Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { user, logout } = useContext(AuthContext);
  let navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/");
    setAnchorElUser(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#000" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon
            sx={{
              color: "#ffe900",
              display: { xs: "none", md: "flex" },
              mr: 1,
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#ffe900",
              textDecoration: "none",
            }}
          >
            LITE THINKING
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" style={{ color: "#ffe900" }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon
            sx={{
              color: "#ffe900",
              display: { xs: "flex", md: "none" },
              mr: 1,
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#ffe900",
              textDecoration: "none",
            }}
          >
            LITE THINKING
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {user && (
              <>
                {user?.email === "admin@example.com"
                  ? pages.map((page) => (
                      <Button
                        key={page}
                        href={`/${page.toLowerCase()}`}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "#ffe900", display: "block" }}
                      >
                        {page}
                      </Button>
                    ))
                  : pages.includes("Empresas") && (
                      <Button
                        key="Empresas"
                        href="/empresas" // suponiendo que la ruta para "Empresas" sea "/empresas"
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "#ffe900", display: "block" }}
                      >
                        Empresas
                      </Button>
                    )}
              </>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user && (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.email} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            )}
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={onLogout}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
