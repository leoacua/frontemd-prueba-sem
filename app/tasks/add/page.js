// app/tasks/add/page.js
'use client'; // ← Esto indica que el componente es del cliente
import TaskForm from '../../../components/TaskForm';

export default function AddTaskPage() {
  const handleAddTask = (task) => {
    // Aquí podrías conectar con la API para agregar la tarea
    console.log('Nueva Tarea:', task);
  };

  return (
    <div style={{ padding: '20px' }}>
     
      <TaskForm onSubmit={handleAddTask} />
    </div>
  );
}
