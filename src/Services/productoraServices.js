import { axiosInstance } from "../Helper/axios-config";

const getProductora = () => {
  return axiosInstance.get('productora', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

const createProductora = (data) => {
  return axiosInstance.post('productora', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

const UpdateProductora = (productoraId, data) => {
  return axiosInstance.put(`productora/${productoraId}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export { getProductora, createProductora, UpdateProductora };