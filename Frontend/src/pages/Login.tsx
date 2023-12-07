import React from 'react'
import {
    Box,
    Text,
    Input,
    Button,

} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../libs/Api'
import { useDispatch } from 'react-redux'
import { AUTH_LOGIN, AUTH_CHECK } from '../store/rootReducer'




export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [valueForm, setValueForm] = React.useState({
        email: '',
        password: ''
    });

    async function handleLogin() {
        try {
            const response = await API.post("/auth/login", valueForm);
            dispatch(AUTH_LOGIN(response?.data));
            dispatch(AUTH_CHECK(response?.data.user));
            navigate("/");
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueForm({
            ...valueForm,
            [e.target.name]: e.target.value
        })
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
                        Login to Circle
                    </Text>
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                    >
                        <Input
                            type='email'
                            required
                            placeholder='Email/Username'
                            // value={valueForm.email}
                            onChange={handleChange}
                            name='email'
                            mt={'15px'}
                            mb={'5px'}
                            padding={'10px'}
                            w={'300px'}
                            background={'#0d0d0d'}
                            borderRadius={'10px'}
                        />
                        <Input
                            type='password'
                            required
                            placeholder='Password'
                            // value={valueForm.password}
                            onChange={handleChange}
                            name='password'
                            mt={'15px'}
                            my={'5px'}
                            padding={'10px'}
                            w={'300px'}
                            background={'#0d0d0d'}
                            borderRadius={'10px'}
                        />
                        <Text
                            textAlign={'right'}
                        >
                            Forgot password?
                        </Text>

                        <Button
                            background={'green'}
                            color={'white'}
                            padding={'10px'}
                            borderRadius={'20px'}
                            my={'15px'}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>

                        <Box
                            display={'flex'}
                            gap={'5px'}>
                            <Text>
                                Dont have an account yet?
                            </Text>
                            <Text>
                                <Link to={'/auth/register'}>
                                    <Text
                                        color={'green'}
                                        fontWeight={'bold'}
                                    >
                                        Create Account
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
