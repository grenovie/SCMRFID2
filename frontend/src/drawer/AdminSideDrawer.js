import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";

const AdminSideDrawer = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  const btnRef = React.useRef();
  function handleClick() {
    const url = "https://account.mongodb.com/account/login";
    window.open(url, "_blank");
  }
  function handleClickDashB() {
    const url = "https://charts.mongodb.com/charts-scm-rfid-dzrqs/dashboards";
    window.open(url, "_blank");
  }

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent flexDirection="column">
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box
                borderRadius={5}
                as="button"
                h="40px"
                w="100%"
                bgColor="green.200"
                onClick={() => navigate("/admin")}
              >
                <Text fontSize={20}>Home</Text>
              </Box>
              <Box
                borderRadius={5}
                as="button"
                h="40px"
                w="100%"
                bgColor="green.200"
                onClick={() => navigate("/register_stud")}
              >
                <Text fontSize={20}>Register Student</Text>
              </Box>
              <Box
                borderRadius={5}
                as="button"
                h="40px"
                w="100%"
                bgColor="green.200"
                onClick={() => navigate("/admin_studlist")}
              >
                <Text fontSize={20}>Student List</Text>
              </Box>
              <Box
                borderRadius={5}
                as="button"
                h="40px"
                w="100%"
                bgColor="green.200"
                onClick={handleClick}
              >
                <Text fontSize={20}>MongoDB Atlas</Text>
              </Box>
              <Box
                borderRadius={5}
                as="button"
                h="40px"
                w="100%"
                bgColor="green.200"
                onClick={handleClickDashB}
              >
                <Text fontSize={20}>MongoDB Dashboard</Text>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={logoutHandler}>
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AdminSideDrawer;
