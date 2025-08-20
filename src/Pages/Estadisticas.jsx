import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

// Datos de ejemplo
const dataProductos = [
  { categoria: "Papelería", cantidad: 120 },
  { categoria: "Tecnología", cantidad: 80 },
  { categoria: "Limpieza", cantidad: 60 },
];

const dataProveedores = [
  { ciudad: "Bogotá", total: 5 },
  { ciudad: "Medellín", total: 3 },
  { ciudad: "Cali", total: 2 },
];

const dataEntradas = [
  { mes: "Ene", entradas: 40 },
  { mes: "Feb", entradas: 55 },
  { mes: "Mar", entradas: 30 },
  { mes: "Abr", entradas: 75 },
];

const dataTopProductos = [
  { nombre: "Cuaderno", cantidad: 50 },
  { nombre: "Bolígrafo", cantidad: 70 },
  { nombre: "Laptop", cantidad: 20 },
  { nombre: "Carpeta", cantidad: 35 },
  { nombre: "Mouse", cantidad: 40 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function Estadisticas() {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Estadísticas Generales
      </Typography>

      <Grid container spacing={3}>
        {/* Productos por categoría */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Productos por Categoría
            </Typography>
            <BarChart width={400} height={250} data={dataProductos}>
              <XAxis dataKey="categoria" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#1976d2" />
            </BarChart>
          </Paper>
        </Grid>

        {/* Proveedores por ciudad */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Proveedores por Ciudad
            </Typography>
            <PieChart width={400} height={250}>
              <Pie
                data={dataProveedores}
                dataKey="total"
                nameKey="ciudad"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {dataProveedores.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Paper>
        </Grid>

        {/* Entradas mensuales */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Entradas por Mes
            </Typography>
            <LineChart width={400} height={250} data={dataEntradas}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="entradas" stroke="#82ca9d" />
            </LineChart>
          </Paper>
        </Grid>

        {/* Top productos */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Top 5 Productos
            </Typography>
            <BarChart width={400} height={250} data={dataTopProductos}>
              <XAxis dataKey="nombre" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#ff5722" />
            </BarChart>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Estadisticas;
