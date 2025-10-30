"use client";

import { useState, useEffect } from "react";
import { Box, Flex, Grid, GridItem, Heading, Stack } from "@chakra-ui/react";

import { TextUI, InputUI, ButtonUI, SelectUI } from "@ui";
import { productAPI } from "@requests";
import { showToast } from "@partials";
import { productAddSchema } from "@schemas";

import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"

export default function Products() {
	
  const [profile, setProfile] = useState({});
  const [selectBox, setSelectBox] = useState([]);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
	  resolver: zodResolver(productAddSchema),
  });
  
  const items = [{label: 'he', value: 'he'}, {label: 'qw', value: 'qwe'}]
  
  const onSubmit = (data) => {
	  console.log(data);
  }

  return (
    <>
      <Heading size="md" mb={8} color="red.500">
        Ürün Ekle
      </Heading>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={6}
      >
        <GridItem>
          <InputUI 
			label="Ürün Adı" 
			helperText={errors?.name?.message}
			helperTextErrorManipulation
			{...register('name')} 
			
		  />
        </GridItem>
        <GridItem>
          <InputUI
			label="Ürün Açıklaması" 
			helperText={errors?.description?.message}
			helperTextErrorManipulation
			{...register('description')} 
		  />
        </GridItem>
        <GridItem>
          <InputUI
			label="Ürün Fiyatı" 
			helperText={errors?.price?.message}
			helperTextErrorManipulation
			{...register('price')} 
		  />
        </GridItem>
		<GridItem>
          <InputUI
			label="Ürün Eski Fiyatı" 
			helperText={errors?.oldPrice?.message}
			helperTextErrorManipulation
			{...register('oldPrice')} 
		  />
        </GridItem>
		
		<GridItem>
          <InputUI
			label="Ürün Stoğu" 
			helperText={errors?.stock?.message}
			helperTextErrorManipulation
			{...register('stock')} 
		  />
        </GridItem>
		
        <GridItem>
          <InputUI
			label="Ürün Markası" 
			helperText={errors?.brand?.message}
			helperTextErrorManipulation
			{...register('brand')} 
		  />
        </GridItem>
		
		<GridItem>
          <InputUI
			label="İndirim" 
			helperText={errors?.discountBadgeText?.message}
			helperTextErrorManipulation
			{...register('discountBadgeText')} 
		  />
        </GridItem>
		
		<GridItem>
          <SelectUI
            value={selectBox}
            title="Kategori"
            items={items}
            setValue={(val) => setSelectBox(val)}
			multiple 
		  />
        </GridItem>
      </Grid>

      {/* Password Section */}
      <Box mt={10}>
        <TextUI text="Password Changes" fontWeight="medium" mb={3} />
        <Stack spacing={4}>
          <InputUI placeholder="Current Password" type="password" />
          <InputUI placeholder="New Password" type="password" />
          <InputUI placeholder="Confirm New Password" type="password" />
        </Stack>
      </Box>

      <Flex
        justify={{ base: "center", md: "flex-end" }}
        direction={{ base: "column", sm: "row" }}
        align={{ base: "stretch", sm: "center" }}
        mt={10}
        gap={4}
      >
        <ButtonUI
          text="Yarat"
          bg="red.500"
          color="white"
          _hover={{ bg: "red.600" }}
          w={{ base: "100%", sm: "auto" }}
		  onClick={handleSubmit(onSubmit)}
        />
      </Flex>
    </>
  );
}
