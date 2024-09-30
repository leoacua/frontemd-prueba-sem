// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-sempx.vercel.app/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  
});


// Obtener todas las tareas
export const getTasks = async () => {
  try {
    const response = await api.get('/tareas'); 
    return response.data; // Retorna la lista de tareas desde el backend
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    throw error;
  }
};

export default api;
