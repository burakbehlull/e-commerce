"use client";

import {
  Box,
  Flex,
  Heading,
  Button,
  IconButton,
  HStack,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { TextUI } from "@ui";

export default function ProductsBar({ children, header, label }) {
  return (
    <Box
      px={{ base: 4, sm: 6, md: 12, lg: 20 }}
      py={{ base: 6, sm: 8, md: 10, lg: 14 }}
      maxW="100%"
      overflowX="hidden"
    >
	
      <Flex
        justify="space-between"
        align={{ base: "start", md: "center" }}
        direction={{ base: "column", md: "row" }}
        gap={{ base: 4, md: 0 }}
        mb={{ base: 6, md: 8 }}
      >
        <VStack align="start" spacing={1}>
          <TextUI fontWeight="medium" color="red.500" fontSize={{ base: "sm", sm: "md" }}>
            {header || ""}
          </TextUI>
          <Heading fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}>
            {label || ""}
          </Heading>
        </VStack>

        <HStack spacing={3} mt={{ base: 2, md: 0 }}>
          <IconButton
            aria-label="Previous"
            icon={<FiChevronLeft />}
            borderRadius="full"
            variant="outline"
            size={{ base: "sm", sm: "md" }}
          />
          <IconButton
            aria-label="Next"
            icon={<FiChevronRight />}
            borderRadius="full"
            variant="outline"
            size={{ base: "sm", sm: "md" }}
          />
        </HStack>
      </Flex>

      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        spacing={{ base: 4, sm: 6, md: 8 }}
		gap={20}
      >
        {children}
      </SimpleGrid>

      <Flex justify="center" mt={{ base: 8, md: 10 }}>
        <Button
          bg="red.500"
          color="white"
          _hover={{ bg: "red.600" }}
          px={{ base: 6, md: 10 }}
          py={{ base: 4, md: 6 }}
          borderRadius="md"
          fontSize={{ base: "sm", md: "md" }}
          w={{ base: "full", sm: "auto" }}
        >
          View All Products
        </Button>
      </Flex>
    </Box>
  );
}
