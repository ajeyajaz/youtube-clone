import axios from 'axios';


const apiClient = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true,
});

// sends token on every request.
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

export default apiClient;