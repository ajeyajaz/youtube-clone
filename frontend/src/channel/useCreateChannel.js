import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api-client";
import { useDispatch } from 'react-redux';
import { setUser } from "../redux/slices/auth.slice";


export default () => {
    
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

  
    const create = async (data) => {
        try {
            setIsLoading(true);
            setError('');

            await apiClient.post('/channels', data , {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            // role updated -> creator -> get new access token
            const { data: result } = await apiClient.get('auth/refresh');
                localStorage.setItem('accessToken', result.token);

            //update user-data
            const {data : user} = await apiClient.get('auth/me');
            dispatch(setUser(user));
            
            navigate(`/channel/${user.channel?.handle}`);
            
        } catch (ex) {
            setError(ex.response?.data || 'something went wrong.');
        }
        finally{
            setIsLoading(false);
        }
    };
    return {create, error,isLoading, setError}
}
