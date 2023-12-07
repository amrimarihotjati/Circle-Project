import {
  AiFillHome,
  AiOutlineMeh,
  AiOutlineLogout
} from "react-icons/ai";

import { TbUserSearch } from "react-icons/tb";
import { RiHeartAddLine } from "react-icons/ri"

import {
  Box,
  Text,
  Button
} from "@chakra-ui/react"

import { Link } from "react-router-dom";
import { AUTH_LOGOUT } from "../../store/rootReducer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Index() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(AUTH_LOGOUT());
      navigate('/auth/login');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box
      display={'flex'}
      padding={'10px'}
      gap={'10px'}
      flexDirection={'column'}
      alignItems={{ base: 'center', md: 'center', lg: 'flex-start' }}
      className="leftbar"
      position={{ base: 'sticky', md: 'sticky', lg: 'fixed' }}
      left={'10%'}
      height={{ sm: 'fit-content', md: 'fit-content', lg: '100vh' }}
    >
      <Box>
        <Text
          color={"green"}
          fontWeight={"bold"}
          as={"h1"}
          fontSize={'7xl'}
        >circle</Text>
      </Box>

      <Box
        display={'flex'}
        flexDirection={'row'}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          className="navbar-icon">
          <Box>
            <Link to={'/'}>
              <Text
                my={"10px"}
                display={"flex"}
                gap={2}
                alignItems={"center"}
                fontSize={'20px'}
              >
                <AiFillHome size={20} />
                Home
              </Text>
            </Link>
          </Box>

          <Box>
            <Link to={'/search'} >
              <Text
                my={"10px"}
                display={"flex"}
                gap={2}
                alignItems={"center"}
                fontSize={'20px'}
              >
                <TbUserSearch size={20} />
                Search
              </Text>
            </Link>
          </Box>

          <Box>
            <Link to={'/follow'} >
              <Text
                my={"10px"}
                display={"flex"}
                gap={2}
                alignItems={"center"}
                fontSize={'20px'}
              >
                <RiHeartAddLine size={20} />
                Follow
              </Text>
            </Link>
          </Box>

          <Box>
            <Link to={'/profile'} >
              <Text
                my={"10px"}
                display={"flex"}
                gap={2}
                alignItems={"center"}
                fontSize={'20px'}
              >
                <AiOutlineMeh size={20} />
                Profile
              </Text>
            </Link>
          </Box>
        </Box>
      </Box>

      <Button
        background={'green'}
        width={"200px"}
        borderRadius={'30px'}
        height={{ sm: '50px', lg: '100px' }}
      >
        Created Post
      </Button>

      <Box
        // mt={{ sm: '0%', lg: '100%' }}
        height={'100%'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'flex-end'}
        mb={'5%'}
      >

        <Button
          display={"flex"}
          gap={2}
          alignItems={"center"}
          fontSize={'10px'}
          color={"white"}
          onClick={handleLogout}
          background={'red'}
          borderRadius={'30px'}
          padding={'10px'}
        >
          <AiOutlineLogout size={20} />
          LogOut
        </Button>
      </Box>
    </Box>
  )
}
