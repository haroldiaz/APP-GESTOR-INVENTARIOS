import React, { useEffect, useState } from "react";
import { supabase } from "../Services/supabaseClient"; // Ajusta la ruta según tu proyecto
import { Box, Typography, Card, CardContent, Stack, CircularProgress } from "@mui/material";

export default function MenuPrincipal() {
  const [totalProductos, setTotalProductos] = useState(null);
  const [totalProveedores, setTotalProveedores] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotals = async () => {
      setLoading(true);

      // 🔹 Total de productos
      const { count: productosCount, error: productosError } = await supabase
        .from("Producto")
        .select("*", { count: "exact", head: true }); // 👈 Solo cuenta filas

      if (productosError) {
        console.error("Error al contar productos:", productosError.message);
      } else {
        setTotalProductos(productosCount);
      }

      // 🔹 Total de proveedores
      const { count: proveedoresCount, error: proveedoresError } = await supabase
        .from("Proveedor")
        .select("*", { count: "exact", head: true });

      if (proveedoresError) {
        console.error("Error al contar proveedores:", proveedoresError.message);
      } else {
        setTotalProveedores(proveedoresCount);
      }

      setLoading(false);
    };

    fetchTotals();
  }, []);

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

        {loading ? (
          <CircularProgress />
        ) : (
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
        )}
      </Box>
    </Box>
  );
}
