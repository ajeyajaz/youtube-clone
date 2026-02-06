import { useEffect} from "react";
import apiClient from "../services/api-client";
import { useDispatch } from 'react-redux'
import { setUser } from "../redux/slices/auth.slice";


const useUser = () => {
    const dispatch = useDispatch();

    useEffect(()=> {
    
        const fetch = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if(!accessToken) return;

            try{
                // get user data
                const { data } = await apiClient.get('auth/me');
                dispatch(setUser(data));
            }
            catch(ex){

                if(ex.response.status === 401){
                    try{
                        // get access-token
                        const { data } = await apiClient.get('auth/refresh');
                        localStorage.setItem('accessToken', data.token);

                        //set yser
                        const {data : user} = apiClient.get('auth/me');
                        dispatch(setUser(user));
                    }
                    catch(ex){
                        // remove access-token
                        localStorage.removeItem('accessToken');
                        dispatch(setUser(null));
                    }
                }
            }
        };
        fetch();
    }, [dispatch]);
}

export default useUser;