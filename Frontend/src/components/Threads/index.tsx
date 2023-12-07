import React, { useState } from 'react';
import {
    Box,
    Image,
    Text,
    Avatar,
    Modal, ModalOverlay, ModalContent, ModalBody, Button,
    HStack
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';

import {
    AiFillHeart,
} from "react-icons/ai";

import {
    BsHeart
} from "react-icons/bs"

import {
    MdComment,
} from "react-icons/md"

import {
    BsDot,
    // BsHeart
} from 'react-icons/bs';
import { API } from '../../libs/Api';
import { format } from 'date-fns';
import { TypeThread } from '../../types/threadType';
import { useGetThreads } from '../../features/threads/Hooks/index';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_CHECK } from '../../store/rootReducer';
import { useQueryClient, useMutation } from 'react-query';
import { RootState } from '../../store/type/RootState';


export default function Index() {
    // const [data, setData] = useState<TypeThread[]>([]); // Inisialisasi state data dengan tipe data Thread
    const [clickedImage, setClickedImage] = useState('');
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const auth = useSelector((state: RootState) => state.auth);
    const { threads } = useGetThreads();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    //Handle Like
    const { mutate: handleLike } = useMutation({
        mutationFn: (thread_id: number) => { // Specify the type of followId here
            return API.post(`/like`, { thread_id: thread_id });
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['threads'] });
            const response = await API.get('/auth/check');
            dispatch(AUTH_CHECK(response.data.user));
        },
        onError: (err) => {
            console.log(err);
        },


    });



    const handleLikeClick = (thread_id: number | undefined) => {
        if (thread_id !== undefined) {
            handleLike(thread_id);
            console.log(thread_id);
        }
    }

    if (!threads) {
        return <Box>Loading...</Box>; // Menampilkan pesan "Loading" jika data belum tersedia
    }


    const openModal = (imageUrl: React.SetStateAction<string>) => {
        setClickedImage(imageUrl);
        setIsLoadingImage(true);
    };


    return (
        <Box>
            {threads.map((thread: TypeThread) => (
                <Box
                    key={thread.id}
                    display={'flex'}
                    background={'#0d0d0d'}
                    padding={'15px'}
                    borderRadius={'10px'}
                    gap={'20px'}
                    my={'10px'}
                >
                    <Box display={'flex'}>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            width="50px"
                            height="50px"
                        >
                            <Avatar
                                boxSize='50px'
                                name={thread.created_by?.full_name || "Unknown User"}
                                background={'orange'}
                                src={thread.created_by?.photo_profile || "null"}
                            />

                        </Box>
                    </Box>
                    <Box>
                        <Box gap={'1'} display={'flex'} alignContent={'center'} alignItems={'center'}>
                            <Text>{thread.created_by?.full_name || "Unknown User"}</Text>
                            <Text color={'grey'}>{thread.created_by?.username || "Unknown Username"}</Text>
                            <BsDot size={30} />
                            <Text color={'grey'}>
                                {format(new Date(thread.created_at), 'dd MMM yyyy')}
                            </Text>
                        </Box>
                        {thread.image && (
                            <Box>
                                <Image
                                    margin={'10px'}
                                    borderRadius='20px'
                                    height={'150px'}
                                    width={'400px'}
                                    fit={'cover'}
                                    src={thread.image}
                                    onClick={() => openModal(thread.image)}
                                ></Image>
                            </Box>

                        )}

                        <Modal
                            isOpen={clickedImage !== ''}
                            onClose={() => setClickedImage('')}
                            size="lg"
                            isCentered>
                            <ModalOverlay />
                            <ModalContent
                                display={'flex'}
                                flexDirection={'column'}
                                alignItems={'center'}
                                justifyContent={'center'}
                            >

                                <ModalBody
                                    display={'flex'}
                                    flexDirection={'column'}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                >
                                    {clickedImage && (
                                        <Image
                                            margin={'10px'}
                                            borderRadius='20px'
                                            height={'500px'}
                                            width={'500px'}
                                            src={clickedImage}
                                            objectFit={'cover'}
                                            onClick={() => openModal(thread.image)}
                                            onLoad={() => setIsLoadingImage(false)}
                                        />
                                    )}

                                    {isLoadingImage ? (
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            height="100vh"
                                            width="100%"
                                            background="rgba(0, 0, 0, 0.7)"
                                            position="fixed"
                                            top="0"
                                            left="0"
                                            zIndex="9999"
                                        >
                                            <Text color="white" fontSize="24px">
                                                Loading...
                                            </Text>
                                        </Box>
                                    ) : null}


                                    <Button
                                        onClick={() => setClickedImage('')}
                                        background={'red'}
                                        padding={'10px'}
                                        borderRadius={'10px'}
                                        color={'white'}
                                        fontWeight={'bold'}
                                    >
                                        Close
                                    </Button>
                                </ModalBody>
                            </ModalContent>
                        </Modal>

                        <Box>
                            <Text textAlign={'justify'}>{thread.content}</Text>
                        </Box>
                        <Box gap={'5'} display={'flex'} my={'10px'}>
                            <Box display={'flex'} alignItems={'center'} gap={1}>

                                <HStack
                                    onClick={() => handleLikeClick(thread.id)}
                                    cursor="pointer"
                                >
                                    {thread.like?.some((like) => like.user_id.id === auth.id) ?
                                        <AiFillHeart color="red" /> : <BsHeart />}
                                </HStack>


                                <Text>{Object.keys(thread.like).length}</Text>
                            </Box>
                            <Box display={'flex'} alignItems={'center'} gap={1}>
                                <MdComment />
                                <Text
                                    className='banyak reply'
                                >{Object.keys(thread.number_of_replies).length}</Text>
                                <Box
                                    ml={'4'}
                                >
                                    <Link to={`/threads/${thread.id}`}>
                                        <Text color={'grey'} >Reply</Text>
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}
