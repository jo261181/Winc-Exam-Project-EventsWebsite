import React, { useEffect } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { createPortal } from "react-dom";

export default function SimpleModal({ open, onClose, title, children }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <Box
      position="fixed"
      inset="0"
      zIndex={10000}
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      p={4}
      overflowY="auto"
    >
      {/* DONKERE BACKDROP OVERLAY */}
      <Box
        position="absolute"
        inset="0"
        bg="rgba(0, 0, 0, 0.6)"
        backdropFilter="blur(6px)"
        onClick={onClose}
        position="fixed"
      />

      {/* MODAL CONTENT CONTAINER */}
      <Box
        position="relative"
        maxW="450px"
        w="100%"
        my={12}
        bg="white"
        _dark={{ bg: "gray.900" }}
        boxShadow="2xl"
        borderRadius="lg"
        display="flex"
        flexDirection="column"
      >
        {/* HEADER (Lijntje is hier nu volledig weggehaald) */}
        <Box 
          pt={5} // Iets meer padding aan de bovenkant voor een mooie balans
          px={4}
          pb={1} 
          position="relative"
          pointerEvents="none" 
          zIndex={1}
        >
          <HStack justify="space-between" align="center" w="100%">
            <Box style={{ margin: "0 auto", fontWeight: "bold", fontSize: "1.2rem" }} pointerEvents="auto">
              {title}
            </Box>
            {/* Ruimtehouder aan de rechterkant zodat de titel exact in het midden blijft staan */}
            <Box w="1px" /> 
          </HStack>
        </Box>

        {/* BODY */}
        <Box p={4} position="relative" zIndex={2}>
          {children}
        </Box>
      </Box>
    </Box>,
    document.body
  );
}