import { Box, Image, Badge, Flex, Stack } from "@chakra-ui/react";
import { TextUI, RatingUI, ButtonUI } from "@ui"

export default function ProductCard({name, image, price, oldPrice, ratingCount, discountBadgeText}) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" w="56" p="4">
      <Box position="relative">
	  {discountBadgeText && <Badge
          position="absolute"
          top="2"
          left="2"
          colorScheme="red"
          borderRadius="md"
        >
		{discountBadgeText}
	  </Badge> }
        <Image
          src={image}
          alt={name}
          borderRadius="lg"
          mx="auto" />
      </Box>

      <Stack mt="3" spacing="1">
        <TextUI text={name} fontWeight="medium" fontSize="sm" />
		
        <TextUI>
			<TextUI text={price} as="span" color="red.500" fontWeight="bold" fontSize="lg" />
			{" "}
			{oldPrice && <TextUI text="$150" as="span" textDecoration="line-through" color="gray.400" /> }
        
		</TextUI>
		
        <Flex align="center" fontSize="sm">
          <RatingUI readOnly={true} value={3} count={5} onValueChange={null} color="yellow" />
		  
		  {ratingCount && <TextUI text={`(${ratingCount})`}  ml="2" color="gray.500" />}
        </Flex>
		
		<ButtonUI text="Add To Cart" />
      </Stack>
    </Box>
  );
}