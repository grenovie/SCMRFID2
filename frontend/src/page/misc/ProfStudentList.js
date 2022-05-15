import { ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import { Box, Button, Center, FormLabel, Image, Input, InputGroup, InputLeftElement, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Spacer, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SideDrawer from "../../drawer/SideDrawer";
import ProfDashboard from "./ProfDashboard";

const ProfStudentList = () => {

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      setOption(user.section)
    }
  }, []);

  const [option, setOption] = useState("");

  return <VStack spacing={10} align="stretch" w="100%">
  <Center h="100px" bg="green.200">
    <Image
      marginLeft={50}
      boxSize="75px"
      src="https://upload.wikimedia.org/wikipedia/en/d/dc/Universidad_de_Manila_Logo.png"
    />

    <Spacer />
    <Text color="#557B83" fontWeight="bold" fontSize="5xl">
      STUDENT LIST of {option}
    </Text>
    <Spacer />
    <Box p={3}>
      <SideDrawer />
    </Box>
  </Center>
  //2nd
  {/* <Center
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
        onChange={(e) => setOption(e.target.value)}
      />
      <InputRightElement pr={2} width='4.5rem'>
    <Button h='1.75rem' size='sm'> SUBMIT
    </Button>
  </InputRightElement>
    </InputGroup>
  </Center> */}
  //3rd
  <Center>
    <ProfDashboard opt={option} />
  </Center>
</VStack>
};

export default ProfStudentList;
