import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import AppButton from "../components/AppButton";
import { getUserById } from "../services/userService";
import Swal from "sweetalert2";

const InfoRow = ({ icon, label, value }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1 }}>
    <Box sx={{ color: "#1a237e", opacity: 0.7 }}>{icon}</Box>
    <Box>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
      <Typography variant="body2" fontWeight={600}>{value || "—"}</Typography>
    </Box>
  </Box>
);

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getUserById(id);
        setUser(data);
      } catch {
        Swal.fire({ icon: "error", title: "Error", text: "No se pudo cargar el usuario.", confirmButtonColor: "#d32f2f" });
        navigate("/users");
      } finally { setLoading(false); }
    };
    fetch();
  }, [id]);

  if (loading) return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <CircularProgress sx={{ color: "#1a237e" }} />
    </Box>
  );

  if (!user) return null;

  const initials = `${user.name?.firstname?.[0] || ""}${user.name?.lastname?.[0] || ""}`.toUpperCase();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <AppButton variant="text" startIcon={<ArrowBackIcon />} onClick={() => navigate("/users")} sx={{ mb: 2, color: "#1a237e" }}>
        Volver a usuarios
      </AppButton>

      <Paper elevation={3} sx={{ borderRadius: 4, overflow: "hidden" }}>
        {/* Header */}
        <Box sx={{ background: "linear-gradient(135deg, #1a237e, #3949ab)", p: 4, display: "flex", alignItems: "center", gap: 3 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: "rgba(255,255,255,0.2)", fontSize: 28, fontWeight: 800, border: "3px solid rgba(255,255,255,0.4)" }}>
            {initials}
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight={800} color="white">{user.name?.firstname} {user.name?.lastname}</Typography>
            <Chip label={`@${user.username}`} size="small" sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white", mt: 0.5, fontWeight: 600 }} />
          </Box>
          <Box sx={{ ml: "auto" }}>
            <Chip label={`ID: ${user.id}`} sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "white", fontWeight: 700, fontSize: 13 }} />
          </Box>
        </Box>

        <Box sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight={700} color="#1a237e" mb={1.5}>
                <PersonIcon sx={{ verticalAlign: "middle", mr: 0.5, fontSize: 20 }} />Información de Contacto
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <InfoRow icon={<EmailIcon />} label="Correo electrónico" value={user.email} />
              <InfoRow icon={<PhoneIcon />} label="Teléfono" value={user.phone} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight={700} color="#1a237e" mb={1.5}>
                <LocationOnIcon sx={{ verticalAlign: "middle", mr: 0.5, fontSize: 20 }} />Dirección
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <InfoRow icon={<LocationOnIcon />} label="Ciudad" value={user.address?.city} />
              <InfoRow icon={<LocationOnIcon />} label="Calle" value={`${user.address?.street} #${user.address?.number}`} />
              <InfoRow icon={<LocationOnIcon />} label="Código Postal" value={user.address?.zipcode} />
              <InfoRow icon={<LocationOnIcon />} label="Coordenadas" value={`${user.address?.geolocation?.lat}, ${user.address?.geolocation?.long}`} />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserDetail;
