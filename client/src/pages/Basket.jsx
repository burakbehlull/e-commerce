"use client";
import React from "react";

import { Box, Flex, HStack, Table, Image, useBreakpointValue } from "@chakra-ui/react";
import { NumberInputUI, ButtonUI, TextUI, InputUI } from "@ui";

export default function Basket() {
  const cartItems = [
    {
      id: 1,
      name: "LCD Monitor",
      price: 3650,
      quantity: 1,
      image:
        "https://cdn.discordapp.com/attachments/1287336506008141907/1421472653788577802/image.png?ex=68eb9e12&is=68ea4c92&hm=11928c812525a342af11795662e166968399ba00f595c635ec8934c4f840fb5b&",
    },
    {
      id: 2,
      name: "HI Garnepad",
      price: 1550,
      quantity: 2,
      image: "https://via.placeholder.com/80",
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box p={{ base: 4, md: 10 }} maxW="1200px" mx="auto">
      <TextUI display="flex" fontSize={{
			  base: 'sm',
			  md: 'lg'
		  }} color="gray.700" mb={6} gap={2}>
		  <TextUI text="Home /" />
		  <TextUI text="Cart" fontWeight="bold" />
	  </TextUI>

      <Box
        borderRadius="lg"
        overflowX="auto"
        
      >
        <Table.Root size="sm">
          <Table.Header>
            <Table.Row fontSize="md">
              <Table.ColumnHeader>Product</Table.ColumnHeader>
              <Table.ColumnHeader>Price</Table.ColumnHeader>
              <Table.ColumnHeader>Quantity</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Subtotal</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cartItems.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>
                  <Flex align="center" gap={3} direction={{ base: "column", sm: "row" }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      boxSize={{ base: "70px", md: "80px" }}
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <TextUI text={item.name} fontWeight="medium" textAlign={{ base: "center", sm: "left" }} />
                  </Flex>
                </Table.Cell>
                <Table.Cell fontWeight="semibold">{item.price} ₺</Table.Cell>
                <Table.Cell>
                  <NumberInputUI control 
				  value={item.quantity}
				  width={{ base: "100px", md: "130px" }} 
				  />
                </Table.Cell>
                <Table.Cell textAlign="end" fontWeight="bold">
                  {item.price * item.quantity} ₺
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>

      <Flex
        justify="space-between"
        mt={6}
        direction={{ base: "column", sm: "row" }}
        gap={4}
      >
        <ButtonUI text="Return To Shop" variant="outline" w={{ base: "100%", sm: "auto" }} />
        <ButtonUI text="Update Cart" variant="outline" w={{ base: "100%", sm: "auto" }} />
      </Flex>

      <Flex
        mt={10}
        gap={10}
        flexWrap="wrap"
        justify="space-between"
        direction={{ base: "column", lg: "row" }}
      >
      
		  <Flex
			  direction={{ base: "column", sm: "row" }}
			  gap={3}
			  align="stretch"
			  w={{ base: "100%", lg: "auto" }}
			>
			  <InputUI
				placeholder="Coupon Code"
				w={{ base: "100%", sm: "200px" }}
			  />
			  <ButtonUI
				text="Apply Coupon"
				colorScheme="red"
				w={{ base: "100%", sm: "auto" }}
			  />
			</Flex>

        <Box
          borderWidth="1px"
          borderRadius="md"
          p={5}
          flex="1"
          maxW={{ base: "100%", lg: "350px" }}
          shadow="sm"
          mt={{ base: 6, lg: 0 }}
        >
          <TextUI text="Cart Total" fontWeight="bold" mb={3} fontSize="lg" />

          <Flex justify="space-between" mb={2} py={2}>
            <TextUI text="Subtotal" />
            <TextUI text={`${subtotal}₺`} />
          </Flex>
          <Flex justify="space-between" mb={2} py={2}>
            <TextUI text="Shipping" />
            <TextUI text="free" color="green.500" />
          </Flex>
          <Flex
            justify="space-between"
            mb={4}
            py={2}
            borderTop="1px"
            borderColor="gray.200"
          >
            <TextUI text="Total" fontWeight="semibold" />
            <TextUI text={`${subtotal}₺`} fontWeight="bold" />
          </Flex>
          <ButtonUI
            text="Proceed to Checkout"
            w="100%"
            colorScheme="red"
            size="lg"
          />
        </Box>
      </Flex>
    </Box>
  );
}
