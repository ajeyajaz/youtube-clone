import axios from 'axios';


export const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true,
});

// sends token on every request.
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

class HttService{

    constructor(endpoint){
        this.endpoint = endpoint
    }

    getAll(){
        const controller = new AbortController()
        const request = axiosInstance.get(this.endpoint, {signal: controller.signal});

        return {request, cancel : () => controller.abort()}
    }

    get(id){
        const controller = new AbortController()
        const request = axiosInstance.get(this.endpoint + "/" + id);

        return {request, cancel : () => controller.abort()}
    }

    post(data){
        return axiosInstance.post(this.endpoint, data)
    }

    put(data, id){
        return axiosInstance.put(this.endpoint + "/" + id, data)
    }

    delete(id){
        return axiosInstance.delete(this.endpoint + "/" + id)
    }
}


const create = (endpoint) => new HttService(endpoint)
export default create;