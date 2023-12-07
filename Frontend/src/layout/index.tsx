import {
  Grid,
  GridItem
} from "@chakra-ui/react"
import { Outlet } from 'react-router-dom'
import LeftBar from '../components/LeftBar'
import RightBar from '../components/RightBar'

function index() {
  return (
    <Grid
      templateColumns='repeat(3, 1fr)'
      gap={6}
      alignItems={'center'}
    >
      <GridItem w='100%' h='100%' colSpan={{ base: 3, sm: 3, md: 3, lg: 1 }} borderX={'1px solid grey'}>
        <LeftBar />
      </GridItem>

      <GridItem w='100%' h='100%' colSpan={{ base: 3, sm: 3, md: 3, lg: 1 }} >
        <Outlet />
      </GridItem>

      <GridItem w='100%' h='100%' colSpan={{ base: 3, sm: 3, md: 3, lg: 1 }} borderX={'1px solid grey'}>
        <RightBar />
      </GridItem>
    </Grid>
  )
}

export default index