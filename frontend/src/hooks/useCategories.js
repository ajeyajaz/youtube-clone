import { useEffect, useState} from "react";
import apiClient from "../services/api-client";



const useCategories = () => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    

    useEffect(() => {

        setIsLoading(true);
        setError('');
        
        const fetch = async () => {
            
            try{
                const { data: result } = await apiClient.get('/categories');
                setData([{_id:null, name: 'All'}, ...result]);
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

    }, [])

    return {data, error, isLoading}

}

export default useCategories;