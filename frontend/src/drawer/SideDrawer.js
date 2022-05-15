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

const SideDrawer = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("studInfo");
    localStorage.removeItem("roomNum");
    localStorage.removeItem("buildingName");
    navigate("/");
  };
  const btnRef = React.useRef();
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
                onClick={() => navigate("/scanner")}
              >
                <Text fontSize={20}>Scanner </Text>
              </Box>
              {/* <Box
                borderRadius={5}
                as="button"
                h="40px"
                w="100%"
                bgColor="red.200"
                onClick={() => navigate("/scanner")}
              >
                <Text fontSize={20}>Scanner OUT</Text>
              </Box> */}
              <Box
                borderRadius={5}
                as="button"
                h="40px"
                w="100%"
                bgColor="green.200"
                onClick={() => navigate("/stud_list")}
              >
                <Text fontSize={20}>Student List</Text>
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

export default SideDrawer;
