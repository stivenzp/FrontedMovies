import { axiosInstance } from "../Helper/axios-config";

const getDirector = () => {
  return axiosInstance.get('director', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

const createDirector = (data) => {
  return axiosInstance.post('director', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

const UpdateDirector = (directorId, data) => {
  return axiosInstance.put(`director/${directorId}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export { getDirector, createDirector, UpdateDirector };
