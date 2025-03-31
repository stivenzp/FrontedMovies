import { axiosInstance } from "../Helper/axios-config";

const getProductora = () => {
    return axiosInstance.get('productora', {
        header: {
            'content-type': 'aplication/json'
        }
    });
}

const createProductora = (data) => {
    return axiosInstance.post('productora', data, {
        header: {
            'content-type': 'aplication/json'
        }
    });
}


const UpdateProductora = (productoraId, data) => {
    return axiosInstance.put( `productora/${productoraId}`, data, {
        header: {
            'content-type': 'aplication/json'
        }
    });
}

export {
    getProductora, createProductora, UpdateProductora
}