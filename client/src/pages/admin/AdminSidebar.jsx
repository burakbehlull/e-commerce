"use client";
import { Box, Link, Stack } from "@chakra-ui/react";
import { TextUI } from "@ui";
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const subPath = path.split("/")[2];

  const ILink = ({ name, path }) => (
    <Link
      color={subPath === path ? "red.500" : "gray.600"}
      fontWeight={subPath === path ? "semibold" : "medium"}
      _hover={{ color: "red.500" }}
      onClick={() => navigate(`/admin/${path}`)}
      fontSize={{ base: "sm", md: "md" }}
    >
      {name}
    </Link>
  );

  const basePath = (style) => (subPath === "" || !subPath ? style : null);

  return (
    <Box
      w="100%"
      bg={{ base: "white", md: "transparent" }}
      p={{ base: 4, md: 0 }}
      rounded="xl"
      boxShadow={{ base: "sm", md: "none" }}
    >
      <TextUI text="Yönetici Paneli" fontWeight="bold" mb={3} fontSize={{ base: "md", md: "lg" }} />

      <Stack spacing={2} mb={6}>
        <Link
          color={basePath("red.500") || "gray.600"}
          fontWeight={basePath("semibold") || "medium"}
          _hover={{ color: "red.500" }}
          onClick={() => navigate("/admin")}
          fontSize={{ base: "sm", md: "md" }}
        >
          Panel
        </Link>
        
      </Stack>

	  <TextUI text="Site" fontWeight="bold" mb={3} fontSize={{ base: "md", md: "lg" }} />
      <Stack spacing={2} mb={6}>
		<ILink name="Ürünler" path="products" />
        <ILink name="Kategoriler" path="category" />
      </Stack>

      <TextUI text="Diğer" fontWeight="bold" mb={3} fontSize={{ base: "md", md: "lg" }} />
      <Stack spacing={2} mb={6}>
	  
        <ILink name="Kullanıcılar" path="users" fontSize={{ base: "sm", md: "md" }} />
        {/* <Link fontSize={{ base: "sm", md: "md" }}>My Cancellations</Link> */}
      </Stack>
	  {/*
	  <TextUI text="My Orders" fontWeight="bold" mb={3} fontSize={{ base: "md", md: "lg" }} />
      <Stack spacing={2} mb={6}>
        <Link fontSize={{ base: "sm", md: "md" }}>My Returns</Link>
        <Link fontSize={{ base: "sm", md: "md" }}>My Cancellations</Link>
      </Stack>
	  

      <TextUI text="My Wishlist" fontWeight="bold" mb={3} fontSize={{ base: "md", md: "lg" }} />
    */}
	</Box>
  );
}
