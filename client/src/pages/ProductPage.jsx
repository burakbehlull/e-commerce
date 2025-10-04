import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

import { Box, Flex, Image, Button, HStack, VStack, Icon, Badge } from "@chakra-ui/react";
import { FaMinus, FaPlus, FaTruck, FaUndo } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";

import { showToast } from "@partials"

import { ButtonUI, TextUI, RatingUI, NumberInputUI } from "@ui";
import { productAPI } from '@requests'


const ProductPage = () => {
  const { productSlug, productId } = useParams()
  
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState([])
  const [mainImage, setMainImage] = useState(null);
  const [product, setProduct] = useState({
    name: null,
    description: null,
    isActive: false,
    averageRating: 0,
    ratingCount: 0,
    price: 0,
	slug: null,
	stock: 0,
	thumbnail: null,
    brand: null,
    category: [],
  });
  
  const getImages = async (productId, imagePaths) => {
		const imagesArr = []
		
		const thumbnail = await productAPI.getImage(productId);
		const thumbnailBlob = thumbnail.data;
		const thumbnailUrl = URL.createObjectURL(thumbnailBlob);
		imagesArr.push(thumbnailUrl);
		for (const [i, image] of [thumbnail, ...imagePaths].entries()) {
			try {
			  const res = await productAPI.getImage(productId, i);
			  const imageBlob = res.data;
			  const imageUrl = URL.createObjectURL(imageBlob);
			  imagesArr.push(imageUrl);
			  setMainImage(imagesArr[0])
			} catch (err) {
			  console.error(`Image ${i} yüklenemedi`, err);
			  continue;
			}
		}

		setImages(imagesArr);
	}


  const getProduct = async ()=> {
		  
	  if(productId) {
		  const result = await productAPI.getProductById(productId)
		  
		  if(!result.status) return showToast({
			message: result?.message || result?.error,
			type: 'error',
			id: 'product',
			duration: 2000
		  });
		  
		  setProduct(result.data)
		  await getImages(result.data.id, result.data.images)
		  return 
	  }
	  
	  const result = await productAPI.getProductBySlug(productSlug)
	  
	  if(!result.status) return showToast({
        message: result?.message || result?.error,
        type: 'error',
        id: 'product',
        duration: 2000
      });
	  
	  setProduct(result.data)
	  await getImages(result.data.id, result.data.images)
  }
  
  useEffect(()=> {
	  getProduct()
  }, [])
  
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

export default ProductPage;
