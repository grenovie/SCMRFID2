import {
  Button,
  FormLabel,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const ProfessorModalScan = () => {
  const { register, handleSubmit, setFocus, resetField } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const toast = useToast();
  const [rfid, setRfid] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    setLoading(true);
    if (!rfid) {
      toast({
        title: "Please Scan your ID",
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
      const { data } = await axios.post("/api/user/login", { rfid }, config);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/scanner");
    } catch (error) {
      toast({
        title: "You are not allowed here.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      resetField("code");
      setLoading(false);
    }
  };

  return (
    <>
      <Button bgColor={"green.500"} onClick={onOpen}>
        <Text color={"white"}>SCAN ID to LOGIN</Text>
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Please SCAN your ID to Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormLabel>Professor ID:</FormLabel>
            <div>
              <form onSubmit={handleSubmit(submitHandler)}>
                <label htmlFor="code">ID: </label>
                <input
                  autoFocus={true}
                  type={"password"}
                  placeholder="code..."
                  {...register("code", {
                    onChange: (e) => setRfid(e.target.value),
                  })}
                />
                <input type="submit" />
              </form>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} size={"lg"} colorScheme={"red"}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfessorModalScan;
