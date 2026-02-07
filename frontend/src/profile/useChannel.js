import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api-client";
import { useDispatch } from 'react-redux';
import { setUser } from "../redux/slices/auth.slice";
import { setChannel } from "../redux/slices/channel.slice";

export default () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

  
    const create = async (data) => {
        try {
            setIsLoading(true);
            setError('');

            const { data: channel } = await apiClient.post('/channels', data , {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('channel: ', channel);
            
            // role updated -> creator -> get new access token
            const { data: result } = await apiClient.get('auth/refresh');
                localStorage.setItem('accessToken', result.token);

            //update user-data
            const {data : user} = await apiClient.get('auth/me');
            dispatch(setUser(user));
            
            // update channel-data
            dispatch(setChannel(channel));
            navigate('/profile');
            
        } catch (ex) {
            setError(ex.repsone?.data || 'something went wrong.');
        }
        finally{
            setIsLoading(false);
        }
    };
    return {create, error,isLoading, setError}
}
