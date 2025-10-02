import { useState } from "react";

import { Box, Flex, Image, Button, HStack, VStack, Icon, Badge } from "@chakra-ui/react";
import { FaMinus, FaPlus, FaTruck, FaUndo } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { ButtonUI, TextUI, RatingUI, NumberInputUI } from "@ui";

const Product = () => {
  const [images, setImages] = useState([
	"https://cdn.discordapp.com/attachments/1287336506008141907/1421472653788577802/image.png?ex=68dfc092&is=68de6f12&hm=f423876c4bb2eaa831034f563dc8ccfd2d175a9e156993fe64e441b70f5c2ed4&",
	"https://cdn.discordapp.com/attachments/1287336506008141907/1419660969964998866/image.png?ex=68dfc0cf&is=68de6f4f&hm=7ad200e02d633227db3fbcc450c541b0351cc266004e27cd7e55bf8320660510&",
	"https://cdn.discordapp.com/attachments/1287336506008141907/1415002619218235452/image.png?ex=68df4921&is=68ddf7a1&hm=17783f94fa0c31ef815bf3e12ddf5b1e56d3466027ddaa43a22dd97ddf6084da&",
	"https://cdn.discordapp.com/attachments/1287336506008141907/1419952757019770880/image.png?ex=68df7f0e&is=68de2d8e&hm=8a0ce4546a09546a6e09395bb38cf0fb973ceb86b33644a252be565ae00a59b8&",
  ]);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(images[0]);
  const [product, setProduct] = useState({
    name: "Gaming Laptop",
    ratingCount: 4,
    isActive: true,
    averageRating: 2.5,
    price: 150,
    brand: "Asus",
    description: "Yüksek performanslı oyun laptopu",
    category: [
      { _id: "", name: "Teknoloji" },
      { _id: "", name: "Kozmetik" },
      { _id: "", name: "Gıda" },
    ],
  });
  return (
    <Flex justify="center" align="center" minH="100vh" px={{ base: 4, md: 10 }}>
      <Flex
        direction={{ base: "column", lg: "row" }}
        p={{ base: 4, md: 10 }}
        gap={{ base: 8, md: 16 }}
        align={{ base: "center", lg: "flex-start" }}
        w="full"
        maxW="1200px"
      >
        <VStack align="center" spacing={4} w={{ base: "100%", lg: "50%" }}>
          <Image
            src={mainImage}
            alt="Main Product"
            w={{ base: "100%", sm: "350px" }}
            h={{ base: "250px", sm: "350px" }}
            objectFit="contain"
            border="1px solid #eee"
            borderRadius="lg"
          />
          <HStack spacing={3} wrap="wrap" justify="center">
            {images.map((img, i) => (
              <Image
                key={i}
                src={img}
                boxSize="70px"
                objectFit="contain"
                border={mainImage === img ? "2px solid red" : "1px solid #ddd"}
                borderRadius="md"
                cursor="pointer"
                onClick={() => setMainImage(img)}
              />
            ))}
          </HStack>
        </VStack>

        <VStack
          align="flex-start"
          spacing={4}
          w={{ base: "100%", lg: "50%" }}
          maxW="500px"
		  gap={3}
        >
          <TextUI text={product.name} fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" />

          <Flex gap={1} wrap="wrap">
            <RatingUI
              readOnly
              value={product.averageRating}
              count={5}
              color="yellow"
            />
            <Flex gap={2} align="center">
              {product?.ratingCount && (
                <TextUI text={`(${product?.ratingCount})`} color="gray.500" />
              )}
              <TextUI text="|" color="gray.400" />
              {product?.isActive && (
                <TextUI text="Satışta" color="green.500" />
              )}
            </Flex>
          </Flex>

          <TextUI text={`${product.price}₺`} fontSize={{ base: "lg", md: "2xl" }} color="red.500" />

          <TextUI
            text={product.description}
            fontSize="md"
            color="gray.600"
          />

          <HStack spacing={2} wrap="wrap" mt={2}>
            {product?.category?.map((item, i) => (
              <Badge key={i} size="md">
                {item?.name}
              </Badge>
            ))}
          </HStack>

          <Flex gap={2} mt={3} wrap="wrap" align="center">
            {product?.brand && <TextUI text="Marka: " />}
            <Badge variant="outline" size="md">{product.brand}</Badge>
          </Flex>

          <HStack mt={2} w="full" justify={{ base: "center", lg: "flex-start" }}>
            <ButtonUI size="sm" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
              <Icon as={FaMinus} />
            </ButtonUI>

            <NumberInputUI control={false} value={quantity} width="120px" size="sm" />

            <ButtonUI
              size="sm"
              onClick={() => setQuantity(quantity + 1)}
              bg="#db4444"
              _hover={{ bg: "#c73333" }}
            >
              <Icon as={FaPlus} color="white" />
            </ButtonUI>
          </HStack>
		  
          <ButtonUI
            size="lg"
			mt={2}
			w={{ base: "80%", md: "60%" }} 
s            bg="#db4444"
            _hover={{ bg: "#c73333" }}
          >Satın Al <LuShoppingCart /></ButtonUI>
		  {/*
          <VStack align="flex-start" spacing={2} pt={4}>
            <HStack>
              <FaTruck />
              <TextUI text="Free Delivery" />
            </HStack>
            <HStack>
              <FaUndo />
              <TextUI text="30 Days Return Policy" />
            </HStack>
          </VStack>
		  */}
        </VStack>
      </Flex>
    </Flex>
  );
};

export default Product;
