import {
    Box,
    Text,
} from '@chakra-ui/react'

import {
    AiFillGithub,
    AiFillLinkedin
} from "react-icons/ai";

export default function index() {
  return (
    <Box
        padding={'20px'}
        
    >
        <Box
            background={'#474747'}
            padding={'10px'}
            borderRadius={'10px'}
            display={'flex'}
        >
            <Box
                display={'flex'}
                flexDirection={'column'}
            >
                <Box
                    display={'flex'}
                    gap={'5px'}
                >
                    <Text
                    >
                        Developed By Marihots
                    </Text>
                    <AiFillGithub size={30}/>
                    <AiFillLinkedin size={30}/>
                </Box>
                <Box
                    display={'flex'}
                    gap={'5px'}
                >
                    <Text
                    >
                        Powered By Dumbways Indonesia #1 Coding Bootcamp
                    </Text>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}
