"use client";
import { Box, Flex, Grid, GridItem, Heading, Stack, Textarea } from "@chakra-ui/react";
import { TextUI, InputUI, ButtonUI } from '@ui'

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
            <Textarea placeholder="Comment..." />
          </Stack>
        </Box>

        <Flex justify="flex-end" mt={10} gap={4}>
          <ButtonUI text="Cancel" variant="ghost" />
          <ButtonUI text="Save Changes" bg="red.500" color="white" _hover={{ bg: "red.600" }} />
            
		</Flex>
      
    </>
  );
}
