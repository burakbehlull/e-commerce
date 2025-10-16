"use client"
import { useState } from "react";

import { Button, Input, Text, VStack, Heading, HStack, Link, Icon, Box, Flex } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { ModalUI, TextUI, InputUI, ButtonUI, AlertUI } from "@ui";

import { authAPI } from '@requests'
import { registerSchema } from '@schemas'
import { showToast } from "@partials"

import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"


function RegisterModal({clickRef}) {
	
  const [profile, setProfile] = useState({})
  const [apiError, setApiError] = useState({})
  
  const { register, handleSubmit, formState: { errors } } = useForm({
	  resolver: zodResolver(registerSchema),
  });
  
  async function registerHandle(data){
	  const result = await authAPI.register(data)
	
	  if(!result.status) {
		setApiError({
			status: result?.status===false,
			message: result?.message || result?.error?.response?.data?.errors?.map((item)=> `${item?.msg}`) ,
			error: result?.error
		})
		/*showToast({
			message: result?.message || result?.error,
			type: 'error',
			id: 'auth',
			duration: 2000
		}) */
		
		return 
	  }
	  
	  setProfile(result.data)
  }
  
  const onSubmit = (data) => {
	  registerHandle(data)
  }
  
  return (
    <>
      <ModalUI
        clickRef={clickRef}
        title="Create an account"
      >
        <VStack spacing={4} align="stretch">
          <TextUI text="Enter your details below" textAlign="start" color="gray.600" fontSize="sm" />
          
		  {apiError?.status && <AlertUI description={apiError?.message} /> }

          <Flex
			direction="column"
			gap={4}
		  >
			  <InputUI 
				placeholder="Kullanıcı Adı" 
				size="md" 
				variant="flushed" 
			    focusBorderColor="black"
				transition="all 0.2s"
				_focus={{ borderColor: "gray.200", boxShadow: "0 1px 0 0 gray.200" }}
				helperText={errors?.username?.message}
				helperTextErrorManipulation
				{...register('username')}
			  />
			  <InputUI
				placeholder="Email" 
				size="md" 
				variant="flushed" 
			    focusBorderColor="black"
				transition="all 0.2s"
				_focus={{ borderColor: "gray.200", boxShadow: "0 1px 0 0 gray.200" }}			  
				helperText={errors?.email?.message}
				helperTextErrorManipulation
				{...register('email')}
			  />
			  <InputUI 
				placeholder="Şifre" 
				type="password" 
				size="md" 
				variant="flushed" 
			    focusBorderColor="black"
				transition="all 0.2s"
				_focus={{ borderColor: "gray.200", boxShadow: "0 1px 0 0 gray.200" }}			  		
				helperText={errors?.password?.message}
				helperTextErrorManipulation
				{...register('password')}
				/>
		  </Flex>
		  
          <ButtonUI
			mt={4}
			color="bg.100"
			bg="#ed3e3e"
			_hover= {{
				bg: '#db4444'
			}}
			w="full"
			onClick={handleSubmit(onSubmit)}
		  >
            Create Account
          </ButtonUI>

          <ButtonUI
            variant="outline"
            w="full"
          >
            <Icon as={FcGoogle} boxSize={5} /> Sign up with Google
          </ButtonUI>

          <HStack justify="center" mt={2}>
            <TextUI text="Already have account?" fontSize="sm" color="gray.600" />
              
            <Link fontSize="sm" color="blue.500" href="#">
              Log in
            </Link>
          </HStack>
        </VStack>
      </ModalUI>
    </>
  );
}

export default RegisterModal;
