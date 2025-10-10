"use client";
import { Box, Link, Stack } from "@chakra-ui/react";
import { ButtonUI, TextUI, RatingUI, NumberInputUI } from "@ui";

export default function AccountSidebar() {
  return (
      <Box w="250px" mr={10}>
        <TextUI text="Manage My Account" fontWeight="bold" mb={4} />
          
        <Stack spacing={2} mb={6}>
          <Link color="red.500" fontWeight="semibold">
            My Profile
          </Link>
          <Link>Address Book</Link>
          <Link>My Payment Options</Link>
        </Stack>

        <TextUI text="My Orders" fontWeight="bold" mb={4} />
          
        <Stack spacing={2} mb={6}>
          <Link>My Returns</Link>
          <Link>My Cancellations</Link>
        </Stack>

        <TextUI text="My Wishlist" fontWeight="bold" mb={4} />
      </Box>
  );
}
