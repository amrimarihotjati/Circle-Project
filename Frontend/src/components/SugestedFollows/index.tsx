import {
  Box,
  Text,
  Avatar,
  Button,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useGetUsers } from '../../features/users/Hooks';
import { InterfaceUser } from '../../types/userType';
import { useQueryClient, useMutation } from 'react-query';
import { API } from '../../libs/Api';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_CHECK } from '../../store/rootReducer';
import { RootState } from '../../store/type/RootState';

export default function Suggested() {
  const queryClient = useQueryClient();
  const [randomUsers, setRandomUsers] = useState<InterfaceUser[]>([]);
  const { users } = useGetUsers();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  // Random max 3 users
  useEffect(() => {
    if (users && users.length > 0) {
      const shuffledUsers = [...users].sort(() => Math.random() - 0.5);
      const selectedUsers = shuffledUsers.slice(0, 3);
      setRandomUsers(selectedUsers);
    }
  }, []); //tambahkan users kalau mau reload

  // HandlePost untuk Follow dan UnFollow Users
  const { mutate: handleFollow } = useMutation({
    mutationFn: (followId: number) => { // Specify the type of followId here
      return API.post(`/follow`, { followingId: followId });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      const response = await API.get('/auth/check');
      dispatch(AUTH_CHECK(response.data.user));
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleFollowClick = (followId: number | undefined) => {
    if (followId !== undefined) {
      handleFollow(followId);
      console.log(followId);
    }
  }

  const isFollowing = (userId: number | undefined) => {
    return (
      auth.following?.some((follow: InterfaceUser) => follow.id === userId) ?? false
    );
  }


  return (
    <Box padding={'20px'}>
      <Box
        background={'#474747'}
        padding={'10px'}
        borderRadius={'10px'}
        display={'flex'}
        flexDirection={'column'}
      >
        <Text fontWeight={'bold'}>Suggested For You</Text>

        {randomUsers.map((user: InterfaceUser) => (
          <Box
            display={'flex'}
            gap={'4'}
            my='10px'
            key={user.id}
          >
            <Avatar
              boxSize='50px'
              name={user.full_name || 'Unknown User'}
              background={'orange'}
              src={user.photo_profile || 'null'}
            />

            <Box
              display={'flex'}
              flexDirection={'column'}
            >
              <Text>{user.full_name}</Text>
              <Text color={'grey'}>{user.username}</Text>
            </Box>

            <Box
              flex={'1'}
              display={'flex'}
              justifyContent={'flex-end'}
            >
              <Box>
                <Button
                  background={isFollowing(user.id) ? 'red' : 'green'}
                  px={'30px'}
                  py={'5px'}
                  borderRadius={'20px'}
                  onClick={() => handleFollowClick(user.id)} // Mengirim user.id ke handleFollowClick
                >
                  {isFollowing(user.id) ? 'Unfollow' : 'Follow'}
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
