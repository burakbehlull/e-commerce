"use client";

import { useState, useEffect } from "react";
import { Box, Flex, Grid, GridItem, Heading, Stack } from "@chakra-ui/react";

import { TextUI, InputUI, ButtonUI, AlertUI } from "@ui";
import { userAPI } from "@requests";
import { showToast } from "@partials";
import { profileSchema } from "@schemas";

import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"

export default function MyAccount() {
  const [profile, setProfile] = useState({});
  const [apiError, setApiError] = useState({})
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
  });

  async function getProfile() {
    const result = await userAPI.meByToken();
    if (!result.status) { 
		showToast({
			message: result?.message || result?.error,
			type: "error",
			id: "profile",
			duration: 2000,
		});
		setApiError({
			status: result?.status===false,
			message: result?.message || result?.error?.response?.data?.errors?.map((item)=> `${item?.msg}`) ,
			error: result?.error
		})
	}
	reset(result.data)
    setProfile(result.data);
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Heading size="md" mb={8} color="red.500">
        Profil Düzenle
      </Heading>
	  
	  {apiError?.status && <AlertUI description={apiError?.message} /> }


      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={6}
      >
        <GridItem>
          <InputUI label="Görünen Ad" {...register('globalName')} />
        </GridItem>
        <GridItem>
          <InputUI label="Kullanıcı Adı" {...register('username')} />
        </GridItem>
        <GridItem>
          <InputUI label="E-Posta" type="email" {...register('email')} />
        </GridItem>
        <GridItem>
          <InputUI label="Telefon Numarası" type="phone" {...register('phone')} />
        </GridItem>
      </Grid>

      <Box mt={10}>
        <TextUI text="Şifre Değiştir" fontWeight="medium" mb={3} />
        <Stack spacing={4}>
          <InputUI placeholder="Mevcut Şifre" type="password" {...register('currentPassword')} />
          <InputUI placeholder="Yeni Şifre" type="password" {...register('password')} />
          <InputUI placeholder="Yeni Şifreyi Doğrula" type="password" {...register('confirmNewPassword')} />
        </Stack>
      </Box>

      <Flex
        justify={{ base: "center", md: "flex-end" }}
        direction={{ base: "column", sm: "row" }}
        align={{ base: "stretch", sm: "center" }}
        mt={10}
        gap={4}
      >
        <ButtonUI text="Çık" variant="ghost" w={{ base: "100%", sm: "auto" }} />
        <ButtonUI
          text="Değişiklikleri Kaydet"
          bg="red.500"
          color="white"
          _hover={{ bg: "red.600" }}
          w={{ base: "100%", sm: "auto" }}
        />
      </Flex>
    </>
  );
}
