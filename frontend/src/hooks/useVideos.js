import { useEffect, useState} from "react";
import apiClient from "../services/api-client";
import { useSelector } from 'react-redux'


const useVideos = () => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState([]);
    const search = useSelector(state => state.query.search);

    useEffect(() => {

        setIsLoading(true);
        setError('');
        
        const fetch = async () => {
            
            try{
                const { data: result } = await apiClient.get('/videos', {params: {search}});
                setData(result);
            }
            catch(ex){
                console.log(ex)
                setError(ex.response?.data || 'something went wrong.')
            }
            finally{
                setIsLoading(false)
            }
        }

        fetch()

    }, [search])

    return {data, error, isLoading}

}

export default useVideos;