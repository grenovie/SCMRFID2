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

const RegisterStudent = () => {
  const [rfid, setRfid] = useState("");
  const [section, setSection] = useState("");
  const [firstName, setFirstname] = useState("");
  const [surName, setSurname] = useState("");
  const [midName, setMidname] = useState("");
  const [studentId, setStudentId] = useState("");
  const [gender, setGender] = useState("Select");
  const [program, setProgram] = useState("Select");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [present, setPresent] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const toast = useToast();
  function refreshPage() {
    window.location.reload(false);
  }

  const submitHandler = async () => {
    setLoading(true);
    if (
      !rfid ||
      !section ||
      !firstName ||
      !surName ||
      !midName ||
      !studentId ||
      !gender ||
      !program ||
      !email ||
      !address ||
      !password
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
        "/api/admin/register",
        {
          rfid,
          section,
          firstName,
          surName,
          midName,
          studentId,
          gender,
          program,
          email,
          address,
          pic,
          password,
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
  // console.log(gender);

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "reg-stud");
      data.append("cloud_name", "dspuitrqr");
      fetch("https://api.cloudinary.com/v1_1/dspuitrqr/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
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
          REGISTER STUDENT
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
          <FormControl id="student-id" isRequired>
            <FormLabel>Student ID</FormLabel>
            <Input
              placeholder="Student ID"
              onChange={(e) => setStudentId(e.target.value)}
            />
          </FormControl>

          <FormControl id="first-name" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              placeholder="First Name"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </FormControl>
          <FormControl id="surname" isRequired>
            <FormLabel>Surname</FormLabel>
            <Input
              placeholder="Surname"
              onChange={(e) => setSurname(e.target.value)}
            />
          </FormControl>
          <FormControl id="middle-name" isRequired>
            <FormLabel>Middle Name</FormLabel>
            <Input
              placeholder="Middle Name"
              onChange={(e) => setMidname(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box p={20} flexDirection="column">
          <Box flexDirection="column">
            <Menu>
              <FormLabel>Gender</FormLabel>
              <MenuButton w="100%" as={Button} rightIcon={<ChevronDownIcon />}>
                {gender}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={(e) => setGender("F")}>Female</MenuItem>
                <MenuItem onClick={(e) => setGender("M")}>Male</MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <FormLabel>Course</FormLabel>
              <MenuButton
                w="100%"
                maxW="205px"
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                <Text isTruncated={true}>{program}</Text>
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={(e) =>
                    setProgram("Bachelor of Science in Information Technology")
                  }
                >
                  Bachelor of Science in Information Technology
                </MenuItem>
                <MenuItem onClick={(e) => setProgram("")}>...</MenuItem>
              </MenuList>
            </Menu>
          </Box>

          <FormControl id="section" isRequired>
            <FormLabel>Section</FormLabel>
            <Input
              placeholder="Section"
              onChange={(e) => setSection(e.target.value)}
            />
          </FormControl>
          <FormControl id="email-add" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="address" isRequired>
            <FormLabel>Home Address</FormLabel>
            <Input
              placeholder="Home Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>
        </Box>
        <Center flexDirection="column">
          <FormControl id="pic">
            <FormLabel>Upload your Picture</FormLabel>
            <Input
              type="file"
              p={1.5}
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0])}
            />
          </FormControl>
          <FormControl id="student-id" isRequired>
            <FormLabel>Backup Key for Attendance</FormLabel>
            <Input
              placeholder="Password for Attendance"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
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

export default RegisterStudent;
