import React, { useState } from "react";
import { supabase } from "../Services/supabaseClient"; // Asegúrate de tener configurado tu cliente
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";

export default function RegistrarProveedor() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    direccion: "",
  });

  const [alerta, setAlerta] = useState({
    open: false,
    mensaje: "",
    tipo: "success", // success | error
  });

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
      setAlerta({
        open: true,
        mensaje: " Error al registrar: " + error.message,
        tipo: "error",
      });
    } else {
      setAlerta({
        open: true,
        mensaje: "Proveedor registrado con éxito",
        tipo: "success",
      });
      setFormData({
        nombre: "",
        telefono: "",
        correo: "",
        direccion: "",
      });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom align="center">
          Registrar Proveedor
        </Typography>

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

      {/* Snackbar de notificación */}
      <Snackbar
        open={alerta.open}
        autoHideDuration={4000}
        onClose={() => setAlerta({ ...alerta, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlerta({ ...alerta, open: false })}
          severity={alerta.tipo}
          sx={{ width: "100%" }}
        >
          {alerta.mensaje}
        </Alert>
      </Snackbar>
    </Box>
  );
}
