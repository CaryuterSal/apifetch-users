import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import AppButton from "../components/AppButton";
import { useAuth } from "../context/AuthContext";

const features = [
  { icon: <PeopleIcon sx={{ fontSize: 40, color: "#1a237e" }} />, title: "Gestión de Usuarios", desc: "Visualiza, crea y elimina usuarios de la plataforma." },
  { icon: <SecurityIcon sx={{ fontSize: 40, color: "#1a237e" }} />, title: "Autenticación Segura", desc: "Acceso protegido con tokens JWT mediante FakeStoreAPI." },
  { icon: <SpeedIcon sx={{ fontSize: 40, color: "#1a237e" }} />, title: "Interfaz Ágil", desc: "Material Design + React para una experiencia fluida." },
];

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <Box>
      <Box sx={{ background: "linear-gradient(135deg, #1a237e 0%, #3949ab 60%, #5c6bc0 100%)", color: "white", py: { xs: 8, md: 14 }, px: 2, textAlign: "center" }}>
        <StorefrontIcon sx={{ fontSize: 72, mb: 2, opacity: 0.9 }} />
        <Typography variant="h3" fontWeight={800} gutterBottom>FakeStore Manager</Typography>
        <Typography variant="h6" sx={{ opacity: 0.85, maxWidth: 520, mx: "auto", mb: 4 }}>
          Plataforma de gestión de usuarios integrada con FakeStoreAPI
        </Typography>
        {isAuthenticated ? (
          <AppButton onClick={() => navigate("/users")} sx={{ bgcolor: "white", color: "#1a237e", "&:hover": { bgcolor: "#e8eaf6" }, px: 4, py: 1.5, fontSize: 16 }}>
            Ver Usuarios
          </AppButton>
        ) : (
          <AppButton onClick={() => navigate("/login")} sx={{ bgcolor: "white", color: "#1a237e", "&:hover": { bgcolor: "#e8eaf6" }, px: 4, py: 1.5, fontSize: 16 }}>
            Iniciar Sesión
          </AppButton>
        )}
      </Box>
    </Box>
  );
};

export default Home;
