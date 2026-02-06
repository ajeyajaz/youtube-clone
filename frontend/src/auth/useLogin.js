import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api-client";
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/auth.slice'

export default () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

  
    const login = async (data) => {
        try {
            setIsLoading(true);
            setError('');

            const response = await apiClient.post('/users/login', data);
            localStorage.setItem('accessToken', response.data.token);

            const user = await apiClient.get('/auth/me');
            dispatch(setUser(user));
            
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
