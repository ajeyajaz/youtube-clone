import { useEffect, useState } from "react"
import commentService from "../services/comment-service"



export default (videoId) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(()=> {

        if(!videoId) return;

        setError('');
        setLoading(true);

        const {request, cancel} = commentService.get(videoId)
            request
            .then(({ data })=> {
                console.log('comments data: ', data);
                setData(data);
            })
            .catch(ex => setError(ex.response?.data || 'something went wrong'))
            .finally(() => setLoading(false))

            return () => cancel();

   }, [videoId])

   return {data, setData, error, setError, loading};
};

