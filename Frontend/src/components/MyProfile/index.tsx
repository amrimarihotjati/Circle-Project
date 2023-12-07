import {
  Box,
  Text,
  Image,
  Button,
  Avatar
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../store/type/RootState';



export default function Profile() {
  const navigate = useNavigate()
  const auth = useSelector((state: RootState) => state.auth);
  const authFullName = auth.full_name;
  const authProfile = auth.photo_profile;
  const authBio = auth.bio;
  const authFollowing = auth.following;
  const authFollowers = auth.followers;
  const authUsername = auth.username;

  const countFollowing = authFollowing?.length;
  const countFollowers = authFollowers?.length;

  const navigateEditProfile = () => {
    navigate('/profile')
  }


  return (
    <Box
      padding={'20px'}
    >
      <Box
        background={'#474747'}
        padding={'10px'}
        borderRadius={'10px'}
        display={'flex'}
        flexDirection={'column'}
      >
        <Text
          fontWeight={'bold'}
        >
          My Profile
        </Text>

        <Box
          position={'relative'}
          width={'100%'}
          height={'100px'}
          mb={'80px'}
        >
          <Image
            mt={'10px'}
            w={'100%'}
            height={'100px'}
            borderRadius={'5px'}
            src='https://i.cbc.ca/1.6990350.1696703095!/fileImage/httpImage/verstappen-champion-07102023.jpg'
            objectFit={'cover'}
          >
          </Image>
          <Box
            my={'10px'}
            display={'flex'}
            alignItems={'center'}
            position={'absolute'}
            top={'65px'}
            width={'100%'}
            left={'30px'}

          >
            <Avatar
              borderRadius='full'
              boxSize='80px'
              name={authFullName}
              background={'purple'}
              src={authProfile}
              border={'3px solid #474747'}
            />

          </Box>
        </Box>


        <Box>
          <Text
            fontWeight={'bold'}
            fontSize={'2xl'}
          >{authFullName}</Text>

          <Text
            color={'grey'}
          >{authUsername}</Text>

          <Text>
            {authBio}
          </Text>

          <Box
            display={'flex'}
            gap={'10px'}
          >
            <Box
              display={'flex'}
              gap={'5px'}
            >
              <Text
                color={'white'}
              >
                {countFollowing}
              </Text>
              <Text
                color={'grey'}
                fontWeight={'bold'}
              >
                Following
              </Text>
            </Box>

            <Box
              display={'flex'}
              gap={'5px'}
            >
              <Text
                color={'white'}
              >
                {countFollowers}
              </Text>
              <Text
                color={'grey'}
                fontWeight={'bold'}
              >
                Followers
              </Text>
            </Box>
          </Box>
          <Box
            display={'flex'}
            justifyItems={'end'}
            justifyContent={'end'}
          >
            <Button
              background={'purple'}
              px={'10px'}
              borderRadius={'8px'}
              color={'white'}
              padding={'10px'}
              onClick={navigateEditProfile}
            >
              Edit Profile
            </Button>
          </Box>
        </Box>

      </Box>

    </Box >
  )
}
