"use client";
import { Box, Link, Stack } from "@chakra-ui/react";
import { TextUI } from "@ui";
import { useLocation,useNavigate } from "react-router-dom"

export default function AccountSidebar() {
	
  const location = useLocation();
  const navigate = useNavigate();
  
  const path = location.pathname; 
  const subPath = path.split("/")[2];
  
  const ILink = ({name, path})=>{
	  return (
		<Link 
			color={subPath==path ? "red.500" : null}
			fontWeight={subPath==path ? "semibold" : null}

			onClick={()=> navigate(`/account/${path}`)}
		>
			{name}
		</Link>
	  )
  }
  const basePath = (style)=> subPath=="" || !subPath ? style: null
  
  return (
      <Box w="250px" mr={10}>
        <TextUI text="Profilini Yönet" fontWeight="bold" mb={4} />
          
        <Stack spacing={2} mb={6}>
		  <Link color={basePath("red.500")} 
			fontWeight={basePath("semibold")}
			onClick={()=> navigate("/account")}
		  >
            Profil
          </Link>
          <ILink name="Adres" path="address" />
        </Stack>

        <TextUI text="My Orders" fontWeight="bold" mb={4} />
          
        <Stack spacing={2} mb={6}>
          <Link>My Returns</Link>
          <Link>My Cancellations</Link>
        </Stack>

        <TextUI text="My Wishlist" fontWeight="bold" mb={4} />
      </Box>
  );
}
