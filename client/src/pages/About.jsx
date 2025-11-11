"use client";

import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

export default function About() {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align="center"
      justify="center"
      px={{ base: 6, md: 16 }}
      py={{ base: 10, md: 20 }}
      bg="white"
    >
      <Box flex="1" pr={{ md: 10 }} mb={{ base: 10, md: 0 }}>
        <Heading
          as="h2"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          mb={4}
        >
          Our Story
        </Heading>
        <Text color="gray.600" fontSize="md" lineHeight="tall">
          Launched in 2016, Exclusive is South Asia’s premier online shopping
          marketplace with an active presence in Bangladesh. Supported by a wide
          range of tailored marketing, data and service solutions, Exclusive has
          10,500 sellers and 300 brands and serves 3 millions customers across
          the region.
          <br />
          <br />
          Exclusive has more than 1 Million products to offer, growing at a very
          fast. Exclusive offers a diverse assortment in categories ranging from
          consumer.
        </Text>
      </Box>


      <Box flex="1" textAlign="center">
        <Image
          src=""
          alt="Shopping women"
          borderRadius="md"
          objectFit="cover"
          w="100%"
          maxW="450px"
          mx="auto"
        />
      </Box>
    </Flex>
  );
}
