import { axiosInstance } from "../Helper/axios-config";

const getMedia = () => {
    return axiosInstance.get('media', {
        header: {
            'content-type': 'aplication/json'
        }
    });
}

const createMedia = (data) => {
    return axiosInstance.post('media', data, {
        header: {
            'content-type': 'aplication/json'
        }
    });
}


const UpdateMedia = (MediaId, data) => {
    return axiosInstance.put( `media/${MediaId}`, data, {
        header: {
            'content-type': 'aplication/json'
        }
    });
}

const getMediaForId = (MediaId) => {
    return axiosInstance.get( `media/${MediaId}`,{
        header: {
            'content-type': 'aplication/json'
        }
    });
}



export {
    getMedia, createMedia, UpdateMedia, getMediaForId
}