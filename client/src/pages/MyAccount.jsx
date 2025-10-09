"use client";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function MyAccount() {
  return (
    <Flex w="100%" minH="100vh" p={10} justify="center">
      {/* Sidebar */}
      <Box w="250px" mr={10}>
        <Text fontWeight="bold" mb={4}>
          Manage My Account
        </Text>
        <Stack spacing={2} mb={6}>
          <Link color="red.500" fontWeight="semibold">
            My Profile
          </Link>
          <Link>Address Book</Link>
          <Link>My Payment Options</Link>
        </Stack>

        <Text fontWeight="bold" mb={4}>
          My Orders
        </Text>
        <Stack spacing={2} mb={6}>
          <Link>My Returns</Link>
          <Link>My Cancellations</Link>
        </Stack>

        <Text fontWeight="bold" mb={4}>
          My Wishlist
        </Text>
      </Box>

      {/* Main Content */}
      <Box
        flex="1"
        bg="white"
        p={10}
        rounded="2xl"
        boxShadow="md"
        maxW="800px"
      >
        <Heading size="md" mb={8} color="red.500">
          Edit Your Profile
        </Heading>

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
      </Box>
    </Flex>
  );
}
