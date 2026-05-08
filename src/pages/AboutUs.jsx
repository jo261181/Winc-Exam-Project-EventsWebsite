import {
  Image,
  HStack,
  Badge,
  Button,
  Box,
  Text,
  Card,
  SimpleGrid,
} from "@chakra-ui/react";

import HeadingExample from "../components/ui/Heading";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import SimpleModal from "../components/ui/modal";


export const AboutUs = () => {


  const navigate = useNavigate();

  return (
    <>


      <Box
        position="fixed"
        inset="0"
        bgImage="url('/images/pexels-diva-34731924.jpg')"
        bgSize="cover"
        bgPosition="center"
        opacity="0.4"
        zIndex="-1"
      />
      </>
    );
};
