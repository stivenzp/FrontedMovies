import { axiosInstance } from "../Helper/axios-config";

const getGenero = () => {
    return axiosInstance.get('genero', {
        header: {
            'content-type': 'aplication/json'
        }
    });
}

const createGenero = (data) => {
    return axiosInstance.post('genero', data, {
        header: {
            'content-type': 'aplication/json'
        }
    });
}


const UpdateGenero = (generoId, data) => {
    return axiosInstance.put( `genero/${generoId}`, data, {
        header: {
            'content-type': 'aplication/json'
        }
    });
}

export {
    getGenero, createGenero, UpdateGenero
}