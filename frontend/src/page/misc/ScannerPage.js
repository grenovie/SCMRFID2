import {
  Box,
  Center,
  Text,
  Spacer,
  VStack,
  Container,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SideDrawer from "../../drawer/SideDrawer";
import Scanner from "../Scanner";
import Download from "./Download";
import StudentModal from "./StudentModal";

const ScannerPage = () => {
  const [student, setStudent] = useState([]);
  const [value, setValue] = useState();
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("studInfo"));
    if (user) {
      setStudent(user);
      setValue(user);
    }
  }, []);

  return (
    <VStack
      // divider={<StackDivider borderColor="gray.200" />}
      spacing={10}
      align="stretch"
      w="100%"
    >
      //1st part
      <Center h="100px" bg="green.200">
        <Image
          marginLeft={50}
          boxSize="75px"
          src="https://upload.wikimedia.org/wikipedia/en/d/dc/Universidad_de_Manila_Logo.png"
        />

        <Spacer />
        <Text color="#557B83" fontWeight="bold" fontSize="5xl">
          STUDENT SCANNER
        </Text>
        <Spacer />
        <Box p={3}>
          <SideDrawer />
        </Box>
      </Center>
      //2nd part
      <Center
        alignSelf="center"
        w="75%"
        borderRadius={30}
        h="40%"
        bg="green.100"
        pl="5%"
      >
        <Center alignSelf="center" h="200px" w="200px" bgColor="gray.200">
          <Image src={student.pic} alt={student.firstName} />
        </Center>
        {!value ? (
          <Container>
            <Text fontSize={50}> Please Tap Your ID. </Text>
          </Container>
        ) : (
          <Center
            flexDirection={"column"}
            alignItems={"flex-start"}
            h="75%"
            w="60%"
            p={5}
          >
            <Text fontWeight={"bold"} fontSize={30} p={2}>
              NAME: {student.firstName} {student.midName}. {student.surName}
            </Text>
            <Text fontWeight={"bold"} fontSize={30} p={2}>
              SECTION: {student.section}
            </Text>
            <Text fontWeight={"bold"} fontSize={30} p={2}>
              STUDENT ID: {student.studentId}
            </Text>
          </Center>
        )}
      </Center>
      <Spacer />
      //3rd part
      <Center>{/* <Download /> */}</Center>
      <Center p={5} h="50px" bg="green.500">
        <StudentModal />
        <Spacer />
        <Scanner />
      </Center>
    </VStack>
  );
};

export default ScannerPage;
