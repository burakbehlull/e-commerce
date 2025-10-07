"use client"

import { 
  Button, 
  Input, 
  Text, 
  VStack, 
  Heading, 
  HStack, 
  Link, 
  Icon, 
  Box, Flex
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { ModalUI } from "@ui";
import { useRef } from "react";

function RegisterModal() {
  const clickRef = useRef();

  return (
    <>
      <Button onClick={() => clickRef.current.click()} colorScheme="teal">
        Open Register
      </Button>

      <ModalUI
        clickRef={clickRef}
        title="Create an account"
        clickName="Kaydet"
      >
        <VStack spacing={4} align="stretch">
          <Text textAlign="center" color="gray.500" fontSize="sm">
            Enter your details below
          </Text>

          <Flex
			direction="column"
			gap={4}
		  >
			  <Input placeholder="Name" size="md" variant="flushed" />
			  <Input placeholder="Email or Phone Number" size="md" variant="flushed" />
			  <Input placeholder="Password" type="password" size="md" variant="flushed" />

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
            leftIcon={<Icon as={FcGoogle} boxSize={5} />}
            w="full"
          >
            Sign up with Google
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
