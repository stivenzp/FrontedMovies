import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://backendmovies-nxr4.onrender.com'
    //baseURL: 'http://localhost:4000/'
});

export{
    axiosInstance
}
