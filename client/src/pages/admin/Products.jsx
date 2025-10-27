"use client";

import { useState, useEffect } from "react";
import { Box, Heading, Stack, Flex } from "@chakra-ui/react";
import { ButtonUI } from "@ui";
import { Card } from "@components";
import { showToast } from "@partials";
import { productAPI } from "@requests";

export default function Products() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const result = await productAPI.getProducts();

    if (!result?.status)
      return showToast({
        message: result?.message || result?.error,
        type: "error",
        id: "product",
        duration: 2000,
      });

    setProducts(result.products || []);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box w="100%" px={6} py={4}>
      <Heading size="md" mb={6} color="red.500">
        Ürünler
      </Heading>

      <Stack spacing={4}>
        {products.length > 0 ? (
          products.map((item, index) => (
            <Card
              key={index}
			  {...item}
              
            />
          ))
        ) : (
          <Box textAlign="center" color="gray.500">
            Ürün bulunamadı.
          </Box>
        )}
      </Stack>

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
    </Box>
  );
}
