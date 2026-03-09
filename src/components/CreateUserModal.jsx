import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AppInput from "./AppInput";
import AppButton from "./AppButton";
import { createUser } from "../services/userService";
import Swal from "sweetalert2";

const initialForm = {
  id: 0,
  username: "",
  email: "",
  password: "",
};

const validate = (form) => {
  const errs = {};
  if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Email inválido";
  if (!form.username || form.username.length < 3) errs.username = "Mínimo 3 caracteres";
  if (!form.password || form.password.length < 4) errs.password = "Mínimo 4 caracteres";
  return errs;
};

const CreateUserModal = ({ open, onClose, onCreated }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const handleSubmit = async () => {
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await createUser(form);
      setForm(initialForm);
      onCreated();
      onClose();
      await Swal.fire({
        icon: "success",
        title: "¡Usuario creado!",
        text: "El usuario fue registrado correctamente.",
        confirmButtonColor: "#1a237e"
      });
    } catch {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el usuario.",
        confirmButtonColor: "#d32f2f"
      });
    } finally { setLoading(false); }
  };

  const field = (name, label, type = "text") => (
    <AppInput name={name} label={label} type={type} value={form[name]} onChange={handleChange} error={errors[name]} helperText={errors[name]} required />
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ background: "linear-gradient(135deg, #1a237e, #283593)", color: "white", fontWeight: 700 }}>
        Crear Nuevo Usuario
      </DialogTitle>
      <DialogContent sx={{ pt: 3, pb: 1 }}>
        <Typography variant="subtitle2" color="text.secondary" mb={1}>Información de cuenta</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {field("email", "Email", "email")}
          {field("username", "Usuario")}
          {field("password", "Contraseña", "password")}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <AppButton variant="outlined" color="inherit" onClick={onClose}>Cancelar</AppButton>
        <AppButton onClick={handleSubmit} disabled={loading}>
          {loading ? "Guardando..." : "Crear Usuario"}
        </AppButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserModal;
