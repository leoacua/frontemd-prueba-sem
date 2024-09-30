'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // Estado para almacenar la lista de tareas
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de tareas
  const [searchQuery, setSearchQuery] = useState(''); // Estado para capturar el valor de búsqueda
  const [filterOption, setFilterOption] = useState('titulo'); // Estado para capturar la opción de filtro seleccionada
  const [estadoTarea, setEstadoTarea] = useState({}); // Estado para manejar el estado seleccionado de cada tarea

  // Función para obtener las tareas desde la API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/tareas');
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
      setLoading(false);
    }
  };

  // Cargar las tareas al montar el componente
  useEffect(() => {
    fetchTasks();
  }, []);

  // Función para eliminar una tarea
  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tareas/${id}`);
      alert('Tarea eliminada correctamente');
      fetchTasks(); // Volver a obtener las tareas después de la eliminación
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      alert('Error al eliminar la tarea');
    }
  };

  // Función para editar una tarea
  const onEdit = async (task) => {
    const tituloEditado = prompt('Editar título de la tarea:', task.titulo);
    if (tituloEditado !== null && tituloEditado.trim() !== '') {
      const descripcionEditada = prompt('Editar descripción de la tarea:', task.descripcion);
      if (descripcionEditada !== null && descripcionEditada.trim() !== '') {
        try {
          await axios.put(`http://localhost:5000/api/tareas/${task._id}`, {
            titulo: tituloEditado,
            descripcion: descripcionEditada,
          });
          alert('Tarea actualizada correctamente');
          fetchTasks(); // Volver a obtener las tareas después de la edición
        } catch (error) {
          console.error('Error al actualizar la tarea:', error);
          alert('Error al actualizar la tarea');
        }
      }
    }
  };

  // Función para cambiar el estado de una tarea
  const cambiarEstado = async (task) => {
    try {
      await axios.put(`http://backend-sempx.vercel.app/api/tareas/${task._id}`, { estado: estadoTarea[task._id] || task.estado });
      alert('Estado de la tarea actualizado correctamente');
      fetchTasks(); // Volver a obtener las tareas después de cambiar el estado
    } catch (error) {
      console.error('Error al cambiar el estado de la tarea:', error);
      alert('Error al cambiar el estado de la tarea');
    }
  };

  // Manejar el cambio de estado en el select
  const handleEstadoChange = (taskId, newEstado) => {
    setEstadoTarea((prevState) => ({
      ...prevState,
      [taskId]: newEstado,
    }));
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
        {loading ? (
          <p>Cargando tareas...</p>
        ) : filteredTasks.length === 0 ? (
          <p>No hay tareas disponibles que coincidan con la búsqueda.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredTasks.map((task) => (
              <li key={task._id} style={{ display: 'flex', alignItems: 'center', margin: '10px 0', padding: '10px', border: '1px solid #ddd' }}>
                <div style={{ flex: 2 }}>
                  <h3>{task.titulo}</h3>
                  <p>Descripción: {task.descripcion}</p>
                  <p>Prioridad: {task.prioridad}</p>
                  <p>Asignado a: {task.asignadoA}</p>
                  <p>Estado: {task.estado}</p>
                  <p>Fecha Inicial: {new Date(task.creadoEn).toLocaleDateString()}</p>
                  <p>Fecha Límite: {new Date(task.fechaLimite).toLocaleDateString()}</p>
                </div>

                {/* Select y Botones dispuestos horizontalmente */}
                <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <select
                    value={estadoTarea[task._id] || task.estado}
                    onChange={(e) => handleEstadoChange(task._id, e.target.value)}
                    style={{ padding: '5px', marginRight: '10px' }}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Progreso">En Progreso</option>
                    <option value="Completada">Completada</option>
                  </select>
                  <button onClick={() => cambiarEstado(task)} style={{ padding: '5px 10px', cursor: 'pointer', marginRight: '10px' }}>
                    Aplicar Cambio
                  </button>
                  <button onClick={() => onEdit(task)} style={{ cursor: 'pointer', color: 'blue', marginRight: '10px' }}>
                    Editar
                  </button>
                  <button onClick={() => onDelete(task._id)} style={{ cursor: 'pointer', color: 'red' }}>
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;
