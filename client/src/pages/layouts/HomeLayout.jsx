import { Flex, Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { Navbar } from '@components'

function HomeLayout() {
    return (
        <>
            <Flex direction="column" padding="15px">
				<Box
				  height={{base: "14vh", sm: "12vh", md: "10vh"}}
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
					my={{
						base: 4,
						sm: 3,
						md: 2
					}}
					mx={{
						base: 3,
						sm: 5,
						md: 7
					}}
				  >
					<Outlet />
				</Box>
			</Flex>
            
        </>
    )
}

export default HomeLayout;