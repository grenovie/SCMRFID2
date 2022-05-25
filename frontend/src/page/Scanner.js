import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  toast,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import StudentModal from "./misc/StudentModal";

const Scanner = () => {
  const { register, handleSubmit, setFocus, resetField } = useForm();
  const [subject, setSubject] = useState("");
  const [rfid, setRfid] = useState("");
  const [time, setTime] = useState("");
  const [timePresent, setTimePresent] = useState("");
  const [roomNum, setRoomNum] = useState("");
  const [professor, setProfessor] = useState("");
  // const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  // const [name, setName] = useState();
  function refreshPage() {
    window.location.reload(false);
  }
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    setTime(user.time);
    setTimePresent(user.timePresent);
    setRoomNum(user.lab);
    setSubject(user.subject);
    setProfessor(user.fullName);
  }, []);
  const submitHandler = async () => {
    setLoading(true);

    if (!rfid) {
      toast({
        title: "WAIT THE PROFFESOR",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      setTimeout(() => {
        refreshPage();
      }, 3000);
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.put(
        "/api/tags/add",
        {
          rfid,
          time,
          timePresent,
          roomNum,
          subject,
          professor,
        },
        config
      );
      localStorage.setItem("studInfo", JSON.stringify(data));
      setTimeout(() => {
        refreshPage();
      });
      resetField("code");
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      resetField("code");
      setLoading(false);
    }
  };
  React.useEffect(() => {
    setFocus("code");
  }, [setFocus]);
  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <label htmlFor="code">ID: </label>
        <input
          type={"password"}
          placeholder="code..."
          {...register("code", {
            onChange: (e) => setRfid(e.target.value),
          })}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Scanner;
