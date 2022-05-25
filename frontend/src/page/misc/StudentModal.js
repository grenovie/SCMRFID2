import {
  Button,
  Input,
  useToast,
  InputRightElement,
  InputGroup,
  useDisclosure,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentModal = () => {
  const [show, setShow] = useState(false);
  const [studentId, setStudentId] = useState();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [timePresent, setTimePresent] = useState("");
  const [roomNum, setRoomNum] = useState("");
  const [professor, setProfessor] = useState("");
  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    setTime(user.time);
    setTimePresent(user.timePresent);
    setRoomNum(user.lab);
    setSubject(user.subject);
    setProfessor(user.fullName);
  }, []);

  const click = () => setShow(!show);
  const navigate = useNavigate();
  const toast = useToast();
  function refreshPage() {
    window.location.reload(false);
  }
  const submitHandler = async () => {
    setLoading(true);
    if (!studentId || !password) {
      toast({
        title: "Please input Email and Password",
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
      const { data } = await axios.put(
        "/api/tags/add_backup",
        { studentId, password, time, timePresent, roomNum, subject, professor },
        config
      );
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("studInfo", JSON.stringify(data));
      setTimeout(() => {
        refreshPage();
      });
      setLoading(false);
    } catch (error) {
      toast({
        title: "You are not allowed here.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();

  return (
    <>
      <Button bgColor={"green.500"} color={"white"} onClick={onOpen}>
        Card not working? Click to Login
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Student ID:</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Enter Username"
                onChange={(e) => setStudentId(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password:</FormLabel>
              <InputGroup>
                /* A password input field that will show the password when the
                user clicks the show button. */
                <Input
                  placeholder="Enter Password"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={click}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={submitHandler}
              isLoading={loading}
            >
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StudentModal;
