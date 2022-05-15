import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NotHere = () => {
  const [link, setLink] = useState("/not_here");
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  const submitHandler = () => {
    if (user.isStudent === true) {
      setLink("/scanner");
    }
    if (user.isAdmin === true) {
      setLink("/admin");
    }
    if (user.isStaff === true) {
      setLink("/scanner");
    }
    navigate(link);
  };
  return (
    <div>
      <Button onClick={submitHandler} colorScheme="red">
        Go Back
      </Button>
    </div>
  );
};

export default NotHere;
