'use client';

import React, { useState } from 'react';
import axios from 'axios';

const TaskList = ({ tasks = [], onTaskUpdate }) => {
  // Estado para capturar el valor de búsqueda
  const [searchQuery, setSearchQuery] = useState('');
  // Estado para capturar la opción de filtro seleccionada
  const [filterOption, setFilterOption] = useState('titulo');

  // Función para eliminar una tarea
  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tareas/${id}`);
      alert('Tarea eliminada correctamente');
      if (onTaskUpdate) onTaskUpdate();
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      alert('Error al eliminar la tarea');
    }
  };

  // Función para editar una tarea
  const onEdit = (task) => {
    const tituloEditado = prompt('Editar título de la tarea:', task.titulo);
    if (tituloEditado !== null && tituloEditado.trim() !== '') {
      const descripcionEditada = prompt('Editar descripción de la tarea:', task.descripcion);
      if (descripcionEditada !== null && descripcionEditada.trim() !== '') {
        actualizarTarea(task._id, { titulo: tituloEditado, descripcion: descripcionEditada });
      }
    }
  };

  // Función para actualizar una tarea usando una solicitud PUT
  const actualizarTarea = async (id, updatedTask) => {
    try {
      await axios.put(`http://localhost:5000/api/tareas/${id}`, updatedTask);
      alert('Tarea actualizada correctamente');
      if (onTaskUpdate) onTaskUpdate();
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      alert('Error al actualizar la tarea');
    }
  };

  // Filtrar las tareas en función del valor de búsqueda y la opción seleccionada
  const filteredTasks = tasks.filter((task) => {
    if (filterOption === 'titulo') {
      return task.titulo.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (filterOption === 'descripcion') {
      return task.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (filterOption === 'asignadoA') {
      return task.asignadoA.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (filterOption === 'estado') {
      return task.estado.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (filterOption === 'prioridad') {
      return task.prioridad.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <div style={{ width: '80%', margin: '20px auto' }}>
      {/* Barra de búsqueda y select de filtro */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar tareas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
        />
        <select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          style={{ padding: '10px', width: '200px' }}
        >
          <option value="titulo">Título</option>
          <option value="descripcion">Descripción</option>
          <option value="asignadoA">Asignado a</option>
          <option value="estado">Estado</option>
          <option value="prioridad">Prioridad</option>
        </select>
      </div>

      {/* Contenedor con desplazamiento para las tareas filtradas */}
      <div style={{ maxHeight: '400px', overflowY: 'scroll', border: '1px solid #ddd', padding: '10px' }}>
        {filteredTasks.length === 0 ? (
          <p>No hay tareas disponibles que coincidan con la búsqueda.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredTasks.map((task) => (
              <li key={task._id} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ddd' }}>
                <h3>{task.titulo}</h3>
                <p>Descripción: {task.descripcion}</p>
                <p>Prioridad: {task.prioridad}</p>
                <p>Asignado a: {task.asignadoA}</p>
                <p>Estado: {task.estado}</p>
                <p>Fecha Inicial: {task.creadoEn}</p>
                <p>Fecha Límite: {task.fechaLimite}</p>
                <button
                  onClick={() => onDelete(task._id)}
                  style={{ cursor: 'pointer', color: 'red', marginRight: '10px' }}
                >
                  Eliminar
                </button>
                <button onClick={() => onEdit(task)} style={{ cursor: 'pointer', color: 'blue' }}>
                  Editar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;
