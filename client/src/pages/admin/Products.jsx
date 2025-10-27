"use client";

import { useState, useEffect } from "react";
import { Box, Flex, Grid, GridItem, Heading, Stack } from "@chakra-ui/react";
import { TextUI, InputUI, ButtonUI } from "@ui";
import { userAPI } from "@requests";
import { showToast } from "@partials";

export default function Products() {
  const [profile, setProfile] = useState({});

  return (
    <>
      <Heading size="md" mb={8} color="red.500">
        Ürünler
      </Heading>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={6}
      >
        <GridItem>
          <InputUI value="Md" label="Görünen Ad" />
        </GridItem>
        <GridItem>
          <InputUI value="Rimel" label="Kullanıcı Adı" />
        </GridItem>
        <GridItem>
          <InputUI value="rimel111@gmail.com" label="E-Posta" />
        </GridItem>
        <GridItem>
          <InputUI value="Kingston, 5236, United State" label="Telefon Numarası" />
        </GridItem>
      </Grid>

      {/* Password Section */}
      <Box mt={10}>
        <TextUI text="Password Changes" fontWeight="medium" mb={3} />
        <Stack spacing={4}>
          <InputUI placeholder="Current Password" type="password" />
          <InputUI placeholder="New Password" type="password" />
          <InputUI placeholder="Confirm New Password" type="password" />
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
