import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Datos de ejemplo
const proveedores = [
  { id: 1, nombre: "Papelería Andes", contacto: "Andrés Gómez", telefono: "3201234567" },
  { id: 2, nombre: "Distribuidora ABC", contacto: "María López", telefono: "3109876543" },
  { id: 3, nombre: "Importadora XYZ", contacto: "Carlos Ruiz", telefono: "3014567890" },
];

const productos = [
  { id: 101, nombre: "Cuaderno A5", precio: 4500, stock: 120 },
  { id: 102, nombre: "Esfero Azul", precio: 1200, stock: 300 },
  { id: 103, nombre: "Resma Papel Carta", precio: 18000, stock: 50 },
];

function Exportar() {
  const [tipo, setTipo] = useState("proveedores");

  // Obtener datos según selección
  const getData = () => {
    return tipo === "proveedores" ? proveedores : productos;
  };

  // Exportar a Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(getData());
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, tipo);
    XLSX.writeFile(workbook, `${tipo}.xlsx`);
  };

  // Exportar a PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(`Lista de ${tipo}`, 14, 15);

    if (tipo === "proveedores") {
      doc.autoTable({
        startY: 25,
        head: [["ID", "Nombre", "Contacto", "Teléfono"]],
        body: proveedores.map((p) => [p.id, p.nombre, p.contacto, p.telefono]),
      });
    } else {
      doc.autoTable({
        startY: 25,
        head: [["ID", "Nombre", "Precio", "Stock"]],
        body: productos.map((p) => [p.id, p.nombre, p.precio, p.stock]),
      });
    }

    doc.save(`${tipo}.pdf`);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Exportar Datos
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Selecciona tipo de datos</InputLabel>
        <Select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <MenuItem value="proveedores">Proveedores</MenuItem>
          <MenuItem value="productos">Productos</MenuItem>
        </Select>
      </FormControl>

      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="success" onClick={exportToExcel}>
          Exportar Excel
        </Button>
        <Button variant="contained" color="error" onClick={exportToPDF}>
          Exportar PDF
        </Button>
      </Stack>
    </Box>
  );
}

export default Exportar;
