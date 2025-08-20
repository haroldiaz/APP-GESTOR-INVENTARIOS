import React, { useState } from "react";
import { supabase } from "../Services/supabaseClient"; // Asegúrate de tener configurado tu cliente
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  Alert,
} from "@mui/material";

export default function RegistrarProveedor() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    direccion: "",
  });

  const [mensaje, setMensaje] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("Proveedor").insert([formData]);

    if (error) {
      setMensaje({ tipo: "error", texto: "Error al registrar: " + error.message });
    } else {
      setMensaje({ tipo: "success", texto: "Proveedor registrado con éxito ✅" });
      setFormData({
        nombre: "",
        telefono: "",
        correo: "",
        direccion: "",
      });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom align="center">
          Registrar Proveedor
        </Typography>

        {mensaje && (
          <Alert severity={mensaje.tipo} sx={{ mb: 2 }}>
            {mensaje.texto}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Teléfono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Correo"
              name="correo"
              type="email"
              value={formData.correo}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Dirección"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
              fullWidth
            />

            <Button variant="contained" type="submit" fullWidth>
              Guardar
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
