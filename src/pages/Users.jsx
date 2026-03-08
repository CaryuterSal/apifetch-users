import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import PeopleIcon from "@mui/icons-material/People";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { getAllUsers, deleteUser } from "../services/userService";
import AppButton from "../components/AppButton";
import CreateUserModal from "../components/CreateUserModal";
import Swal from "sweetalert2";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await getAllUsers();
      setUsers(data);
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo cargar la lista de usuarios.", confirmButtonColor: "#d32f2f" });
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      icon: "warning", title: "¿Eliminar usuario?",
      text: `¿Estás seguro de eliminar a ${name}? Esta acción no se puede deshacer.`,
      showCancelButton: true, confirmButtonText: "Sí, eliminar", cancelButtonText: "Cancelar",
      confirmButtonColor: "#d32f2f", cancelButtonColor: "#6c757d",
    });
    if (!result.isConfirmed) return;
    try {
      await deleteUser(id);
      Swal.fire({ icon: "success", title: "Eliminado", text: "El usuario fue eliminado correctamente.", confirmButtonColor: "#1a237e", timer: 1800, showConfirmButton: false });
      setUsers((u) => u.filter((usr) => usr.id !== id));
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo eliminar el usuario.", confirmButtonColor: "#d32f2f" });
    }
  };

  const initials = (u) => `${u.name?.firstname?.[0] || ""}${u.name?.lastname?.[0] || ""}`.toUpperCase();

  const avatarColor = (id) => {
    const colors = ["#1a237e", "#283593", "#0d47a1", "#1565c0", "#1976d2", "#1e88e5", "#42a5f5", "#0288d1", "#0097a7", "#00838f"];
    return colors[id % colors.length];
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <PeopleIcon sx={{ fontSize: 32, color: "#1a237e" }} />
          <Box>
            <Typography variant="h5" fontWeight={800} color="#1a237e">Usuarios</Typography>
            <Typography variant="body2" color="text.secondary">{users.length} usuarios registrados</Typography>
          </Box>
        </Box>
        <AppButton startIcon={<PersonAddIcon />} onClick={() => setModalOpen(true)}>
          Nuevo Usuario
        </AppButton>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress sx={{ color: "#1a237e" }} />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "linear-gradient(135deg, #1a237e, #283593)" }}>
                {["#", "Usuario", "Nombre", "Email", "Teléfono", "Ciudad", "Acciones"].map((h) => (
                  <TableCell key={h} sx={{ color: "white", fontWeight: 700, fontSize: 13 }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, idx) => (
                <TableRow key={user.id} hover sx={{ "&:nth-of-type(even)": { bgcolor: "#f5f7ff" } }}>
                  <TableCell sx={{ color: "text.secondary", fontSize: 13 }}>{idx + 1}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Avatar sx={{ width: 34, height: 34, bgcolor: avatarColor(user.id), fontSize: 13, fontWeight: 700 }}>{initials(user)}</Avatar>
                      <Typography variant="body2" fontWeight={600}>{user.username}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{user.name?.firstname} {user.name?.lastname}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={user.email} size="small" variant="outlined" sx={{ fontSize: 11, maxWidth: 200, overflow: "hidden" }} />
                  </TableCell>
                  <TableCell><Typography variant="body2" fontSize={12}>{user.phone}</Typography></TableCell>
                  <TableCell><Typography variant="body2" fontSize={12}>{user.address?.city}</Typography></TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <Tooltip title="Ver detalles">
                        <IconButton size="small" onClick={() => navigate(`/users/${user.id}`)} sx={{ color: "#1a237e", bgcolor: "#e8eaf6", "&:hover": { bgcolor: "#c5cae9" } }}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton size="small" onClick={() => handleDelete(user.id, `${user.name?.firstname} ${user.name?.lastname}`)} sx={{ color: "#d32f2f", bgcolor: "#ffebee", "&:hover": { bgcolor: "#ffcdd2" } }}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <CreateUserModal open={modalOpen} onClose={() => setModalOpen(false)} onCreated={fetchUsers} />
    </Container>
  );
};

export default Users;
