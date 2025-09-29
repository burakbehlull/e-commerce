import { Flex, Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { Navbar } from '@components'

function HomeLayout() {
    return (
        <>
            <Flex direction="column" padding="15px">
				<Box
				  height="10vh"
				  display="flex"
				  alignItems="center"
				  justifyContent="center"
				  px={{base: 0, sm: 8, md: 8}}
				>
				  <Navbar />
				</Box>


				  <Box
					flex="1"
					pt={4}
				  >
					<Outlet />
				</Box>
			</Flex>
            
        </>
    )
}

export default HomeLayout;