import { ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Container,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AdminSideDrawer from "../../drawer/AdminSideDrawer";
import Chart from "./Chart";
import Dashboard from "./Dashboard";

const AdminStudentList = () => {
  const [filter, setFilter] = useState("");
  const [studentId, setStudentId] = useState("");

  const [option, setOption] = useState("");
  const [select, setSelect] = useState("");

  

  const handleClick = (e) => setSelect(e.target.value)

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
          STUDENT LIST
        </Text>
        <Spacer />
        <Box p={3}>
          <AdminSideDrawer />
        </Box>
      </Center>
      //2nd
      <Center
        p={5}
        flexDirection="row"
        borderRadius={10}
        alignSelf="center"
        w="1010px"
        h="100%"
        bgColor="white"
      >
        <FormLabel>Search:</FormLabel>
        <InputGroup maxW="450px" w="100%">
          <InputLeftElement
            pointerEvents="none"
            children={<Search2Icon color="black" />}
          />
          <Input
            color="gray"
            bgColor="gray.300"
            focusBorderColor="black"
            placeholder="Search by Student ID"
            _placeholder={{ color: "inherit" }}
          />
          <InputRightElement pr={2} width='4.5rem'>
        <Button p={2} h='1.75rem' size='sm'> SUBMIT
        </Button>
      </InputRightElement>
        </InputGroup>
        <Spacer />
        <Menu>
          <FormLabel>Section:</FormLabel>
          <MenuButton
            maxW="205px"
            w="100%"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {option}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={(e) => setOption("BSIT-32")}>BSIT-32</MenuItem>
            <MenuItem onClick={(e) => setOption("BSIT-33")}>BSIT-33</MenuItem>
          </MenuList>
        </Menu>
      </Center>
      //3rd
      <Center>
        <Dashboard opt={option} />
      </Center>
    </VStack>
  );
};

export default AdminStudentList;
