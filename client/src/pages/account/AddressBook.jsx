"use client";
import { Box, Flex, Heading, Stack, Textarea } from "@chakra-ui/react";
import { TextUI, ButtonUI } from "@ui";

export default function AddressBook() {
  return (
    <>
      <Heading size="md" mb={8} color="red.500">
        Edit Your Address
      </Heading>

      <TextUI text="Adres" />

      <Box mt={10}>
        <TextUI text="Address Changes" fontWeight="medium" mb={3} />
        <Stack spacing={4}>
          <Textarea placeholder="Enter your address..." />
        </Stack>
      </Box>

      <Flex
        justify={{ base: "center", md: "flex-end" }}
        direction={{ base: "column", sm: "row" }}
        align={{ base: "stretch", sm: "center" }}
        mt={10}
        gap={4}
      >
        <ButtonUI text="Cancel" variant="ghost" w={{ base: "100%", sm: "auto" }} />
        <ButtonUI
          text="Save Changes"
          bg="red.500"
          color="white"
          _hover={{ bg: "red.600" }}
          w={{ base: "100%", sm: "auto" }}
        />
      </Flex>
    </>
  );
}
