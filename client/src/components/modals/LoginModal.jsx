"use client"

import { useState, useEffect } from "react";
import { Button, Input,  Text, VStack, Heading, HStack, Link, Icon, Box, Flex } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

import { ModalUI, TextUI, ButtonUI, InputUI, AlertUI } from "@ui";

import { authAPI } from '@requests'
import { showToast } from "@partials"
import { useCookie } from "@helpers";
import { loginSchema } from '@schemas'

import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"

function LoginModal({clickRef}) {
	
  const [profile, setProfile] = useState({})
  const [apiError, setApiError] = useState({})

  
  const { register, handleSubmit, formState: { errors } } = useForm({
	  resolver: zodResolver(loginSchema),
  });
  const { setToken } = useCookie()
	
  async function loginHandle(data){
	  const result = await authAPI.login(data)
	
		
	  if(!result.status) {
		setApiError({
			status: result?.status===false,
			message: result?.message || result?.error?.response?.data?.errors?.map((item)=> `${item?.msg}`) ,
			error: result?.error
		})
		
		/* showToast({
			message: result?.message || result?.error,
			type: 'error',
			id: 'auth',
			duration: 2000
		}) */
		
		return
	  }
	  showToast({
		message: result?.message || "Giriş başarıyla yapıldı!",
		type: 'success',
		id: 'auth',
		duration: 2000
	  })
	  setToken(result.accessToken)
	  setProfile(result.data)
  }
  
  const onSubmit = (data) => {
	  loginHandle(data);
  }
  

  
  return (
    <>
		
      <ModalUI
        clickRef={clickRef}
        title="Log in to Exclusive"
      >
        <VStack spacing={4} align="stretch">
          
		  {JSON.stringify(apiError?.errors)}
		  <TextUI text="Enter your details below" textAlign="start" color="gray.600" fontSize="sm" />
          
		 {apiError?.status && <AlertUI description={apiError?.message} /> }

		  
		  <Flex
			direction="column"
			gap={4}
		  >
			  <InputUI
				placeholder="Email" 
				size="md" 
				variant="flushed" 
			    focusBorderColor="black"
				transition="all 0.2s"
				_focus={{ borderColor: "gray.200", boxShadow: "0 1px 0 0 gray.200" }}			  
				errorText={errors?.email?.message} 
				{...register('email')}
				
				helperText={errors?.email?.message}
				helperTextErrorManipulation
			  />
			  
			  <InputUI
				placeholder="Şifre" 
				type="password" 
				size="md" 
				variant="flushed" 
			    focusBorderColor="black"
				transition="all 0.2s"
				_focus={{ borderColor: "gray.200", boxShadow: "0 1px 0 0 gray.200" }}				
				
				{...register('password')}
				
				helperText={errors?.password?.message}
				helperTextErrorManipulation
				/>
		  </Flex>
		  
          <ButtonUI
			text="Sign In"
			mt={4}
			color="bg.100"
			bg="#ed3e3e"
			_hover= {{
				bg: '#db4444'
			}}
			w="full"
			onClick={handleSubmit(onSubmit)}
		  />

          <ButtonUI
            variant="outline"
            w="full"
          >
            <Icon as={FcGoogle} boxSize={5} /> Sign In with Google
          </ButtonUI>

          <HStack justify="center" mt={2}>
            <Link 
				fontSize="sm" 
				href="#"
				color="#db4444"
				_hover= {{
					color: '#ed3e3e'
				}}
			>
              Forgot Password
            </Link>
          </HStack>
        </VStack>
      </ModalUI>
    </>
  );
}

export default LoginModal;
