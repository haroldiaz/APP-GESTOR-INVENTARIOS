import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { supabase } from "../Services/supabaseClient"; // ajusta la ruta según tu proyecto

function RegistrarEntradas() {
  const [formData, setFormData] = useState({
    producto: "",
    cantidad: "",
    tipo: "",
    fecha: "",
    tipo_producto: "",
    proveedor: "",
    motivo: "",
  });

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Estado para mostrar mensajes
  const [alerta, setAlerta] = useState({
    open: false,
    mensaje: "",
    tipo: "success", // success | error | info | warning
  });

  // 🔹 Traer productos desde Supabase
  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase
        .from("Producto")
        .select("id, nombre");

      if (error) {
        console.error("Error al traer productos:", error.message);
      } else {
        setProductos(data);
      }
    };

    fetchProductos();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("Entrada").insert([
      {
        producto: formData.producto,
        cantidad: parseInt(formData.cantidad, 10),
        tipo: formData.tipo,
        fecha: formData.fecha,
        tipo_producto: formData.tipo_producto,
        proveedor: formData.proveedor,
        motivo: formData.motivo,
      },
    ]);

    if (error) {
      setAlerta({
        open: true,
        mensaje: "❌ Error al registrar: " + error.message,
        tipo: "error",
      });
    } else {
      setAlerta({
        open: true,
        mensaje: "✅ Registro exitoso",
        tipo: "success",
      });
      setFormData({
        producto: "",
        cantidad: "",
        tipo: "",
        fecha: "",
        tipo_producto: "",
        proveedor: "",
        motivo: "",
      });
    }

    setLoading(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 450, mx: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom align="center">
        Registrar Entrada / Salida
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {/* Producto */}
          <TextField
            select
            label="Producto"
            name="producto"
            value={formData.producto}
            onChange={handleChange}
            fullWidth
            required
          >
            {productos.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.nombre}
              </MenuItem>
            ))}
          </TextField>

          {/* Cantidad */}
          <TextField
            label="Cantidad"
            name="cantidad"
            type="number"
            value={formData.cantidad}
            onChange={handleChange}
            fullWidth
            required
          />

          {/* Tipo */}
          <TextField
            label="Tipo"
            name="tipo"
            select
            value={formData.tipo}
            onChange={handleChange}
            fullWidth
            required
          >
            <MenuItem value="entrada">Entrada</MenuItem>
            <MenuItem value="salida">Salida</MenuItem>
          </TextField>

          {/* Fecha */}
          <TextField
            label="Fecha"
            name="fecha"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.fecha}
            onChange={handleChange}
            fullWidth
            required
          />

          {/* Tipo de producto */}
          <TextField
            label="Tipo de Producto"
            name="tipo_producto"
            value={formData.tipo_producto}
            onChange={handleChange}
            fullWidth
          />

          {/* Proveedor */}
          <TextField
            label="Proveedor"
            name="proveedor"
            value={formData.proveedor}
            onChange={handleChange}
            fullWidth
          />

          {/* Motivo */}
          <TextField
            label="Motivo"
            name="motivo"
            value={formData.motivo}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />

          {/* Botón */}
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Guardando..." : "Registrar"}
          </Button>
        </Stack>
      </Box>

      {/* Snackbar para mostrar mensajes */}
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
    </Paper>
  );
}

export default RegistrarEntradas;
