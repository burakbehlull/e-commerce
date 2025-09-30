import { Box, Text, Button, Flex } from "@chakra-ui/react";

function NotFound() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h={{ base: "70vh", md: "85vh" }}
      bg="white"
      textAlign="center"
      px={{ base: 4, md: 8 }}
    >
      <Text
        fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
        fontWeight="bold"
        mb={4}
      >
        404 Sayfa Bulunamadı
      </Text>

      <Text
        fontSize={{ base: "sm", md: "md" }}
        color="gray.600"
        mb={8}
        px={{ base: 2, md: 0 }}
      >
        Ziyaret ettiğiniz sayfa bulunamadı. Ana sayfaya gidebilirsiniz.
      </Text>

      <Button
        colorScheme="red"
        size={{ base: "sm", md: "md" }}
        as="a"
        href="/"
      >
        Anasayfaya Dön
      </Button>
    </Flex>
  );
}

export default NotFound;
