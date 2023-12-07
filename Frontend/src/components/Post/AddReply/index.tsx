import {
    Box,
    Text,
    Button,
    Textarea,
    ModalOverlay,
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,

} from '@chakra-ui/react'

import { BiSolidImageAdd } from "react-icons/bi";
import { useState } from "react";
import { API } from '../../../libs/Api';
import AvatarProfile from '../../UserProfile/AvatarProfile';
import { useParams } from 'react-router-dom';


type ReplyData = {
    content: string;
    image: Blob | null;
}

export default function Index() {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(3px)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)
    const { id } = useParams()

    const [valueForm, setValueForm] = useState<ReplyData>({
        content: '',
        image: null,
    });

    // Function to handle image file selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setValueForm({ ...valueForm, image: file });
            console.log(file);
        } else {
            setValueForm({ ...valueForm, image: null });
        }
    };


    const handleCreateReply = async () => {
        try {
            const formData = new FormData();
            const { content, image } = valueForm;
            formData.append('content', content);
            // formData.append('created_by', created_by.toString());
            if (valueForm.image) {
                formData.append('upload', image as Blob);
            }

            // Make a POST request to your backend API endpoint
            const response = await API.post(`/reply/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(formData)
            // Handle the response, e.g., show a success message
            console.log('Thread created:', response.data);

            // Close the modal
            onClose();
        } catch (error) {
            // Handle any errors, e.g., display an error message
            console.error('Error creating thread:', error);
        }
    };

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
        >
            <Text
                as={'h1'}
                fontWeight={'bold'}
                mt={'30px'}
                fontSize={'2xl'}
            >Home</Text>

            <Box
                display={'flex'}
                flexDirection={'row'}
                my={'20px'}
                background={'#474747'}
                borderRadius={'20px'}
                padding={'10px'}
                alignItems={"center"}
                gap={4}
            >
                <AvatarProfile />
                <Box
                    width={'100%'}
                >
                    <Button
                        color={'grey'}
                        onClick={() => {
                            setOverlay(<OverlayOne />)
                            onOpen()
                        }}
                        width={'100%'}
                    >
                        <Text
                            textAlign={'start'}
                        >
                            Reply thread
                        </Text>
                    </Button>

                    <Modal isCentered isOpen={isOpen} onClose={onClose}>
                        {overlay}
                        <ModalContent>
                            <Box
                                display={'flex'}
                                flexDirection={'column'}
                                alignItems={'center'}
                                my={'100px'}
                            >
                                <Box
                                    display={'flex'}
                                    background={'#474747'}
                                    padding={'20px'}
                                    borderRadius={'10px'}
                                    flexDirection={'column'}
                                    alignItems={'start'}
                                    w={'50%'}
                                >
                                    <Box
                                        display={'flex'}
                                        alignItems={'center'}
                                        width={'100%'}
                                        justifyContent={'space-between'}
                                        my={'10px'}
                                    >
                                        <ModalHeader
                                            fontWeight={'bold'}
                                        >
                                            <Text
                                                textAlign={'justify'}
                                                width={'100px'}
                                            >Add Reply</Text>
                                        </ModalHeader>
                                        <ModalCloseButton />
                                    </Box>
                                    <ModalBody
                                        width={'100%'}
                                        background={'#404040'}
                                        borderRadius={'20px'}
                                    >
                                        <Box
                                            display={'flex'}
                                            flexDirection={'row'}
                                            my={'20px'}
                                            background={'#404040'}
                                            borderRadius={'20px'}
                                            padding={'10px'}
                                            alignItems={"center"}
                                            gap={4}
                                        >
                                            <AvatarProfile />

                                            {/* Add Content Thread */}
                                            <Textarea
                                                placeholder=' What is happening?!'
                                                width={'100%'}
                                                background={'#404040'}
                                                name='content'
                                                id='content'
                                                border={'none'}
                                                height={'100px'}
                                                value={valueForm.content} // Menggunakan valueForm.content
                                                onChange={(e) => setValueForm({ ...valueForm, content: e.target.value })} // Memperbarui valueForm.content
                                            >

                                            </Textarea>

                                        </Box>
                                    </ModalBody>
                                    <ModalFooter
                                        width={'100%'}
                                        my={'10px'}
                                        display={'flex'}
                                        flexDirection={'column'}
                                    >
                                        <Box
                                            display={'flex'}
                                            alignItems={'center'}
                                            width={'100%'}
                                            justifyContent={'space-between'}
                                        >
                                            {/* Upload Image */}
                                            <Box
                                                position={'relative'}
                                                background={'#404040'}
                                                display={'flex'}
                                                padding={'10px'}
                                                borderRadius={'10px'}
                                                alignItems={'center'}
                                                gap={'10px'}
                                            >
                                                <BiSolidImageAdd
                                                    color={'green'}
                                                    size={30} />
                                                <Text>
                                                    Click to Upload
                                                </Text>
                                                <Input
                                                    position={'absolute'}
                                                    name='upload'
                                                    id='upload'
                                                    type='file'
                                                    placeholder='Add Image Link'
                                                    background={'#404040'}
                                                    border={'none'}
                                                    opacity={'0'}
                                                    padding={'10px'}
                                                    borderRadius={'10px'}
                                                    onChange={handleImageChange}
                                                >

                                                </Input>
                                            </Box>
                                            {/* Button Post Thread */}
                                            <Button
                                                background={'green'}
                                                padding={'10px'}
                                                width={'100px'}
                                                borderRadius={'20px'}
                                                onClick={handleCreateReply}
                                            >
                                                Post
                                            </Button>
                                        </Box>
                                        <Box
                                            display={'flex'}
                                            flexDirection={'column'}
                                            justifyItems={'start'}
                                            gap={'10px'}
                                        >
                                        </Box>
                                    </ModalFooter>
                                </Box>
                            </Box>
                        </ModalContent>
                    </Modal>
                </Box>

                <BiSolidImageAdd
                    color={'green'}
                    size={50}
                />

                {/* Button Post Thread */}
                <Button
                    background={'green'}
                    padding={'10px'}
                    width={'100px'}
                    borderRadius={'20px'}
                >
                    Reply
                </Button>
            </Box>
        </Box>
    )
}
