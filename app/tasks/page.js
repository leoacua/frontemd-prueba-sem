'use client'; // Asegurarse de indicar que es un componente cliente

import { useState, useEffect } from 'react';
import TaskList from '../../components/TaskList';
import { getTasks, deleteTask } from '../../services/api'; // Importar las funciones con las rutas actualizadas

export default function TasksPage() {
  const [tasks, setTasks] = useState([]); // Estado para almacenar la lista de tareas
  const [loading, setLoading] = useState(true); // Estado para mostrar un mensaje de carga

  // Obtener las tareas al cargar la página
  useEffect(() => {
    fetchTasks();
  }, []);

  // Función para obtener las tareas desde la API
  const fetchTasks = async () => {
    try {
      setLoading(true); // Mostrar mensaje de carga mientras se obtienen las tareas
      const response = await getTasks(); // Obtener las tareas desde el backend
      setTasks(response); // Actualizar el estado con la lista de tareas
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    } finally {
      setLoading(false); // Ocultar el mensaje de carga
    }
  };

  // Función para eliminar una tarea
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId); // Llamar a la API para eliminar la tarea
      fetchTasks(); // Recargar la lista de tareas después de eliminar
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestión de Tareas</h2>
      {/* Mostrar mensaje de carga mientras se obtienen las tareas */}
      {loading ? (
        <p>Cargando tareas...</p>
      ) : (
        <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
      )}
    </div>
  );
}
