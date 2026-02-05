import { useState} from "react";
import apiClient from "../services/api-client";
import { useNavigate } from "react-router-dom";

export default () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const register = async (data) => {
        try {
            setIsLoading(true);
            setError('');

            await apiClient.post('/users/register', data);
            navigate('/users/login');

        } catch (ex){ 
            setError(ex.response?.data || 'something went wrong.');
        }
        finally{
            setIsLoading(false)
        }
    };
    return {register, error, setError, isLoading}
}