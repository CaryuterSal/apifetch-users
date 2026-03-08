import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AppButton from "./AppButton";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ background: "linear-gradient(135deg, #1a237e 0%, #283593 100%)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
      <Toolbar>
        <StorefrontIcon sx={{ mr: 1.5, fontSize: 28 }} />
        <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1, letterSpacing: 1 }}>
          FakeStore Manager
        </Typography>
        {isAuthenticated ? (
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <AppButton variant="text" sx={{ color: "white" }} onClick={() => navigate("/users")}>Usuarios</AppButton>
            <AppButton variant="outlined" color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout} sx={{ borderColor: "rgba(255,255,255,0.5)", color: "white" }}>
              Salir
            </AppButton>
          </Box>
        ) : (
          <AppButton variant="outlined" color="inherit" onClick={() => navigate("/login")} sx={{ borderColor: "rgba(255,255,255,0.5)", color: "white" }}>
            Iniciar Sesión
          </AppButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
