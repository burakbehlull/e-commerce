"use client";
import { useState } from "react";

import { Box, Flex, Heading, Stack, Textarea } from "@chakra-ui/react";
import { TextUI, ButtonUI } from "@ui";


export default function AddressBook() {
  const [address, setAddress] = useState(null)
  return (
    <>
      <Heading size="md" mb={8} color="red.500">
        Adresi Düzenle
      </Heading>

      <Box mt={10}>
        <Stack spacing={4}>
          <Textarea placeholder="Adresi Gir..." />
        </Stack>
      </Box>

      <Flex
        justify={{ base: "center", md: "flex-end" }}
        direction={{ base: "column", sm: "row" }}
        align={{ base: "stretch", sm: "center" }}
        mt={10}
        gap={4}
      >
        <ButtonUI text="Çık" variant="ghost" w={{ base: "100%", sm: "auto" }} />
        <ButtonUI
          text="Kaydet"
		  value={address}
		  onChange={(e)=>setAddress(e.target.value)}
          bg="red.500"
          color="white"
          _hover={{ bg: "red.600" }}
          w={{ base: "100%", sm: "auto" }}
        />
      </Flex>
    </>
  );
}
