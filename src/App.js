// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MenuPrincipal from './Pages/MenuPrincipal.jsx';  
import Navbar from './Components/NavBar';
import { Box } from '@mui/material';
import VerProductos from './Pages/VerProductos.jsx';
import RegistrarProductos from './Pages/RegistrarProductos.jsx';
import EntradasSalidas from './Pages/EntradasSalidas.jsx';
import Exportar from './Pages/Exportar.jsx';
import Proveedores from './Pages/Proveedores.jsx';
import Historial from './Pages/Historial.jsx';
import RegistrarEntradas from './Pages/RegistrarEntradas.jsx';

const drawerWidthOpen = 240;
const drawerWidthClosed = 70;

function App() {
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
       
        <Navbar open={drawerOpen} setOpen={setDrawerOpen} />

        {/* Contenido principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: drawerOpen ? `${drawerWidthOpen}px` : `${drawerWidthClosed}px`,
            transition: 'margin 0.3s',
          }}
        >
          <Routes>
            <Route path="/" element={<MenuPrincipal />} />
            <Route path="/Productos" element={<VerProductos />} />
            <Route path="/RegistrarProducto" element={<RegistrarProductos />} />
            <Route path="/Entradas" element={<EntradasSalidas />} />
            <Route path="/RegistrarEntrada" element={<RegistrarEntradas />} />
            <Route path="/Exportar" element={<Exportar />} />
            <Route path="/Proveedores" element={<Proveedores />} />
            <Route path="/Historial" element={<Historial />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
