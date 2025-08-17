import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Stack,
  Alert
} from '@mui/material';

// Importa el cliente de supabase
import { supabase } from '../Services/supabaseClient';

export default function RegistrarProductos({ onRegistrar }) {
  const [producto, setProducto] = useState({
    nombre: '',
    cantidad: '',
    precio: '',
    proveedor: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // para estado de conexión

  useEffect(() => {
    const checkConnection = async () => {
      const { error } = await supabase.from('Producto').select('*').limit(1);
      if (error) {
        console.error('Error conexión Supabase:', error.message);
        setStatus('error');
      } else {
        setStatus('ok');
      }
    };
    checkConnection();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Insertar en Supabase
    const { data, error } = await supabase
      .from('Producto')
      .insert([
        {
          nombre: producto.nombre,
          cantidad: Number(producto.cantidad),
          precio: Number(producto.precio),
          proveedor: producto.proveedor
        }
      ]);

    setLoading(false);

    if (error) {
      console.error('Error al registrar producto:', error.message);
      alert('❌ Hubo un error al guardar el producto.');
    } else {
      alert('✅ Producto registrado correctamente en Supabase.');
      if (onRegistrar) {
        onRegistrar(data[0]); // pasar el producto insertado al padre
      }
      // Reiniciar formulario
      setProducto({ nombre: '', cantidad: '', precio: '', proveedor: '' });
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto' }} elevation={3}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Registrar Producto
        </Typography>

        {status === 'ok' && (
          <Alert severity="success" sx={{ mb: 2 }}>
            ✅ Conectado a Supabase
          </Alert>
        )}
        {status === 'error' && (
          <Alert severity="error" sx={{ mb: 2 }}>
            ❌ Error de conexión con Supabase
          </Alert>
        )}

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

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
