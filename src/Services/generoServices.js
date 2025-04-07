import { axiosInstance } from "../Helper/axios-config";

const getGenero = () => {
  return axiosInstance.get('genero', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

const createGenero = (data) => {
  return axiosInstance.post('genero', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

const UpdateGenero = (generoId, data) => {
  return axiosInstance.put(`genero/${generoId}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export { getGenero, createGenero, UpdateGenero };