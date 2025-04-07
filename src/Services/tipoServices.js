import { axiosInstance } from "../Helper/axios-config";

const getTipo = () => {
  return axiosInstance.get('tipo', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

const createTipo = (data) => {
  return axiosInstance.post('tipo', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

const UpdateTipo = (tipoId, data) => {
  return axiosInstance.put(`tipo/${tipoId}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export { getTipo, createTipo, UpdateTipo };