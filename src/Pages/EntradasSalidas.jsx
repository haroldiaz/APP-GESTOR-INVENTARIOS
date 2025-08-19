import React from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function EntradasSalidas() {
  // Datos de ejemplo (dummy)
  const rows = [
    { id: 1, nombre: "Producto A", cantidad: 50, tipo: "Entrada" },
    { id: 2, nombre: "Producto B", cantidad: 20, tipo: "Salida" },
    { id: 3, nombre: "Producto C", cantidad: 10, tipo: "Entrada" },
  ];

  return (
    <Box p={3}>
      {/* Título */}
      <Typography variant="h5" gutterBottom>
        Entradas y Salidas de Inventario
      </Typography>

      {/* Botón agregar */}
      <Stack direction="row" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary">
          Agregar Producto
        </Button>
      </Stack>

      {/* Tabla */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.cantidad}</TableCell>
                <TableCell>{row.tipo}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default EntradasSalidas;
