import { Flex, Box } from '@chakra-ui/react'

function Layout() {
    return (
        <>
            <Flex direction="column" padding="15px">
				<Box
				  height="10vh"
				  display="flex"
				  alignItems="center"
				  justifyContent="center"
				  // bg={{ base: "blue.500", _dark: "gray.800" }}
				  px={{base: 0, sm: 8, md: 8}}
				>
				  NAVBAR
				</Box>


				  <Box
					flex="1"
					pt={4}
				  >
					LAYOUT
				</Box>
			</Flex>
            
        </>
    )
}

export default Layout;