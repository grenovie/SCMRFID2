import { VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfessorModalAuth from "../page/misc/ProfessorModalAuth";
import ProfessorModalScan from "../page/misc/ProfessorModalScan";

const LoginStaff = () => {
  return (
    <VStack spacing="5px">
      <ProfessorModalScan />
      <ProfessorModalAuth />
    </VStack>
  );
};
export default LoginStaff;
