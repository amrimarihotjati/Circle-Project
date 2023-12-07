import {
  Box
} from "@chakra-ui/react"
import PostBar from "../components/Post/AddThread"
import Threads from "../components/Threads"

// import CenterContent from '../components/CenterContent'

function Home() {
  return (
    <Box>
      <PostBar />
      <Threads />
    </Box>
  );
}

export default Home