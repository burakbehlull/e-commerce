"use client";

import { Box, Image, Badge, Flex, Stack, Icon } from "@chakra-ui/react";
import { TextUI, RatingUI } from "@ui";
import { HiOutlineEyeOff, HiOutlineEye, HiOutlinePencilAlt, HiOutlineTrash, } from "react-icons/hi";

export default function Card({
  name, image, price, oldPrice, ratingCount, 
  discountBadgeText, description, isPublished = true,
}) {
  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      w="100%"
      p="4"
      align={{ base: "flex-start", md: "center" }}
      direction={{ base: "column", md: "row" }}
      gap={{ base: 4, md: 6 }}
      bg="white"
      shadow="md"
    >
      <Box position="relative" w={{ base: "100%", md: "200px" }} flexShrink={0}>
        {discountBadgeText && (
          <Badge
            position="absolute"
            top="2"
            left="2"
            colorScheme="red"
            borderRadius="md"
          >
            {discountBadgeText}
          </Badge>
        )}
        <Image
          src={image}
          alt={name}
          borderRadius="lg"
          w="full"
          h={{ base: "200px", md: "180px" }}
          objectFit="cover"
        />
      </Box>

      <Stack flex="1" spacing="3" w="100%">
        <TextUI text={name} fontWeight="bold" fontSize="lg" />
        {description && (
          <TextUI
            text={description}
            color="gray.600"
            fontSize="sm"
            noOfLines={3}
          />
        )}

        <Flex align="center" gap="2">
          <TextUI
            text={price}
            as="span"
            color="red.500"
            fontWeight="bold"
            fontSize="lg"
          />
          {oldPrice && (
            <TextUI
              text={oldPrice}
              as="span"
              textDecoration="line-through"
              color="gray.400"
              fontSize="sm"
            />
          )}
        </Flex>

        <Flex align="center" fontSize="sm">
          <RatingUI
            readOnly={true}
            value={3}
            count={5}
            onValueChange={null}
            color="yellow"
          />
          {ratingCount && (
            <TextUI text={`(${ratingCount})`} ml="2" color="gray.500" />
          )}
        </Flex>
      </Stack>

      <Stack
        spacing={3}
        direction={{ base: "row", md: "column" }}
        align="center"
        justify="center"
        mt={{ base: 4, md: 0 }}
        w={{ base: "100%", md: "60px" }}
      >
        <Icon
          as={isPublished ? HiOutlineEyeOff : HiOutlineEye}
          aria-label={isPublished ? "Yayından Kaldır" : "Yayınla"}
          boxSize={7}
          color={isPublished ? "yellow.500" : "green.500"}
          cursor="pointer"
          _hover={{ color: isPublished ? "yellow.600" : "green.600" }}
        />
        <Icon
          as={HiOutlinePencilAlt}
          aria-label="Düzenle"
          boxSize={7}
          color="gray.700"
          cursor="pointer"
          _hover={{ color: "gray.800" }}
        />
        <Icon
          as={HiOutlineTrash}
          aria-label="Ürünü Sil"
          boxSize={7}
          color="red.500"
          cursor="pointer"
          _hover={{ color: "red.600" }}
        />
      </Stack>
    </Flex>
  );
}
