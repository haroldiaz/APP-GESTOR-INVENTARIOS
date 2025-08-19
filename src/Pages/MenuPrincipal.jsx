import React from "react";
import { Box, Typography, Card, CardContent, Stack } from "@mui/material";

export default function MenuPrincipal() {
  // Ejemplo de totales (luego puedes traerlos de tu BD)
  const totalProductos = 120;
  const totalProveedores = 15;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f4f6f8"
      p={2}
    >
      <Box textAlign="center" width="100%" maxWidth="800px">
        <Typography variant="h4" gutterBottom>
          📦 Inventario
        </Typography>
       

        {/* Cards de Totales */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          justifyContent="center"
          alignItems="stretch"
          mt={3}
        >
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6">Total Productos</Typography>
              <Typography variant="h4">{totalProductos}</Typography>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6">Total Proveedores</Typography>
              <Typography variant="h4">{totalProveedores}</Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}
