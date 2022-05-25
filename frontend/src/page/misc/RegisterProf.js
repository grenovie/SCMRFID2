import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  toast,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import AdminSideDrawer from "../../drawer/AdminSideDrawer";
import { useForm } from "react-hook-form";
import { ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";

const RegisterProf = () => {
  const [rfid, setRfid] = useState("");
  const [subject, setSubject] = useState("");
  const [professorId, setProfessorId] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lab, setLab] = useState("");
  const [sched, setSched] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [section, setSection] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  function refreshPage() {
    window.location.reload(false);
  }
  const submitHandler = async () => {
    setLoading(true);
    if (
      !rfid ||
      !professorId ||
      !fullName ||
      !username ||
      !password ||
      !lab ||
      !sched ||
      !timeStart ||
      !timeEnd ||
      !subject
    ) {
      toast({
        title: "Please Fill all the Feilds!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/admin/reg_professor",
        {
          rfid,
          professorId,
          fullName,
          username,
          password,
          lab,
          sched,
          timeStart,
          timeEnd,
          section,
          subject,
        },
        config
      );
      toast({
        title: "Registration Successful!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setLoading(false);
      setTimeout(() => {
        refreshPage();
      }, 3000);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
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
          REGISTER PROFESSOR
        </Text>
        <Spacer />
        <Box p={3}>
          <AdminSideDrawer />
        </Box>
      </Center>
      //2ndpart
      <Center
        borderRadius={20}
        alignSelf="center"
        h="75%"
        w="90%"
        bgColor="white"
      >
        <Box flexDirection="column">
          <FormControl id="rfid" isRequired>
            <FormLabel>RFID-TAG</FormLabel>
            <Input
              placeholder="Place ID Tags"
              onChange={(e) => setRfid(e.target.value)}
            />
          </FormControl>
          <FormControl id="professor_id" isRequired>
            <FormLabel>Professor ID</FormLabel>
            <Input
              placeholder="Professor ID"
              onChange={(e) => setProfessorId(e.target.value)}
            />
          </FormControl>
          <FormControl id="full_name" isRequired>
            <FormLabel>Fullname</FormLabel>
            <Input
              placeholder="FullName"
              onChange={(e) => setFullName(e.target.value)}
            />
          </FormControl>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box p={20}>
          <Box flexDirection="column">
            <FormControl id="subject" isRequired>
              <FormLabel>Subject</FormLabel>
              <Input
                placeholder="Subject"
                onChange={(e) => setSubject(e.target.value)}
              />
            </FormControl>
            <FormControl id="lab_room" isRequired>
              <FormLabel>Laboratory Room</FormLabel>
              <Input
                placeholder="Laboratory Room"
                onChange={(e) => setLab(e.target.value)}
              />
            </FormControl>
            <FormControl id="schedule" isRequired>
              <FormLabel>Schedule</FormLabel>
              <Input
                placeholder="Schedule"
                onChange={(e) => setSched(e.target.value)}
              />
            </FormControl>
            <FormControl id="time_start" isRequired>
              <FormLabel>Time Start</FormLabel>
              <Input
                placeholder="00:00:00 24 Hour Format"
                onChange={(e) => setTimeStart(e.target.value)}
              />
            </FormControl>
            <FormControl id="time_end" isRequired>
              <FormLabel>Time End</FormLabel>
              <Input
                placeholder="00:00:00 24 Hour Format"
                onChange={(e) => setTimeEnd(e.target.value)}
              />
            </FormControl>
          </Box>
        </Box>
        <Center flexDirection="column">
          <Box p={10}>
            <Button
              colorScheme="blue"
              variant="solid"
              width="100%"
              style={{ marginTop: 15 }}
              onClick={submitHandler}
              isLoading={loading}
            >
              Register
            </Button>
          </Box>
        </Center>
      </Center>
    </VStack>
  );
};

export default RegisterProf;
