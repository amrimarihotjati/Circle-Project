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
} from '@chakra-ui/react';

import { BiSolidImageAdd } from "react-icons/bi";
import { useState } from "react";
import { API } from '../../../libs/Api';
import AvatarProfile from '../../UserProfile/AvatarProfile';
import { useQueryClient, useMutation } from 'react-query';

type ThreadData = {
    content: string;
    image: Blob | null;
};

export default function Index() {
    // Komponen ModalOverlay yang akan digunakan dalam modal
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(3px)'
        />
    );

    const queryClient = useQueryClient();

    // Gunakan useDisclosure untuk mengatur state modal
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [overlay, setOverlay] = useState(<OverlayOne />);

    // State untuk menyimpan data thread yang akan dibuat
    const [valueForm, setValueForm] = useState<ThreadData>({
        content: '',
        image: null,
    });

    // Define the initial state for resetting after submission
    const initialThreadData = {
        content: '',
        image: null,
    };

    // Fungsi untuk meng-handle pemilihan berkas gambar
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

    // Menggunakan React Query untuk mengambil data thread
    const createThread = useMutation(
        (newThread: ThreadData) => {
            // Persiapkan FormData untuk permintaan POST
            const formData = new FormData();
            formData.append('content', newThread.content);
            if (newThread.image) {
                formData.append('upload', newThread.image);
            }
            return API.post('/threads', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        },
        {
            onSettled: () => {
                // Menandai ulang query 'threads' untuk mengambil data terbaru
                queryClient.invalidateQueries('threads');
            },
        }
    );

    // Fungsi untuk menangani pembuatan thread
    const handleCreateThread = async () => {
        try {
            // Membuat objek thread baru dari nilai formulir
            const newThread = {
                content: valueForm.content,
                image: valueForm.image,
            };

            // Panggil mutasi createThread untuk mengirim permintaan POST
            await createThread.mutateAsync(newThread);

            // Log pesan sukses
            console.log('Thread berhasil dibuat');

            setValueForm(initialThreadData);

            // Tutup modal
            onClose();
        } catch (error) {
            // Tangani kesalahan, misalnya menampilkan pesan kesalahan
            console.error('Error saat membuat thread:', error);
        }
    };

    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Text as={'h1'} fontWeight={'bold'} mt={'30px'} fontSize={'2xl'}>
                Beranda
            </Text>

            <Box
                display={'flex'}
                flexDirection={'row'}
                my={'20px'}
                background={'#474747'}
                borderRadius={'20px'}
                padding={'10px'}
                alignItems={'center'}
                gap={4}
            >
                <AvatarProfile />
                <Box width={'100%'}>
                    <Button
                        color={'grey'}
                        onClick={() => {
                            setOverlay(<OverlayOne />);
                            onOpen();
                        }}
                        width={'100%'}
                    >
                        <Text textAlign={'start'}>
                            Tulis thread Anda di sini
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
                                        <ModalHeader fontWeight={'bold'}>
                                            <Text textAlign={'justify'} width={'100px'}>
                                                Add Thread
                                            </Text>
                                        </ModalHeader>
                                        <ModalCloseButton />
                                    </Box>
                                    <ModalBody width={'100%'} background={'#404040'} borderRadius={'20px'}>
                                        <Box
                                            display={'flex'}
                                            flexDirection={'row'}
                                            my={'20px'}
                                            background={'#404040'}
                                            borderRadius={'20px'}
                                            padding={'10px'}
                                            alignItems={'center'}
                                            gap={4}
                                        >
                                            <AvatarProfile />

                                            {/* Tambah Konten Thread */}
                                            <Textarea
                                                placeholder="Whats Happenings?!"
                                                width={'100%'}
                                                background={'#404040'}
                                                name="content"
                                                id="content"
                                                border="none"
                                                height={'100px'}
                                                value={valueForm.content}
                                                onChange={(e) => setValueForm({ ...valueForm, content: e.target.value })}
                                            ></Textarea>
                                        </Box>
                                    </ModalBody>
                                    <ModalFooter width={'100%'} my={'10px'} display={'flex'} flexDirection={'column'}>
                                        <Box display={'flex'} alignItems={'center'} width={'100%'} justifyContent={'space-between'}>
                                            {/* Unggah Gambar */}
                                            <Box
                                                position={'relative'}
                                                background={'#404040'}
                                                display={'flex'}
                                                padding={'10px'}
                                                borderRadius={'10px'}
                                                alignItems={'center'}
                                                gap={'10px'}
                                            >
                                                <BiSolidImageAdd color={'green'} size={30} />
                                                <Text> Klik untuk Unggah </Text>
                                                <Input
                                                    position={'absolute'}
                                                    name="upload"
                                                    id="upload"
                                                    type="file"
                                                    placeholder="Tambahkan Tautan Gambar"
                                                    background={'#404040'}
                                                    border="none"
                                                    opacity={'0'}
                                                    padding={'10px'}
                                                    borderRadius={'10px'}
                                                    onChange={handleImageChange}
                                                ></Input>
                                            </Box>

                                            {/* Tombol Post Thread */}
                                            <Button
                                                background={'green'}
                                                padding={'10px'}
                                                width={'100px'}
                                                borderRadius={'20px'}
                                                onClick={handleCreateThread}
                                            >
                                                Post
                                            </Button>
                                        </Box>
                                        <Box display={'flex'} flexDirection={'column'} justifyItems={'start'} gap={'10px'}></Box>
                                    </ModalFooter>
                                </Box>
                            </Box>
                        </ModalContent>
                    </Modal>
                </Box>
                <BiSolidImageAdd color={'green'} size={50} />

                {/* Tombol Post Thread */}
                <Button background={'green'} padding={'10px'} width={'100px'} borderRadius={'20px'}>
                    Post
                </Button>
            </Box>
        </Box>
    );
}
