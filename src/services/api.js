// services/api.js
const BASE_URL = 'http://localhost:80/rest'; // Base URL configurable

// Función para obtener las credenciales de autenticación
const getAuthHeader = () => {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  if (username && password) {
    return {
      Authorization: `Basic ${btoa(username + ":" + password)}`
    };
  }
  return {};
};

const handleResponse = async (response) => {
  const errorData = await response.json();
  if (!response.ok) {
    // Lanza un error con detalles del mensaje si están disponibles
    throw { 
      status: response.status, 
      errors: errorData.errors || { general: 'Unexpected error occurred' }
    };
  }
  return errorData;
};


// Función genérica para manejar las peticiones
const request = async (endpoint, method = 'GET', body = null, headers = {}) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(), 
      ...headers,         
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  return handleResponse(response);
};

// Métodos CRUD para simplificar las llamadas desde los componentes
export const api = {
  get: (endpoint, headers = {}) => request(endpoint, 'GET', null, headers),
  post: (endpoint, body, headers = {}) => request(endpoint, 'POST', body, headers),
  put: (endpoint, body, headers = {}) => request(endpoint, 'PUT', body, headers),
  delete: (endpoint, headers = {}) => request(endpoint, 'DELETE', null, headers),
};

export default api;
