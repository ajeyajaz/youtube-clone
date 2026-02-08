import { useEffect, useState } from "react"
import videoService from "../services/video-service"



export default (videoId) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(()=> {

        if(!videoId) return;

        setError('');
        setLoading(true);

        const {request, cancel} = videoService.get(videoId)
            request
            .then(({ data })=> {
                console.log('channel video : ', data);
                setData(data);
            })
            .catch(ex => setError(ex.response?.data || 'something went wrong'))
            .finally(() => setLoading(false))

            return () => cancel();

   }, [videoId])

   return {data, setData, error, setError, loading};
};

