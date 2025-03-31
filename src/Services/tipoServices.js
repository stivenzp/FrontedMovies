import { axiosInstance } from "../Helper/axios-config";

const getTipo = () => {
    return axiosInstance.get('tipo', {
        header: {
            'content-type': 'aplication/json'
        }
    });
}

const createTipo = (data) => {
    return axiosInstance.post('tipo', data, {
        header: {
            'content-type': 'aplication/json'
        }
    });
}


const UpdateTipo = (tipoId, data) => {
    return axiosInstance.put( `tipo/${tipoId}`, data, {
        header: {
            'content-type': 'aplication/json'
        }
    });
}

export {
    getTipo, createTipo, UpdateTipo
}