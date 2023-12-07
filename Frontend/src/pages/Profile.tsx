import { useGetProfile } from "../features/users/Hooks";
import {
    Box,
    Text,
    Avatar,
    Input,
    Textarea,
    Button,
    Flex
} from "@chakra-ui/react";
import { useState } from 'react'; // Import useState
import { useUpdateProfile } from "../features/users/Hooks"; // Sesuaikan dengan lokasi file sebenarnya

export default function Profile() {
    const { dataProfile } = useGetProfile();

    // State untuk menyimpan nilai-nilai yang akan diupdate
    const [updatedProfile, setUpdatedProfile] = useState({
        full_name: dataProfile?.full_name || '',
        username: dataProfile?.username || '',
        email: dataProfile?.email || '',
        bio: dataProfile?.bio || '',
    });

    // Fungsi untuk meng-handle perubahan nilai di input atau textarea
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdatedProfile({
            ...updatedProfile,
            [name]: value,
        });
    };

    // Fungsi untuk meng-handle pembaruan profil ketika tombol "Save" ditekan
    const { updateUserProfile } = useUpdateProfile();

    const handleSaveProfile = () => {
        updateUserProfile(updatedProfile);
    };

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            height={"100vh"}
        >
            <Box>
                <Text
                    as={'h1'}
                    fontWeight={'bold'}
                    mt={'30px'}
                    fontSize={'2xl'}
                >
                    Profile Details
                </Text>

                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    gap={4}
                    width={'100%'}
                    justifyContent={'space-between'}
                    alignItems={"center"}
                    position={"relative"}
                    my={"30px"}
                >
                    <Box
                        bg={'#474747'}
                        display={'flex'}
                        flexDirection={'column'}
                        width={'100%'}
                        height={'300px'}
                        background={"linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://i.cbc.ca/1.6990350.1696703095!/fileImage/httpImage/verstappen-champion-07102023.jpg')"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        borderRadius={"100px 10px 100px 10px"}
                    >
                        <Flex direction="column" alignItems="center" textAlign="center">
                            <Avatar
                                src={dataProfile?.photo_profile}
                                borderRadius="full"
                                size="2xl"
                                border="2px solid white"
                                boxSize="120px"
                                name={dataProfile?.full_name || "Unknown User"}
                                background="orange"
                                position="relative"
                            />

                            <Box
                                position="absolute"
                                boxSize="120px"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                borderRadius="100%" // Mengatur radius ke 50% untuk membuat latar belakang bulat
                                overflow="hidden" // Mengatur overflow menjadi hidden agar latar belakang yang lebih besar tidak terlihat
                            >
                                <Box
                                    bg="black"
                                    opacity={0.5}
                                    boxSize="100%" // Mengatur ukuran latar belakang
                                />
                                <Text
                                    top={"65%"}
                                    position="absolute"
                                    color="white"
                                    fontWeight="bold">
                                    Edit Profile
                                </Text>
                            </Box>
                        </Flex>

                    </Box>

                    <Box
                        width={"90%"}
                        bg={"#474747"}
                        display={'flex'}
                        justifyContent={"center"}
                        mx={"100px"}
                        borderRadius={"10px"}
                        p={"10px"}
                        flexDirection={"column"}
                        position={"absolute"}
                        top={"75%"}
                    >
                        <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            width={"100%"}
                            gap={"10px"}
                        >
                            <Box
                                width={"100%"}
                                className={dataProfile?.full_name}>
                                <Text px={"2px"} my={"7px"}>
                                    Full Name
                                </Text>
                                <Input
                                    type={"text"}
                                    name="full_name"
                                    placeholder={dataProfile?.full_name}
                                    value={updatedProfile.full_name}
                                    onChange={handleInputChange}
                                    w={"100%"}
                                    height={"40px"}
                                    bg={'#0d0d0d'}
                                    color={"white"}
                                    borderRadius={"5px"}
                                    border={"none"}
                                    padding={"10px"}
                                />
                            </Box>
                            <Box
                                width={"100%"}
                                className={dataProfile?.username}>
                                <Text px={"2px"} my={"7px"}>
                                    Username
                                </Text>
                                <Input
                                    type={"text"}
                                    name="username"
                                    placeholder={dataProfile?.username}
                                    value={updatedProfile.username}
                                    onChange={handleInputChange}
                                    w={"100%"}
                                    height={"40px"}
                                    bg={'#0d0d0d'}
                                    color={"white"}
                                    borderRadius={"5px"}
                                    border={"none"}
                                    padding={"10px"}
                                />
                            </Box>
                        </Box>

                        <Box className={dataProfile?.email}>
                            <Text px={"2px"} my={"7px"}>
                                Email
                            </Text>
                            <Input
                                type={"text"}
                                name="email"
                                placeholder={dataProfile?.email}
                                value={updatedProfile.email}
                                onChange={handleInputChange}
                                w={"100%"}
                                height={"40px"}
                                bg={'#0d0d0d'}
                                color={"white"}
                                borderRadius={"5px"}
                                border={"none"}
                                padding={"10px"}
                            />
                        </Box>
                        <Box className={dataProfile?.bio}>
                            <Text px={"2px"} my={"7px"}>
                                Bio
                            </Text>
                            <Textarea
                                name="bio"
                                placeholder={dataProfile?.bio}
                                value={updatedProfile.bio}
                                onChange={handleInputChange}
                                w={"100%"}
                                height={"100px"}
                                bg={'#0d0d0d'}
                                color={"white"}
                                borderRadius={"5px"}
                                border={"none"}
                                padding={"10px"}
                            />
                        </Box>
                        <Box
                            width={"100%"}
                            display={"flex"}
                            justifyContent={"end"}
                            my={"10px"}
                        >
                            <Button
                                bg={"purple"}
                                color={"white"}
                                width={"20%"}
                                height={"40px"}
                                borderRadius={"10px"}
                                border={"none"}
                                padding={"10px"}
                                onClick={handleSaveProfile}
                            >
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
