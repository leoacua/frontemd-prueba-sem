// components/TaskList.js
'use client';

import React from 'react';
import axios from 'axios';

const TaskList = ({ tasks = [], onTaskUpdate }) => {
  // Función para eliminar una tarea
  const onDelete = async (id) => {
    try {
      // Hacer una solicitud DELETE a la API para eliminar la tarea
      await axios.delete(`http://localhost:5000/api/tareas/${id}`);
      alert('Tarea eliminada correctamente');
      // Actualizar la lista de tareas después de eliminar
      if (onTaskUpdate) onTaskUpdate();
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      alert('Error al eliminar la tarea');
    }
  };

  // Función para editar una tarea
  const onEdit = (task) => {
    // formulario para editar la tarea
    // redirigir a una vista de edición con los datos de la tarea seleccionada
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
      // Hacer una solicitud PUT a la API para actualizar la tarea
      await axios.put(`http://localhost:5000/api/tareas/${id}`, updatedTask);
      alert('Tarea actualizada correctamente');
      // Actualizar la lista de tareas después de editar
      if (onTaskUpdate) onTaskUpdate();
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      alert('Error al actualizar la tarea');
    }
  };

  return (
    <div>
      {tasks.length === 0 ? (
        <p>No hay tareas disponibles.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ddd' }}>
              <h3>{task.titulo}</h3>
              <p>Descripción: {task.descripcion}</p>
              <p>Prioridad: {task.prioridad}</p>
              <p>Asignado a: {task.asignadoA}</p>
              <p>Estado: {task.estado}</p>
              <p>Fecha Inicial: {task.creadoEn}</p>
              <p>Fecha Límite: {task.fechaLimite}</p>
              <button onClick={() => onDelete(task._id)} style={{ cursor: 'pointer', color: 'red', marginRight: '10px' }}>
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
  );
};

export default TaskList;

