<<<<<<< HEAD
import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      bg="gray.100"
      opacity="50%"
      py={4}
      mt={10}
      textAlign="center"
    >
      <Text 
        fontSize="sm"
        color="black"
        fontWeight="semibold"

      >
        © {new Date().getFullYear()} PixelBloom Drift. All rights reserved.
      </Text>
    </Box>
  );
=======
import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      bg="gray.100"
      opacity="50%"
      py={4}
      mt={10}
      textAlign="center"
      
    //   boxShadow="inner"
    >
      <Text 
        fontSize="sm"
        color="black"
        fontWeight="semibold"

      >
        © {new Date().getFullYear()} PixelBloom Drift. All rights reserved.
      </Text>
    </Box>
  );
>>>>>>> 3637cb57b823052f655bcd3b3789c641b297ff48
}