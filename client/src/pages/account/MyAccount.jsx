"use client";
import { Box, Flex, Grid, GridItem, Heading, Stack } from "@chakra-ui/react";
import { TextUI, InputUI, ButtonUI } from '@ui'

export default function MyAccount() {
  return (
	<>
		<Heading size="md" mb={8} color="red.500">
          Edit Your Profile
        </Heading>
        <Grid templateColumns={["1fr", "repeat(2, 1fr)"]} gap={6}>
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

        <Flex justify="flex-end" mt={10} gap={4}>
          <ButtonUI text="Cancel" variant="ghost" />
          <ButtonUI text="Save Changes" bg="red.500" color="white" _hover={{ bg: "red.600" }} />
            
		</Flex>
      
    </>
  );
}
