import { axiosInstance } from "../Helper/axios-config";

const getDirector = () => {
    return axiosInstance.get('director', {
        header: {
            'content-type': 'aplication/json'
        }
    });
}

const createDirector = (data) => {
    return axiosInstance.post('director', data, {
        header: {
            'content-type': 'aplication/json'
        }
    });
}


const UpdateDirector = (directorId, data) => {
    return axiosInstance.put( `director/${directorId}`, data, {
        header: {
            'content-type': 'aplication/json'
        }
    });
}

export {
    getDirector, createDirector, UpdateDirector
}