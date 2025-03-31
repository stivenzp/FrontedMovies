import { axiosInstance } from "../Helper/axios-config";

const getUsers = () => {
    return axiosInstance.get('usuario', {
        Headers: {
            'content-type': 'aplication/json'
        }
    });
}

const createUsers = (data) => {
    return axiosInstance.get('usuario', data, {
        Headers: {
            'content-type': 'aplication/json'
        }
    });
}


const UpdateUsers = (userId, data) => {
    return axiosInstance.get( `usuarios/${userId}`, data, {
        Headers: {
            'content-type': 'aplication/json'
        }
    });
}

export {
    getUsers, createUsers, UpdateUsers
}