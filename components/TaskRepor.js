'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReporteDeTareas = () => {
  const [tareas, setTareas] = useState([]); // Estado para almacenar la lista de tareas
  const [loading, setLoading] = useState(true); // Estado para manejar el cargado de datos
  const [error, setError] = useState(null); // Estado para manejar errores

  // Función para obtener las tareas desde la API
  const obtenerTareas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tareas');
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

  return (
    <div style={{ padding: '20px' }}>
      <h2>Reporte de Tareas</h2>
      {loading ? (
        <p>Cargando tareas...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
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
            {tareas.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>No hay tareas disponibles.</td>
              </tr>
            ) : (
              tareas.map((tarea) => (
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
      )}
    </div>
  );
};

export default ReporteDeTareas;
