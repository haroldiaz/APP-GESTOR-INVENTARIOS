import React, { useEffect, useState } from "react";
import { supabase } from "../Services/supabaseClient"; // 👈 Ajusta la ruta según tu proyecto
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentProveedor, setCurrentProveedor] = useState(null);

  // 🔹 Traer proveedores desde Supabase
  const fetchProveedores = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Proveedor")
      .select("id, nombre, telefono, correo, direccion");

    if (error) {
      console.error("Error al traer proveedores:", error.message);
    } else {
      setProveedores(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  // 🔹 Eliminar proveedor
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este proveedor?")) return;

    const { error } = await supabase.from("Proveedor").delete().eq("id", id);

    if (error) {
      alert("Error al eliminar: " + error.message);
    } else {
      alert("Proveedor eliminado ✅");
      fetchProveedores();
    }
  };

  // 🔹 Abrir modal de edición
  const handleEdit = (proveedor) => {
    setCurrentProveedor(proveedor);
    setOpenEdit(true);
  };

  // 🔹 Guardar cambios al editar
  const handleSaveEdit = async () => {
    const { id, nombre, telefono, correo, direccion } = currentProveedor;

    const { error } = await supabase
      .from("Proveedor")
      .update({ nombre, telefono, correo, direccion })
      .eq("id", id);

    if (error) {
      alert("Error al actualizar: " + error.message);
    } else {
      alert("Proveedor actualizado ✅");
      setOpenEdit(false);
      fetchProveedores();
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Lista de Proveedores
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {proveedores.map((prov) => (
                <TableRow key={prov.id}>
                  <TableCell>{prov.id}</TableCell>
                  <TableCell>{prov.nombre}</TableCell>
                  <TableCell>{prov.telefono}</TableCell>
                  <TableCell>{prov.correo}</TableCell>
                  <TableCell>{prov.direccion}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={() => handleEdit(prov)}
                    >
                      Editar
                    </Button>
                    &nbsp;
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleDelete(prov.id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {proveedores.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No hay proveedores registrados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* 🔹 Modal de edición */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Editar Proveedor</DialogTitle>
        <DialogContent>
          {currentProveedor && (
            <>
              <TextField
                margin="dense"
                label="Nombre"
                fullWidth
                value={currentProveedor.nombre}
                onChange={(e) =>
                  setCurrentProveedor({
                    ...currentProveedor,
                    nombre: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Teléfono"
                fullWidth
                value={currentProveedor.telefono}
                onChange={(e) =>
                  setCurrentProveedor({
                    ...currentProveedor,
                    telefono: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Correo"
                fullWidth
                value={currentProveedor.correo}
                onChange={(e) =>
                  setCurrentProveedor({
                    ...currentProveedor,
                    correo: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Dirección"
                fullWidth
                value={currentProveedor.direccion}
                onChange={(e) =>
                  setCurrentProveedor({
                    ...currentProveedor,
                    direccion: e.target.value,
                  })
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleSaveEdit}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Proveedores;
