
import {
    Box,
    Text,
    Image,
    Avatar

} from '@chakra-ui/react';
import {
    AiOutlineArrowLeft,
} from "react-icons/ai"
import { useEffect, useState } from 'react';
import { API } from '../../libs/Api';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BsDot } from 'react-icons/bs';
import AddReply from '../Post/AddReply';

interface ThreadData {
    id: number;
    content: string;
    image: string | null;
    created_at: string;
    created_by: {
        id: number;
        username: string;
        full_name: string;
        email: string;
        photo_profile: string;
    };
    number_of_replies: {
        id: number;
        content: string;
        user_id: {
            id: number;
            username: string;
            full_name: string;
            email: string;
            photo_profile: string;
        };
        image: string;
    }[];
}


export default function Index() {
    const [data, setData] = useState<ThreadData[]>([]); // Inisialisasi state data dengan tipe data Thread
    const { id } = useParams();

    async function getThreads() {
        try {

            const response = await API.get(`/threads/${id}`);
            const threadData = response.data; // Mengambil data langsung dari respons

            setData([threadData]); // Menyimpan data dalam array untuk kompatibilitas dengan kode yang ada

            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        getThreads();
    }, []);

    return (
        <Box
            height={'max-content'}
        >
            <Box
                display={'flex'}
            >
                <Link
                    to={'/'}
                >
                    <Text
                        padding={'10px'}
                        alignItems={'center'}
                        gap={'10px'}
                        display={'flex'}
                        fontWeight={'bold'}
                        as={'h1'}
                        fontSize={'2xl'}
                    >
                        <AiOutlineArrowLeft /> Back</Text>
                </Link>
            </Box>

            <Box>
                {data.map((thread) => (
                    <Box
                        key={thread.id}
                        display={'flex'}
                        flexDirection={'column'}
                        background={'#0d0d0d'}
                        padding={'15px'}
                        borderRadius={'10px'}
                        gap={'20px'}
                        my={'10px'}
                    >
                        <Text
                            fontWeight={'bold'}
                        >
                            Thread
                        </Text>

                        <Box
                            display={'flex'}
                            gap={'10px'}
                            alignContent={'center'}
                            alignItems={'center'}
                        >
                            <Box display={'flex'}>
                                <Box
                                    width={'50px'}
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
                                <Box gap={'1'} display={'flex'} alignItems={'center'}>
                                    <Text>{thread.created_by?.full_name || "Unknown User"}</Text>
                                    <Text color={'grey'}>{thread.created_by?.username || "Unknown Username"}</Text>
                                    <BsDot size={30} />
                                    <Text color={'grey'}>{thread.created_at}</Text>
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
                                        ></Image>
                                    </Box>
                                )}
                                <Box>
                                    <Text textAlign={'justify'}>{thread.content}</Text>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
            <Box
                background={'#0d0d0d'}
                padding={'15px'}
                borderRadius={'10px'}
                gap={'20px'}
                my={'10px'}
            >

                <AddReply />

                <Box>
                    <Text fontWeight={'bold'}>All Replies</Text>
                </Box>
                {data.map((thread) =>
                (
                    <Box
                        my={'10px'}
                    >
                        {thread.number_of_replies.map((reply) => (
                            <Box
                                borderY={'1px solid grey'}
                                padding={'10px'}
                            >
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
                                                name={reply.user_id?.full_name || "Unknown User"}
                                                background={'orange'}
                                                src={reply.user_id?.photo_profile || "null"}
                                            />
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box gap={'2'} display={'flex'}>
                                            <Text>{reply.user_id?.full_name || "Unknown User"}</Text>
                                            <Text color={'grey'}>{reply.user_id?.username || "Unknown Username"}</Text>

                                        </Box>
                                        {reply.image && (
                                            <Box>
                                                <Image
                                                    margin={'10px'}
                                                    borderRadius='20px'
                                                    height={'150px'}
                                                    width={'400px'}
                                                    fit={'cover'}
                                                    src={reply.image}
                                                ></Image>
                                            </Box>
                                        )}
                                        <Box>
                                            <Text textAlign={'justify'}>{reply.content}</Text>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )
                )}
            </Box>
        </Box>
    );
}
