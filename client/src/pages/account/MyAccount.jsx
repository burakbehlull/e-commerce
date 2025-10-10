"use client";
import { Box, Button, Flex, Grid, GridItem, Heading, Input, Stack } from "@chakra-ui/react";
import { TextUI } from '@ui'

export default function MyAccount() {
  return (
	<>
		<Heading size="md" mb={8} color="red.500">
          Edit Your Profile
        </Heading>
        <Grid templateColumns={["1fr", "repeat(2, 1fr)"]} gap={6}>
          <GridItem>
            <TextUI text="First Name" mb={1} />
            <Input defaultValue="Md" />
          </GridItem>
          <GridItem>
            <TextUI text="Last Name" mb={1} />
            <Input defaultValue="Rimel" />
          </GridItem>
          <GridItem>
            <TextUI text="Email" mb={1} />
            <Input defaultValue="rimel111@gmail.com" />
          </GridItem>
          <GridItem>
            <TextUI text="Address" mb={1} />
            <Input defaultValue="Kingston, 5236, United State" />
          </GridItem>
        </Grid>

        {/* Password Section */}
        <Box mt={10}>
          <TextUI text="Password Changes" fontWeight="medium" mb={3} />

          <Stack spacing={4}>
            <Input placeholder="Current Password" type="password" />
            <Input placeholder="New Password" type="password" />
            <Input placeholder="Confirm New Password" type="password" />
          </Stack>
        </Box>

        <Flex justify="flex-end" mt={10} gap={4}>
          <Button variant="ghost">Cancel</Button>
          <Button bg="red.500" color="white" _hover={{ bg: "red.600" }}>
            Save Changes
          </Button>
		</Flex>
      
    </>
  );
}
