'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReporteDeTareas = () => {
  const [tareas, setTareas] = useState([]); // Estado para almacenar la lista de tareas
  const [loading, setLoading] = useState(true); // Estado para manejar el cargado de datos
  const [error, setError] = useState(null); // Estado para manejar errores
  const [fechaInicio, setFechaInicio] = useState(''); // Estado para la fecha de inicio del filtro
  const [fechaFin, setFechaFin] = useState(''); // Estado para la fecha de fin del filtro
  const [estado, setEstado] = useState(''); // Estado para el estado del filtro

  // Función para obtener las tareas desde la API
  const obtenerTareas = async () => {
    try {
      const response = await axios.get('https://backend-sempx.vercel.app/api/tareas');
      setTareas(response.data); // Almacenar las tareas en el estado
      setLoading(false); // Desactivar el estado de cargado
    } catch (err) {
      console.error('Error al obtener las tareas:', err);
      setError('Error al cargar las tareas. Intenta nuevamente.');
      setLoading(false); // Desactivar el estado de cargado en caso de error
    }
  };

  // Llamar a la función obtenerTareas cuando el componente se monte
  useEffect(() => {
    obtenerTareas();
  }, []);

  // Función para aplicar los filtros
  const aplicarFiltros = () => {
    return tareas.filter((tarea) => {
      const fechaCreacion = new Date(tarea.creadoEn).getTime();
      const fechaLimite = new Date(tarea.fechaLimite).getTime();
      const fechaInicioFiltro = fechaInicio ? new Date(fechaInicio).getTime() : null;
      const fechaFinFiltro = fechaFin ? new Date(fechaFin).getTime() : null;

      // Filtro por fechas
      const cumpleFechaInicio = fechaInicioFiltro ? fechaCreacion >= fechaInicioFiltro : true;
      const cumpleFechaFin = fechaFinFiltro ? fechaLimite <= fechaFinFiltro : true;

      // Filtro por estado
      const cumpleEstado = estado ? tarea.estado === estado : true;

      return cumpleFechaInicio && cumpleFechaFin && cumpleEstado;
    });
  };

  // Tareas filtradas con base en los filtros aplicados
  const tareasFiltradas = aplicarFiltros();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Reporte de Tareas</h2>

      {/* Barra superior con filtros */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <label>Fecha de Inicio: </label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            style={{ padding: '5px', marginRight: '10px' }}
          />
          <label>Fecha de Fin: </label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            style={{ padding: '5px', marginRight: '10px' }}
          />
          <label>Estado: </label>
          <select value={estado} onChange={(e) => setEstado(e.target.value)} style={{ padding: '5px' }}>
            <option value="">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Progreso">En Progreso</option>
            <option value="Completada">Completada</option>
          </select>
        </div>
      </div>

      {/* Tabla con resultados y desplazamiento */}
      {loading ? (
        <p>Cargando tareas...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div style={{ maxHeight: '400px', overflowY: 'scroll', border: '1px solid #ddd', padding: '10px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '10px' }}>Título</th>
                <th style={{ border: '1px solid #ddd', padding: '10px' }}>Fecha de Creación</th>
                <th style={{ border: '1px solid #ddd', padding: '10px' }}>Fecha Límite</th>
                <th style={{ border: '1px solid #ddd', padding: '10px' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {tareasFiltradas.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>No hay tareas disponibles.</td>
                </tr>
              ) : (
                tareasFiltradas.map((tarea) => (
                  <tr key={tarea._id}>
                    <td style={{ border: '1px solid #ddd', padding: '10px' }}>{tarea.titulo}</td>
                    <td style={{ border: '1px solid #ddd', padding: '10px' }}>{new Date(tarea.creadoEn).toLocaleDateString()}</td>
                    <td style={{ border: '1px solid #ddd', padding: '10px' }}>{new Date(tarea.fechaLimite).toLocaleDateString()}</td>
                    <td style={{ border: '1px solid #ddd', padding: '10px' }}>{tarea.estado}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReporteDeTareas;
