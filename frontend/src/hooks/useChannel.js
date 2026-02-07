import { useEffect, useState} from "react";
import apiClient from "../services/api-client";



const useChannel = (handle) => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    

    useEffect(() => {

        setIsLoading(true);
        setError('');
        
        const fetch = async () => {
            
            try{
                const { data} = await apiClient.get(`/channels/${handle}`);
                setData(data);
            }
            catch(ex){
                console.log('channel not found: ', ex)
                setError(ex.response?.data || 'something went wrong.')
            }
            finally{
                setIsLoading(false)
            }
        }

        fetch()

    }, [handle])

    return {data, error, isLoading}

}

export default useChannel;