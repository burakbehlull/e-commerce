"use client"

import { useState, useEffect } from "react";
import { Button, Input,  Text, VStack, Heading, HStack, Link, Icon, Box, Flex } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

import { ModalUI, TextUI, ButtonUI, InputUI } from "@ui";

import { authAPI } from '@requests'
import { showToast } from "@partials"
import { useCookie } from "@helpers";
import { loginSchema } from '@schemas'

import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"



function LoginModal({clickRef}) {
  const [profile, setProfile] = useState({})
  
  const { register, handleSubmit, formState: { errors } } = useForm({
	  resolver: zodResolver(loginSchema),
  });
  const { setToken } = useCookie()
	
  async function loginHandle(data){
	  const result = await authAPI.login(data)
	
	  if(!result.status) return showToast({
        message: result?.message || result?.error,
        type: 'error',
        id: 'auth',
        duration: 2000
      });
	  setToken(result.accessToken)
	  setProfile(result.data)
  }
  
  const onSubmit = (data) => loginHandle(data);
  

  
  return (
    <>
      <ModalUI
        clickRef={clickRef}
        title="Log in to Exclusive"
      >
        <VStack spacing={4} align="stretch">
          <TextUI text="Enter your details below" textAlign="start" color="gray.600" fontSize="sm" />
            
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
				{...register('email')}
				errorText={errors?.email?.message} 
			  />
			  <InputUI
				placeholder="Password" 
				type="password" 
				size="md" 
				variant="flushed" 
			    focusBorderColor="black"
				transition="all 0.2s"
				_focus={{ borderColor: "gray.200", boxShadow: "0 1px 0 0 gray.200" }}			  		
				
				{...register('password')}
				errorText={errors?.password?.message} 
				
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
