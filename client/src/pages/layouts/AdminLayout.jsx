"use client";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { AccountSidebar, AdminSidebar } from "@pages";

export default function AdminLayout() {
  return (
	<>
		<Flex
		  pt={10}
		  direction={{ base: "column", md: "row" }}
		  w="100%"
		  minH="100vh"
		  p={{ base: 4, md: 10 }}
		  justify="center"
		  gap={{ base: 6, md: 10 }}
		>
		
		  <Box
			w={{ base: "100%", md: "250px" }}
			flexShrink={0}
		  >
		  
			<AdminSidebar />
		  </Box>

		  <Box
			flex="1"
			bg="white"
			p={{ base: 5, md: 10 }}
			rounded="2xl"
			boxShadow="md"
			maxW="800px"
			w="100%"
		  >
			<Outlet />
		  </Box>
		</Flex>
	</>
  );
}
