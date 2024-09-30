// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});


// Obtener todas las tareas
export const getTasks = async () => {
  try {
    const response = await api.get('/tareas'); 
    return response.data; 
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    throw error;
  }
};

export default api;
