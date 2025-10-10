"use client";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { AccountSidebar } from '@pages'


export default function AccountLayout({children}) {
  return (
    <Flex w="100%" minH="100vh" p={10} justify="center">
      <AccountSidebar />

      <Box
        flex="1"
        bg="white"
        p={10}
        rounded="2xl"
        boxShadow="md"
        maxW="800px"
      >
        <Heading size="md" mb={8} color="red.500">
          Edit Your Profile
        </Heading>

		<Outlet />
      </Box>
    </Flex>
  );
}
