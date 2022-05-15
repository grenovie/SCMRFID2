import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  Select,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
  Stack,
  InputGroup,
  InputLeftAddon,
  Input,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import LoginAdmin from "../loginPage/LoginAdmin";
import LoginStaff from "../loginPage/LoginStaff";
import LoginStudent from "../loginPage/LoginStudent";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Login = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(true);
  const [roomNum, setRoomNum] = useState("");
  const [bldgName, setBldgName] = useState("Building Name");
  const navigate = useNavigate();
  function refreshPage() {
    window.location.reload(false);
  }
  const colors = useColorModeValue(["green.100", "blue.100", "red.100"]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (!user) {
      navigate("/");
    }
  }, [navigate]);
  const submitHandler = () => {
    setLoading(true);
    if (!roomNum || !bldgName) {
      toast({
        title: "Please input Building Name and Room Number First",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    } else {
      setValue(false);
      localStorage.setItem("buildingName", bldgName);
      localStorage.setItem("roomNum", roomNum);
    }
    setLoading(false);
  };
  const [tabIndex, setTabIndex] = useState(0);
  const bg = colors[tabIndex];
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={bg}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize="4xl"
          fontFamily="Work sans"
          color="black"
          fontWeight="bold"
        >
          SCM-RFID System
        </Text>
      </Box>

      <Box bg={bg} w="100%" mt={4} p={4} borderRadius="lg" borderWidth="1px">
        <Tabs
          variant="soft-rounded"
          onChange={(index) => setTabIndex(index)}
          bg={bg}
        >
          <TabList mb="1em" borderRadius="20" bg="white">
            <Tab _selected={{ color: "black", bg: "green.50" }} width="50%">
              Professor
            </Tab>
            <Tab _selected={{ color: "black", bg: "blue.50" }} width="50%">
              Admin
            </Tab>
          </TabList>
          <TabPanels p="2rem">
            <TabPanel borderRadius="20" bg="white">
              <LoginStaff />
            </TabPanel>
            <TabPanel borderRadius="20" bg="white">
              <LoginAdmin />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Login;
