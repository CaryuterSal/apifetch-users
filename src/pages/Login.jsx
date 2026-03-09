import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import { loginService } from "../services/userService";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const validate = (form) => {
  const errs = {};
  if (!form.username) errs.username = "El usuario es requerido";
  if (!form.password) errs.password = "La contraseña es requerida";
  return errs;
};

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
    setApiError("");
  };

  const handleSubmit = async () => {
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const { data } = await loginService(form.username, form.password);
      login(data.token);
      Swal.fire({ icon: "success", title: "¡Bienvenido!", text: `Sesión iniciada como ${form.username}`, confirmButtonColor: "#1a237e", timer: 1800, showConfirmButton: false });
      setTimeout(() => navigate("/users"), 1800);
    } catch {
      setApiError("Credenciales incorrectas. Intenta con mor_2314 / 83r5^_");
    } finally { setLoading(false); }
  };

  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(160deg, #e8eaf6 0%, #f3f4fb 100%)", px: 2 }}>
      <Paper elevation={4} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, width: "100%", maxWidth: 420 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
          <Avatar sx={{ bgcolor: "#1a237e", width: 56, height: 56, mb: 2 }}>
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          <Typography variant="h5" fontWeight={800}>Iniciar Sesión</Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>Ingresa tus credenciales para continuar</Typography>
        </Box>

        {apiError && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{apiError}</Alert>}

        <AppInput name="username" label="Usuario" value={form.username} onChange={handleChange} error={errors.username} helperText={errors.username} required autoComplete="username" />
        <AppInput name="password" label="Contraseña" type="password" value={form.password} onChange={handleChange} error={errors.password} helperText={errors.password} required autoComplete="current-password" />

        <AppButton fullWidth onClick={handleSubmit} disabled={loading} sx={{ mt: 1, py: 1.3, fontSize: 16 }}>
          {loading ? "Ingresando..." : "Entrar"}
        </AppButton>

        <Box sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
          <Typography variant="caption" color="text.secondary" display="block">
            💡 <strong>Demo:</strong> usuario: <code>mor_2314</code> / contraseña: <code>83r5^_</code>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
