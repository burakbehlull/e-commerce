import { Box, Flex, Link, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"

import { FiUser } from "react-icons/fi";
import { TiUser } from "react-icons/ti";

import { LuShoppingCart } from "react-icons/lu";
import { BiLogOut } from "react-icons/bi";


import { useRef } from "react";

import { RegisterModal, LoginModal } from '@modals'
import { TextUI, MenuUI, MenuItemUI } from "@ui";

export default function Navbar() {
	
    const navigate = useNavigate();
	const clickRegisterRef = useRef();
	const clickLoginRef = useRef();
	
    const handleNavigate = (path) => navigate(path);
    
    return (
		<>
			<RegisterModal clickRef={clickRegisterRef} />
			<LoginModal clickRef={clickLoginRef} />
			
            <Flex
                as="nav"
                align="center"
                justify="space-between"
                wrap="wrap"
                padding="1rem"
                margin={{
                    base: "1rem",
                    md: "0",
                    sm: "0"
                }}
                width="100%"
                gap={5}
                mt={{
                    base: 10,
                    md: 0,
                    lg: 0,
                }}
				borderBottom={{ base: "1px solid #e4e4e7", _dark: "1px solid #27272a" }} 
            >
                <Box flex="1">
                    <TextUI fontSize="xl" fontWeight="bold" color={{ base: "black", _dark: "white" }}>
						Shine Store
                    </TextUI>
                </Box>

                <Flex flex="1" justify="center" gap="2rem"
                >
                    <Link onClick={()=> handleNavigate('/')}>Home</Link>
                    <Link onClick={() => handleNavigate("/about")}>About</Link>
                    <Link onClick={() => handleNavigate("/contact")}>Contact</Link>
                </Flex>

                <Box flex="1" display="flex" gap={7}>
                    <Link 
						color="#db4444"
						_hover= {{
							color: '#ed3e3e'
						}}
					onClick={() => clickLoginRef.current.click()}>Login</Link>
                    <Link 
						color="#db4444"
						_hover= {{
							color: '#ed3e3e'
						}}
					onClick={() => clickRegisterRef.current.click()}>Register</Link>
					<Icon size="lg" 
						color="gray.700"
						cursor="pointer"
						onClick={()=> handleNavigate('/cart')}
					>
						<LuShoppingCart />
					</Icon>
					<MenuUI 
						content={<Icon size="lg" color="gray.700" cursor="pointer"><FiUser /></Icon>}
					>
						<MenuItemUI 
							text="profile" 
							onClick={()=> handleNavigate('/account')}
							value="profile"
						>
							<TiUser size={18} />
							Profile
						</MenuItemUI>
						<MenuItemUI>
							<BiLogOut size={18} />
							Logout
						</MenuItemUI>
					</MenuUI>
					
					
					
				</Box>
            </Flex>
		</>
    );
}
