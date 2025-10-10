"use client";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { AccountSidebar } from '@pages'


export default function AccountLayout() {
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
		<Outlet />
      </Box>
    </Flex>
  );
}
