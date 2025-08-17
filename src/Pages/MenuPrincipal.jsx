import React from "react";
import { Box, Button, Typography, Stack, Paper } from "@mui/material";

export default function MenuPrincipal() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f4f6f8"
    >
      <Paper
        elevation={6}
        sx={{ p: 5, borderRadius: 3, textAlign: "center", minWidth: 300 }}
      >
        <Typography variant="h4" gutterBottom>
          📦 Inventario
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Menú Principal
        </Typography>

        <Stack spacing={2} mt={3}>
          <Button variant="contained" color="primary" fullWidth>
            Productos
          </Button>
          <Button variant="contained" color="secondary" fullWidth>
            Categorías
          </Button>
          <Button variant="contained" color="success" fullWidth>
            Proveedores
          </Button>
          <Button variant="contained" color="warning" fullWidth>
            Movimientos
          </Button>
          <Button variant="contained" color="info" fullWidth>
            Reportes
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
