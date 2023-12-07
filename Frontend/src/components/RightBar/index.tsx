
import {
  Box,
} from "@chakra-ui/react"
import Profile from '../MyProfile'
import Suggested from "../SugestedFollows"
import Footer from "../Footer"


export default function index() {
  return (
    <Box
      mt={"30px"}
      position={{ base: 'sticky', md: 'sticky', lg: 'fixed' }}
    >
      <Profile />
      <Suggested />
      <Footer />
    </Box>
  )
}
