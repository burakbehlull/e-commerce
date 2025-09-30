import { Box, Text, Button, Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

function NotFound() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="85vh"
      bg="white"
      textAlign="center"
      px={4}
    >
      <Text fontSize="6xl" fontWeight="bold" mb={4}>
        404 Sayfa Bulunamadı
      </Text>

      <Text fontSize="md" color="gray.600" mb={8}>
    Ziyaret ettiğiniz sayfa bulunamadı. Ana sayfaya gidebilirsiniz.
      </Text>

      <Button colorScheme="red" size="md" as="a" href="/">
        Anasayfaya Dön
      </Button>
    </Flex>
  );
}

export default NotFound;
