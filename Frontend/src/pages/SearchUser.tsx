import {
    Box,
    Text,
    Input,
    Button,
    Avatar
} from "@chakra-ui/react"
import { InterfaceUser } from "../types/userType"
import { useFilterUsers } from "../features/users/Hooks"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../store/type/RootState"
// import { useGetUsers } from "../features/users/Hooks"
import { useMutation, useQueryClient } from "react-query"
import { API } from "../libs/Api"
import { AUTH_CHECK } from "../store/rootReducer"

const SearchUser = () => {
    const [searchKeyword, setSearchKeyword] = useState(''); // State untuk kata kunci pencarian
    const { filteredUsers } = useFilterUsers(searchKeyword);
    // const { users } = useGetUsers();
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

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    }

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
        >
            <Box>
                <Text
                    as={'h1'}
                    fontWeight={'bold'}
                    mt={'30px'}
                    fontSize={'2xl'}
                >
                    Search
                </Text>

                {/* SearchBar */}
                <Box
                    display={'flex'}
                    flexDirection={'row'}
                    gap={4}
                    width={'100%'}
                    justifyContent={'space-between'}
                    alignItems={"center"}
                >
                    <Input
                        display={'flex'}
                        flexDirection={'row'}
                        my={'20px'}
                        background={'#474747'}
                        borderRadius={'20px'}
                        padding={'10px'}
                        alignItems={"center"}
                        type="text"
                        placeholder="Search User"
                        width={"100%"}
                        value={searchKeyword}
                        onChange={handleSearch}
                    />
                    <Button
                        borderRadius={'20px'}
                        background={'green'}
                        height={"50px"}
                        width={"100px"}
                    >
                        Search
                    </Button>
                </Box>
            </Box>

            {/* Show Users */}

            {filteredUsers ? (
                filteredUsers.map((user: InterfaceUser) => (
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
                ))
            ) : (
                <Box>
                    <Text>
                        Loading Users
                    </Text>
                </Box>
            )}
        </Box>
    );
}

export default SearchUser;
