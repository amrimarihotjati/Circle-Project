import React from 'react'
import {
    Box,
    Text,
    Input,
    Button,
    InputGroup,
    InputRightElement
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { API } from '../libs/Api'
import { useNavigate } from 'react-router-dom'

// interface UserRegist {
//     full_name: string;
//     email: string;
//     password: string;
// }

export default function Register() {

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const [full_name, setFull_name] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [username, setUsername] = React.useState('')
    const navigate = useNavigate()

    const handleSubmitUser = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await API.post('/auth/users', {
                username: username,
                full_name: full_name,
                email: email,
                password: password
            })

            console.log('Response from server:', response.data)


            navigate('/auth/login')

        } catch (error) {
            console.error(error)
        }
    }



    return (
        <Box>
            <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'center'}
                height={'100vh'}
                width={'100vw'}
            >

                <Box
                >
                    <Text
                        color={"green"}
                        fontWeight={"bold"}
                        as={"h1"}
                        fontSize={'7xl'}
                    >circle</Text>
                    <Text
                        color={"white"}
                        fontWeight={"bold"}
                        fontSize={'2xl'}
                    >
                        Create account Circle
                    </Text>
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                    >
                        <Input
                            type='text'
                            required
                            placeholder='User Name'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            mt={'15px'}
                            mb={'5px'}
                            padding={'10px'}
                            w={'300px'}
                            background={'#0d0d0d'}
                            borderRadius={'10px'}
                        />
                        <Input
                            type='text'
                            required
                            placeholder='Full Name'
                            value={full_name}
                            onChange={(e) => setFull_name(e.target.value)}
                            mt={'15px'}
                            mb={'5px'}
                            padding={'10px'}
                            w={'300px'}
                            background={'#0d0d0d'}
                            borderRadius={'10px'}
                        />
                        <Input
                            type='email'
                            required
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            my={'5px'}
                            padding={'10px'}
                            w={'300px'}
                            background={'#0d0d0d'}
                            borderRadius={'10px'}
                        />
                        <InputGroup
                            size='md'
                            my={'5px'}
                        >
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                padding={'10px'}
                                w={'300px'}
                                background={'#0d0d0d'}
                                borderRadius={'10px'}
                                alignItems={'center'}
                            />
                            <InputRightElement
                                width='4.5rem'
                                alignContent={'center'}
                                alignItems={'center'}
                            >
                                <Button h='2.5rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Button
                            background={'green'}
                            color={'white'}
                            padding={'10px'}
                            borderRadius={'20px'}
                            my={'15px'}
                            onClick={handleSubmitUser}
                        >
                            Create
                        </Button>

                        <Box
                            display={'flex'}
                            gap={'5px'}>
                            <Text>
                                Already have account?
                            </Text>
                            <Text>
                                <Link to={'/auth/login'}>
                                    <Text
                                        color={'green'}
                                        fontWeight={'bold'}
                                    >
                                        Login
                                    </Text>
                                </Link>
                            </Text>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}
