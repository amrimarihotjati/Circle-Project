import { Tab, TabList, TabPanel, TabPanels, Tabs, Box, Avatar, Text, Button } from '@chakra-ui/react'
import { useGetProfile } from '../features/users/Hooks'
import { InterfaceUser } from '../types/userType';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/type/RootState';
import { AUTH_CHECK } from '../store/rootReducer';
import { useMutation, useQueryClient } from 'react-query';
import { API } from '../libs/Api';


export default function Follow() {
    const { dataProfile } = useGetProfile();

    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth);
    const queryClient = useQueryClient();

    const { mutate: handleFollow } = useMutation({
        mutationFn: (followId: number) => {
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
    })

    const handleFollowUser = (followId: number | undefined) => {
        if (followId !== undefined) {
            handleFollow(followId);
            console.log(followId);
        }
    }

    const isFollowing = (userId: number | undefined) => {
        return (
            auth.following?.some((follow: InterfaceUser) => follow.id === userId) ?? false
        )
    }

    return (
        <Box
            width={'100%'}
            display={'flex'}
            gap={4}
            flexDirection={'column'}
            height={"100vh"}
        >
            <Text
                as={'h1'}
                fontWeight={'bold'}
                mt={'30px'}
                fontSize={'2xl'}
            >
                Profile Details
            </Text>

            <Tabs
                width={'100%'}
                isFitted
                variant='enclosed'>
                <TabList
                    display={'flex'}
                    flexDirection={'row'}
                    width={'100%'}
                    gap={2}
                    padding={'10px'}
                    justifyContent={'center'}
                    mb='1em'>
                    <Tab
                        _hover={{ bg: 'green', color: 'white' }}
                        width={'100%'}
                        bg={'#0d0d0d'}
                        color={'white'}
                        borderRadius={'10px 10px 0px 0px'}
                        padding={'10px'}
                    >Followers</Tab>
                    <Tab
                        _hover={{ bg: 'green', color: 'white' }}
                        width={'100%'}
                        bg={'#0d0d0d'}
                        color={'white'}
                        borderRadius={'10px 10px 0px 0px'}
                        padding={'10px'}
                    >Followings</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {dataProfile?.followers.map((user: InterfaceUser) => (
                            <Box
                                display={'flex'}
                                flexDirection={'row'}
                                key={user.id}
                                gap={4}
                                padding={'10px'}
                                bg={'#0d0d0d'}
                                borderRadius={'10px'}
                                margin={'10px'}
                                alignItems={"center"}
                            >
                                <Avatar
                                    boxSize='50px'
                                    name={user?.full_name || "Unknown User"}
                                    background={'purple'}
                                    src={user?.photo_profile || "null"}
                                />

                                <Box
                                    display={'flex'}
                                    flexDirection={'row'}
                                    justifyContent={'space-between'}
                                    width={'100%'}
                                    alignItems={"center"}
                                >
                                    <Box>
                                        <Text className="full_name">{user.full_name}</Text>
                                        <Text
                                            className="username"
                                            color={'grey'}
                                        >{user.username}</Text>
                                    </Box>

                                    <Box>
                                        <Button
                                            borderRadius={'20px'}
                                            background={isFollowing(user.id) ? 'red' : 'green'}
                                            height={"35px"}
                                            width={"80px"}
                                            onClick={() => handleFollowUser(user.id)}
                                        >
                                            {isFollowing(user.id) ? 'Unfollow' : 'Follow'}
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </TabPanel>
                    <TabPanel>
                        {dataProfile?.following.map((user: InterfaceUser) => (
                            <Box
                                display={'flex'}
                                flexDirection={'row'}
                                key={user.id}
                                gap={4}
                                padding={'10px'}
                                bg={'#0d0d0d'}
                                borderRadius={'10px'}
                                margin={'10px'}
                                alignItems={"center"}
                            >
                                <Avatar
                                    boxSize='50px'
                                    name={user?.full_name || "Unknown User"}
                                    background={'purple'}
                                    src={user?.photo_profile || "null"}
                                />

                                <Box
                                    display={'flex'}
                                    flexDirection={'row'}
                                    justifyContent={'space-between'}
                                    width={'100%'}
                                    alignItems={"center"}
                                >
                                    <Box>
                                        <Text className="full_name">{user.full_name}</Text>
                                        <Text
                                            className="username"
                                            color={'grey'}
                                        >{user.username}</Text>
                                    </Box>

                                    <Box>
                                        <Button
                                            borderRadius={'20px'}
                                            background={isFollowing(user.id) ? 'red' : 'green'}
                                            height={"35px"}
                                            width={"80px"}
                                            onClick={() => handleFollowUser(user.id)}
                                        >
                                            {isFollowing(user.id) ? 'Unfollow' : 'Follow'}
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}