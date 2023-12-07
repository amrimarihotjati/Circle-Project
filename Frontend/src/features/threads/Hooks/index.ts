import { useQuery } from 'react-query';
import { API } from "../../../libs/Api";



export const useGetThreads = () => {
    
    const { data } = useQuery('threads', async () => {
        const response = await API.get('/threads');
        return response.data.data.threads; // Akses data.threads
    });

    return { threads: data }; // Kembalikan sebagai objek dengan properti "threads"

    
}
