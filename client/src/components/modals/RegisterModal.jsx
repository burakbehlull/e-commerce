"use client"

import { Button, Input, Text, VStack, Heading, HStack, Link, Icon, Box, Flex } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { ModalUI } from "@ui";

import { userAPI } from '@requests'

function RegisterModal({clickRef}) {
   
  return (
    <>
      <ModalUI
        clickRef={clickRef}
        title="Create an account"
      >
        <VStack spacing={4} align="stretch">
          <Text textAlign="start" color="gray.600" fontSize="sm">
            Enter your details below
          </Text>

          <Flex
			direction="column"
			gap={4}
		  >
			  <Input 
				placeholder="Name" 
				size="md" 
				variant="flushed" 
			    focusBorderColor="black"
				transition="all 0.2s"
				_focus={{ borderColor: "gray.200", boxShadow: "0 1px 0 0 gray.200" }}
			  />
			  <Input 
				placeholder="Email or Phone Number" 
				size="md" 
				variant="flushed" 
			    focusBorderColor="black"
				transition="all 0.2s"
				_focus={{ borderColor: "gray.200", boxShadow: "0 1px 0 0 gray.200" }}			  
			  />
			  <Input 
				placeholder="Password" 
				type="password" 
				size="md" 
				variant="flushed" 
			    focusBorderColor="black"
				transition="all 0.2s"
				_focus={{ borderColor: "gray.200", boxShadow: "0 1px 0 0 gray.200" }}			  		
				/>
		  </Flex>
		  
          <Button
			mt={4}
			color="bg.100"
			bg="#ed3e3e"
			_hover= {{
				bg: '#db4444'
			}}
		  w="full">
            Create Account
          </Button>

          <Button
            variant="outline"
            w="full"
          >
            <Icon as={FcGoogle} boxSize={5} /> Sign up with Google
          </Button>

          <HStack justify="center" mt={2}>
            <Text fontSize="sm" color="gray.600">
              Already have account?
            </Text>
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
