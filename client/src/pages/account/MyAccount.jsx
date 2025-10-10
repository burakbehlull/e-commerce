"use client";
import { Box, Button, Flex, Grid, GridItem, Heading, Input, Link, Stack, Text } from "@chakra-ui/react";

export default function MyAccount() {
  return (
	<>
     

      {/* Main Content */}
      

        {/* Profile Fields */}
        <Grid templateColumns={["1fr", "repeat(2, 1fr)"]} gap={6}>
          <GridItem>
            <Text mb={1}>First Name</Text>
            <Input defaultValue="Md" />
          </GridItem>
          <GridItem>
            <Text mb={1}>Last Name</Text>
            <Input defaultValue="Rimel" />
          </GridItem>
          <GridItem>
            <Text mb={1}>Email</Text>
            <Input defaultValue="rimel111@gmail.com" />
          </GridItem>
          <GridItem>
            <Text mb={1}>Address</Text>
            <Input defaultValue="Kingston, 5236, United State" />
          </GridItem>
        </Grid>

        {/* Password Section */}
        <Box mt={10}>
          <Text fontWeight="medium" mb={3}>
            Password Changes
          </Text>
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
