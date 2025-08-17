import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Stack
} from '@mui/material';

export default function RegistrarProductos({ onRegistrar }) {
  const [producto, setProducto] = useState({
    nombre: '',
    cantidad: '',
    precio: '',
    proveedor: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onRegistrar) {
      onRegistrar(producto);
    }
    setProducto({ nombre: '', cantidad: '', precio: '', proveedor: '' });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto' }} elevation={3}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Registrar Producto
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Nombre"
              name="nombre"
              value={producto.nombre}
              onChange={handleChange}
              required
              size="small"
            />
            <TextField
              label="Cantidad"
              name="cantidad"
              type="number"
              value={producto.cantidad}
              onChange={handleChange}
              required
              size="small"
            />
            <TextField
              label="Precio"
              name="precio"
              type="number"
              value={producto.precio}
              onChange={handleChange}
              required
              size="small"
            />
            <TextField
              label="Proveedor"
              name="proveedor"
              value={producto.proveedor}
              onChange={handleChange}
              required
              size="small"
            />

            <Button type="submit" variant="contained" color="primary">
              Guardar
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}