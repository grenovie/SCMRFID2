import {
  Box,
  Center,
  Container,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import AdminSideDrawer from "../drawer/AdminSideDrawer";
import Script from "./Script";
const Admin = () => {
  return (
    <VStack spacing={10} align="stretch" w="100%">
      <Center h="100px" bg="green.200">
        <Image
          marginLeft={50}
          boxSize="75px"
          src="https://upload.wikimedia.org/wikipedia/en/d/dc/Universidad_de_Manila_Logo.png"
        />

        <Spacer />
        <Text color="#557B83" fontWeight="bold" fontSize="5xl">
          ADMIN
        </Text>
        <Spacer />
        <Box p={3}>
          <AdminSideDrawer />
        </Box>
      </Center>
      <Center>
        <Script />
      </Center>
    </VStack>
  );
};

export default Admin;
