'use client'; // Indicar que este es un componente cliente

import { useState } from 'react';
import axios from 'axios'; // Asegúrate de importar axios para hacer la solicitud

const TaskForm = ({ onSubmit }) => {
  // Estados para capturar los datos del formulario
  const [titulo, setTitle] = useState('');
  const [descripcion, setDescription] = useState('');
  const [estado, setEstado] = useState('Pendiente'); // Estado para el estado de la tarea
  const [prioridad, setPriority] = useState('Baja');
  const [asignadoA, setAssignedTo] = useState('');
  const [fechaLimite, setFechaLimite] = useState(''); // Estado para la fecha límite

  // Estados para manejar mensajes de éxito, error y estado de carga
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    setLoading(true); // Mostrar mensaje de carga

    try {
      // Crear el objeto de la tarea con los datos del formulario, incluyendo estado y fechaLimite
      const nuevaTarea = {
        titulo,
        descripcion,
        estado, // Agregar el estado al objeto nuevaTarea
        prioridad,
        asignadoA,
        fechaLimite,
      };

      // Hacer la solicitud POST a la API
      const response = await axios.post('https://backend-sempx.vercel.app/api/tareas', nuevaTarea);

      // Si la tarea se crea correctamente, mostrar mensaje de éxito
      setSuccessMessage('Tarea guardada con éxito.');
      setErrorMessage(''); // Limpiar mensaje de error
      setLoading(false);

      // Limpiar los campos del formulario
      setTitle('');
      setDescription('');
      setEstado('Pendiente'); // Restablecer el estado
      setPriority('Baja');
      setAssignedTo('');
      setFechaLimite(''); // Limpiar el estado de la fecha límite
    } catch (error) {
      // Mostrar mensaje de error si ocurre un problema
      setErrorMessage('Error al guardar la tarea. Inténtalo nuevamente.');
      setSuccessMessage(''); // Limpiar mensaje de éxito
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
        <h3>Ingresar Nueva Tarea de SEMPERTEX</h3>
        <input
          type="text"
          placeholder="Título de la tarea"
          value={titulo}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%' }}
        />
        <textarea
          placeholder="Descripción de la tarea"
          value={descripcion}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%' }}
        />
        <select
          value={estado} // Estado para seleccionar el estado de la tarea
          onChange={(e) => setEstado(e.target.value)} // Actualizar el estado con el valor seleccionado
          style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%' }}
        >
          <option value="Pendiente">Pendiente</option>
          <option value="En Progreso">En Progreso</option>
          <option value="Completada">Completada</option>
        </select>
        <select
          value={prioridad}
          onChange={(e) => setPriority(e.target.value)}
          style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%' }}
        >
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
        <input
          type="text"
          placeholder="Asignar a"
          value={asignadoA}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
          style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%' }}
        />
        {/* Campo para ingresar la fecha límite */}
        <input
          type="date"
          placeholder="Fecha Límite"
          value={fechaLimite} // Asociar el valor con el estado fechaLimite
          onChange={(e) => setFechaLimite(e.target.value)} // Actualizar estado fechaLimite
          required
          style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%' }}
        />
        <button
          type="submit"
          style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#0070f3', color: 'white', border: 'none' }}
        >
          {loading ? 'Guardando...' : 'Guardar Tarea'}
        </button>
      </form>

      {/* Mostrar mensajes de éxito y error */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default TaskForm;
