import React from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Chip,
} from "@mui/material";

// Datos de ejemplo
const movimientos = [
  { id: 1, tipo: "Entrada", producto: "Cuaderno A5", cantidad: 50, fecha: "2025-08-10" },
  { id: 2, tipo: "Salida", producto: "Cuaderno A5", cantidad: 10, fecha: "2025-08-12" },
  { id: 3, tipo: "Entrada", producto: "Resma Papel Carta", cantidad: 20, fecha: "2025-08-15" },
  { id: 4, tipo: "Salida", producto: "Esfero Azul", cantidad: 15, fecha: "2025-08-17" },
];

function Historial() {
  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Historial de Movimientos
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movimientos.map((mov) => (
              <TableRow key={mov.id}>
                <TableCell>{mov.id}</TableCell>
                <TableCell>
                  <Chip
                    label={mov.tipo}
                    color={mov.tipo === "Entrada" ? "success" : "error"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{mov.producto}</TableCell>
                <TableCell>{mov.cantidad}</TableCell>
                <TableCell>{mov.fecha}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Historial;
