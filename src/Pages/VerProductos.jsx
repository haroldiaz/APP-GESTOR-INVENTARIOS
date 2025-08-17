import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// 5 objetos de ejemplo
const sampleRows = [
  { id: 1, nombre: 'Cuaderno A5', cantidad: 120, precio: 4500, proveedor: 'Papelería Andes' },
  { id: 2, nombre: 'Bolígrafo Azul', cantidad: 300, precio: 1200, proveedor: 'OfiPro SAS' },
  { id: 3, nombre: 'Carpeta Plástica', cantidad: 80, precio: 3500, proveedor: 'Distribuciones Norte' },
  { id: 4, nombre: 'Resma Carta 75g', cantidad: 40, precio: 18500, proveedor: 'TecnoPapeles' },
  { id: 5, nombre: 'Grapadora Metálica', cantidad: 25, precio: 32000, proveedor: 'Suministros Pro' },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);

// Componente principal
export default function VerProductos({ titulo = 'Inventario — Productos' }) {
  const [rows, setRows] = useState(sampleRows);

  const handleDelete = (id) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const handleEdit = (id) => {
    const producto = rows.find((row) => row.id === id);
    alert(`Editar producto: ${producto.nombre}`);
    // Aquí podrías abrir un modal o formulario de edición
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {titulo}
      </Typography>

      <TableContainer component={Paper} elevation={2}>
        <Table size="small" aria-label="tabla de productos">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '12px', fontWeight: 700 }}>Nombre</TableCell>
              <TableCell align="right" sx={{ fontSize: '12px', fontWeight: 700 }}>Cantidad</TableCell>
              <TableCell align="right" sx={{ fontSize: '12px', fontWeight: 700 }}>Precio</TableCell>
              <TableCell sx={{ fontSize: '12px', fontWeight: 700 }}>Proveedor</TableCell>
              <TableCell sx={{ fontSize: '12px', fontWeight: 700 }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell sx={{ fontSize: '12px' }}>{row.nombre}</TableCell>
                <TableCell align="right" sx={{ fontSize: '12px' }}>{row.cantidad}</TableCell>
                <TableCell align="right" sx={{ fontSize: '12px' }}>{formatCurrency(row.precio)}</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>
                  <Chip label={row.proveedor} size="small" variant="outlined" />
                </TableCell>
                <TableCell sx={{ fontSize: '12px' }}>
                  <Tooltip title="Editar">
                    <IconButton size="small" color="primary" onClick={() => handleEdit(row.id)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}