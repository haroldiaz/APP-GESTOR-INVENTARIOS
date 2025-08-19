import React from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Button,
} from "@mui/material";

const proveedores = [
  { id: 1, nombre: "Papelería Andes", contacto: "Andrés Gómez", telefono: "3201234567" },
  { id: 2, nombre: "Distribuidora ABC", contacto: "María López", telefono: "3109876543" },
  { id: 3, nombre: "Importadora XYZ", contacto: "Carlos Ruiz", telefono: "3014567890" },
];

function Proveedores() {
  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Lista de Proveedores
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Contacto</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proveedores.map((prov) => (
              <TableRow key={prov.id}>
                <TableCell>{prov.id}</TableCell>
                <TableCell>{prov.nombre}</TableCell>
                <TableCell>{prov.contacto}</TableCell>
                <TableCell>{prov.telefono}</TableCell>
                <TableCell>
                  <Button variant="contained" size="small" color="primary">
                    Editar
                  </Button>
                  &nbsp;
                  <Button variant="outlined" size="small" color="error">
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Proveedores;
