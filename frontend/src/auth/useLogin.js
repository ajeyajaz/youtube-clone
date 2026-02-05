import { useState} from "react";
import apiClient from "../services/api-client";
import { useNavigate } from "react-router-dom";

export default () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (data) => {
        try {
            setIsLoading(true);
            setError('');

            const response = await apiClient.post('/users/login', data);
            localStorage.setItem('accessToken', response.data.token);

            navigate('/');
        } catch (ex) {
            setError(ex.response?.data || 'something went wrong.');
        }
        finally{
            setIsLoading(false)
        }
    };
    return {login, error, setError, isLoading}
}
