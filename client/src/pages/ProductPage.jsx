import { Box, Flex,Image, Button, HStack, VStack, Icon } from "@chakra-ui/react";
import { FaMinus, FaPlus, FaTruck, FaUndo } from "react-icons/fa";
import { useState } from "react";
import { ButtonUI, TextUI, RatingUI, NumberInputUI } from "@ui"

const Product = () => {
  const images = [
    "https://cdn.discordapp.com/attachments/1287336506008141907/1418547788681056277/image.png?ex=68dd0594&is=68dbb414&hm=8a857d486ead7da0c6a56631ad097a23aa94b21e1137644c9b27f150552eff3e&",
    "https://cdn.discordapp.com/attachments/1287336506008141907/1418549020837675059/image.png?ex=68dd06b9&is=68dbb539&hm=5dc7bd928664fac0307eefa783a039a06a81c82e75652ccd58d513c15128b7b9&",
    "https://cdn.discordapp.com/attachments/1287336506008141907/1419637164852903956/image.png?ex=68dd07a3&is=68dbb623&hm=ac09067170a7cc68c329dc680e71a39b287ac9f3828f1372f63743ea8e829405&",
    "https://cdn.discordapp.com/attachments/1287336506008141907/1419659257137201162/image.png?ex=68dd1c36&is=68dbcab6&hm=883c1ee3bf9291a478dacbb2365325b52483462321c9d859456674bd0c81b4a3&",
  ];

  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <Flex justify="center" align="center" minH="100vh">
      <Flex p={10} gap={16} align="flex-start">
        <VStack align="center" spacing={4}>
          <Image
            src={mainImage}
            alt="Main Product"
            boxSize="350px"
            objectFit="contain"
            border="1px solid #eee"
            borderRadius="lg"
          />
          <HStack spacing={3}>
            {images.map((img, i) => (
              <Image
                key={i}
                src={img}
                boxSize="80px"
                objectFit="contain"
                border={mainImage === img ? "2px solid red" : "1px solid #ddd"}
                borderRadius="md"
                cursor="pointer"
                onClick={() => setMainImage(img)}
              />
            ))}
          </HStack>
        </VStack>

        <VStack align="flex-start" spacing={4} maxW="400px">
          <TextUI text="Havic HV G-92 Gamepad" fontSize="2xl" fontWeight="bold" />
            
          <TextUI text=" $192.00" fontSize="xl" color="red.500" />
           
          <TextUI 
		  text="PlayStation 5 Controller Skin. High quality vinyl with air channel
            adhesive for easy bubble free install & mess free removal. Pressure
            sensitive."
		  fontSize="sm" color="gray.600" />
            

          <HStack spacing={2}>
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <Button key={size} size="sm" variant="outline">
                {size}
              </Button>
            ))}
          </HStack>

          <HStack>
			<ButtonUI
			  
			  size={"sm"}
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
			>
				<Icon 
					size={"sm"}
					color={{ base: "white", _dark: "gray.100" }}
				>
					<FaMinus />
				</Icon>
			</ButtonUI>
			
			
			<NumberInputUI
				control={false}
				value={quantity} 
				width="200px" 
				size="sm"	
			/>
			
			
			<ButtonUI 
			  size={"sm"}
              onClick={() => setQuantity(quantity + 1)}
				
			>
				<Icon 
					size={"sm"}
					color={{ base: "white", _dark: "gray.100" }}
				>
					<FaPlus />
				</Icon>
			</ButtonUI>
			
          </HStack>

          <ButtonUI text="Buy Now" colorScheme="red" size="lg" w="full"/>

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
        </VStack>
      </Flex>
    </Flex>
  );
};

export default Product;
