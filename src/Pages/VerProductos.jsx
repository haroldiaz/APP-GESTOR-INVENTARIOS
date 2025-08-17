// src/components/VerProductos.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { supabase } from "../Services/supabaseClient"; // tu cliente ya creado

const formatCurrency = (value) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);

export default function VerProductos() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para edición
  const [editOpen, setEditOpen] = useState(false);
  const [productoEdit, setProductoEdit] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("Producto").select("*");
    if (error) {
      console.error("Error cargando productos:", error.message);
    } else {
      setRows(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;

    const { error } = await supabase.from("Producto").delete().eq("id", id);
    if (error) {
      alert("Error eliminando: " + error.message);
    } else {
      alert("✅ Producto eliminado");
      setRows((prev) => prev.filter((row) => row.id !== id));
    }
  };

  const handleEdit = (producto) => {
    setProductoEdit({ ...producto });
    setEditOpen(true);
  };

  const handleSaveEdit = async () => {
    if (
      !window.confirm("¿Seguro que deseas guardar los cambios de este producto?")
    )
      return;

    const { error } = await supabase
      .from("Producto")
      .update({
        nombre: productoEdit.nombre,
        cantidad: productoEdit.cantidad,
        precio: productoEdit.precio,
        proveedor: productoEdit.proveedor,
      })
      .eq("id", productoEdit.id);

    if (error) {
      alert("Error editando: " + error.message);
    } else {
      alert("✅ Producto actualizado");
      setRows((prev) =>
        prev.map((row) =>
          row.id === productoEdit.id ? { ...productoEdit } : row
        )
      );
      setEditOpen(false);
    }
  };

  if (loading) return <p>Cargando productos...</p>;

  return (
    <Box sx={{ p: 2 }}>
      <TableContainer component={Paper} elevation={2}>
        <Table size="small" aria-label="tabla de productos">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "12px", fontWeight: 700 }}>
                Nombre
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontSize: "12px", fontWeight: 700 }}
              >
                Cantidad
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontSize: "12px", fontWeight: 700 }}
              >
                Precio
              </TableCell>
              <TableCell sx={{ fontSize: "12px", fontWeight: 700 }}>
                Proveedor
              </TableCell>
              <TableCell sx={{ fontSize: "12px", fontWeight: 700 }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell sx={{ fontSize: "12px" }}>{row.nombre}</TableCell>
                <TableCell align="right" sx={{ fontSize: "12px" }}>
                  {row.cantidad}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: "12px" }}>
                  {formatCurrency(row.precio)}
                </TableCell>
                <TableCell sx={{ fontSize: "12px" }}>
                  <Chip label={row.proveedor} size="small" variant="outlined" />
                </TableCell>
                <TableCell sx={{ fontSize: "12px" }}>
                  <Tooltip title="Editar">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEdit(row)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(row.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal edición */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Editar Producto</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            fullWidth
            margin="dense"
            value={productoEdit?.nombre || ""}
            onChange={(e) =>
              setProductoEdit((prev) => ({ ...prev, nombre: e.target.value }))
            }
          />
          <TextField
            label="Cantidad"
            type="number"
            fullWidth
            margin="dense"
            value={productoEdit?.cantidad || ""}
            onChange={(e) =>
              setProductoEdit((prev) => ({
                ...prev,
                cantidad: Number(e.target.value),
              }))
            }
          />
          <TextField
            label="Precio"
            type="number"
            fullWidth
            margin="dense"
            value={productoEdit?.precio || ""}
            onChange={(e) =>
              setProductoEdit((prev) => ({
                ...prev,
                precio: Number(e.target.value),
              }))
            }
          />
          <TextField
            label="Proveedor"
            fullWidth
            margin="dense"
            value={productoEdit?.proveedor || ""}
            onChange={(e) =>
              setProductoEdit((prev) => ({
                ...prev,
                proveedor: e.target.value,
              }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancelar</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
