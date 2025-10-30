"use client";

import { useState } from "react";
import { Box, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";

import { InputUI, ButtonUI, SelectUI, FileUploadUI, AlertUI } from "@ui";
import { productAPI } from "@requests";
import { showToast } from "@partials";
import { productAddSchema } from "@schemas";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Products() {
  const [result, setResult] = useState({});
  const [apiError, setApiError] = useState({});
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState(null);
  const [selectBox, setSelectBox] = useState([]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(productAddSchema),
  });

  const items = [
    { label: 'he', value: 'he' },
    { label: 'qw', value: 'qwe' },
  ];

  async function handleProductAdd(data) {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("oldPrice", data.oldPrice);
    formData.append("stock", data.stock);
    formData.append("brand", data.brand);
    formData.append("discountBadgeText", data.discountBadgeText);

    if (thumbnail && thumbnail[0]) formData.append("thumbnail", thumbnail[0]);
    if (images && images.length > 0) {
      images.forEach(file => formData.append("images", file));
    }

    const result = await productAPI.createProduct(formData);

    if (!result.status) {
      setApiError({
        status: true,
        message: result?.message || result?.error?.response?.data?.errors?.map((i) => i?.msg),
        error: result?.error,
      });
      return;
    }

    showToast({
      message: result?.message || "Ürün oluşturuldu!",
      type: "success",
      id: "product",
      duration: 2000,
    });

    setResult(result.data);
  }

  const onSubmit = (data) => handleProductAdd(data);

  return (
    <Box px={{ base: 4, md: 10 }} py={6}>
      <Heading size="md" mb={8} color="red.500">
        Ürün Ekle
      </Heading>

      {apiError?.status && <AlertUI description={apiError?.message} mb={6} />}

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={6}
      >
        <GridItem>
          <InputUI
            label="Adı"
            helperText={errors?.name?.message}
            helperTextErrorManipulation
            {...register('name')}
          />
        </GridItem>

        <GridItem>
          <InputUI
            label="Açıklama"
            helperText={errors?.description?.message}
            helperTextErrorManipulation
            {...register('description')}
          />
        </GridItem>

        <GridItem>
          <InputUI
            label="Fiyat"
            helperText={errors?.price?.message}
            helperTextErrorManipulation
            {...register('price')}
          />
        </GridItem>

        <GridItem>
          <InputUI
            label="Eski Fiyatı"
            helperText={errors?.oldPrice?.message}
            helperTextErrorManipulation
            {...register('oldPrice')}
          />
        </GridItem>

        <GridItem>
          <InputUI
            label="Stok"
            helperText={errors?.stock?.message}
            helperTextErrorManipulation
            {...register('stock')}
          />
        </GridItem>

        <GridItem>
          <InputUI
            label="Marka"
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

      <Flex
        mt={10}
        gap={5}
        direction={{ base: "column", md: "row" }}
      >
        <FileUploadUI
          title="Thumbnail"
          maxFiles={1}
          onFilesChange={(filesObj) => setThumbnail(filesObj.acceptedFiles)}
        />
        <FileUploadUI
          title="Images"
          maxFiles={5}
          onFilesChange={(filesObj) => setImages(filesObj.acceptedFiles)}
        />
      </Flex>

      <Flex
        justify={{ base: "center", md: "flex-end" }}
        direction={{ base: "column", sm: "row" }}
        align={{ base: "stretch", sm: "center" }}
        mt={10}
        gap={4}
      >
        <ButtonUI
          text="Ekle"
          bg="red.500"
          color="white"
          _hover={{ bg: "red.600" }}
          w={{ base: "100%", sm: "auto" }}
          onClick={handleSubmit(onSubmit)}
        />
      </Flex>
    </Box>
  );
}
