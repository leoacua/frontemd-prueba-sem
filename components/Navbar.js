// components/Navbar.js
'use client'; // ← Esto indica que el componente es del cliente
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav style={{ padding: '20px', backgroundColor: '#0070f3', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
      <h2>Gestión de Tareas</h2>
      <div>
        <Link href="/tasks" style={{ margin: '0 15px', color: 'white' }}>Ver Lista de Tareas</Link>
        <Link href="/tasks/add" style={{ margin: '0 15px', color: 'white' }}>Ingresar Tarea</Link>
        <Link href="/tasks/report" style={{ margin: '0 15px', color: 'white' }}>Reporte de Tareas</Link>
      </div>
    </nav>
  );
};

export default Navbar;
