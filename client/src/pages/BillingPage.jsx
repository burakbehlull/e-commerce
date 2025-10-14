"use client";
import React from "react";
import {
  Box,
  Flex,
  HStack,
  VStack,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { TextUI, InputUI, ButtonUI, NumberInputUI, CheckboxUI } from "@ui";

export default function BillingPage() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box p={{ base: 4, md: 10 }} maxW="1100px" mx="auto">
      <TextUI
        text="Home / Checkout"
        fontSize="sm"
        color="gray.600"
        mb={4}
      />

      <Flex
        direction={{ base: "column", lg: "row" }}
        align="flex-start"
        gap={10}
      >
        {/* Billing Details */}
        <Box flex="1" w="100%">
          <TextUI
            text="Billing Details"
            fontWeight="bold"
            fontSize="xl"
            mb={5}
          />

          <VStack align="stretch" spacing={6} gap={4}>
            <InputUI label="First Name" required />
            <InputUI label="Company Name" />
            <InputUI label="Steet Address" required />
            
            <InputUI label="Apartment, floar, etc." />
            <InputUI label="Town/City" />
            <InputUI label="Phone Number" required />
            <InputUI label="Email Address" />
			
			<CheckboxUI label="Save this information for faster check-out next-time" />
          </VStack>
        </Box>

        {/* Order Summary */}
        <Box
          flex="1"
          borderWidth="1px"
          borderRadius="md"
          p={5}
          shadow="sm"
          w="100%"
          maxW={{ base: "100%", lg: "400px" }}
        >
          <TextUI
            text="Your Order"
            fontWeight="bold"
            fontSize="xl"
            mb={4}
          />

          <Flex justify="space-between" py={2}>
            <TextUI text="LCD Monitor" />
            <TextUI text="₺3650" fontWeight="semibold" />
          </Flex>

          <Flex justify="space-between" py={2}>
            <TextUI text="HI Garnepad × 2" />
            <TextUI text="₺3100" fontWeight="semibold" />
          </Flex>

          <Flex justify="space-between" py={2} borderTop="1px" borderColor="gray.200" mt={2}>
            <TextUI text="Subtotal" />
            <TextUI text="₺6750" fontWeight="medium" />
          </Flex>

          <Flex justify="space-between" py={2}>
            <TextUI text="Shipping" />
            <TextUI text="Free" color="green.500" />
          </Flex>

          <Flex justify="space-between" py={2} borderTop="1px" borderColor="gray.200" mt={2}>
            <TextUI text="Total" fontWeight="bold" />
            <TextUI text="₺6750" fontWeight="bold" />
          </Flex>

          
        </Box>
      </Flex>
    </Box>
  );
}
