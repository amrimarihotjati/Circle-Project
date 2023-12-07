import { useQuery } from 'react-query';
import { API } from "../../../libs/Api";
import { InterfaceUser } from '../../../types/userType';
import { useQueryClient, useMutation } from 'react-query';

export const useGetUsers = () => {
    const { data } = useQuery('users', async () => {
        const response = await API.get('/users');
        return response.data.data.users; // Akses data.users
    });

    return { users: data }; // Kembalikan sebagai objek dengan properti "users"
}

export const useFilterUsers = (searchKeyword: string) => {
    const { users: allUsers } = useGetUsers();
    
    // Tambahkan pengecekan jika allUsers adalah undefined
    if (!allUsers) {
        return { filteredUsers: [] };
    }

    const filteredUsers = allUsers.filter((user: InterfaceUser) => {
        if (user.username) {
            return user.username.toLowerCase().includes(searchKeyword.toLowerCase());
        }
        return false;
    });

    return { filteredUsers };
}


export const useGetProfile = () => {
    const { data } = useQuery('dataProfile', async () => {
        const response = await API.get('/auth/check');
        return response.data.user; // Akses data.user
    });

    return { dataProfile: data };
}


export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
  
    const updateUserProfile = async (updatedData : InterfaceUser) => {
        try {
            const response = await API.patch('/user', updatedData);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };
  
    const { mutate, isLoading, isError, error } = useMutation(updateUserProfile, {
      onSuccess: () => {
        queryClient.invalidateQueries('dataProfile');
        queryClient.invalidateQueries('users');
      },
    });
  
    return { updateUserProfile: mutate, isLoading, isError, error };
  };
