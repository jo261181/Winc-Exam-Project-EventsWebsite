import { Box, Text, Heading, Button, Stack, SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import HeadingExample from "../components/ui/Heading";
import Footer from "../components/ui/Footer";
import { useColorMode } from "../components/ui/color-mode";

export const AboutUs = () => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  return (
    <>
      {/* Vaste achtergrondafbeelding */}
      <Box
        position="fixed"
        inset="0"
        bgImage="url('/images/pexels-diva-34731924.jpg')"
        bgSize="cover"
        bgPosition="center"
        opacity="0.4"
        zIndex="-1"
      />

      <HeadingExample
        rightContent={
          <Button
            onClick={() => navigate("/")}
            variant="surface"
            size="sm"
            border="1px solid"
            borderColor="gray.300"
            _dark={{ borderColor: "gray.700" }}
            colorPalette="gray"
            px={4}
          >
            Back to events
          </Button>
        }
      />

      {/* Main Content Container met Glassmorphism effect */}
      <Box
        maxW="900px"
        mx="auto"
        mt={{ base: 6, md: 12 }}
        mb={{ base: 6, md: 12 }}
        p={{ base: 6, md: 10 }}
        bg={colorMode === "dark" ? "blackAlpha.800" : "whiteAlpha.900"}
        backdropFilter="blur(10px)"
        borderRadius="xl"
        boxShadow="2xl"
        border="1px solid"
        borderColor={colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.100"}
      >
        <Stack gap={6}>
          <Heading 
            fontSize={{ base: "3xl", md: "4xl" }} 
            fontWeight="bold" 
            textAlign="center"
            letterSpacing="tight"
            color={colorMode === "dark" ? "white" : "gray.800"}
          >
            About Us
          </Heading>

          <Text 
            fontSize={{ base: "md", md: "lg" }} 
            lineHeight="tall" 
            textAlign="center"
            color={colorMode === "dark" ? "gray.300" : "gray.600"}
            maxW="750px"
            mx="auto"
            mb={4}
          >
            We are a team of passionate and dedicated event organizers who pour our heart and energy 
            into creating unforgettable experiences for our community. What drives us is the thrill 
            of bringing people together — sparking creativity, excitement, and genuine connection.
          </Text>

          {/* Grid Layout voor extra visuele structuur */}
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} mt={2}>
            <Box>
              <Heading fontSize="xl" mb={2} color="orange.500">
                Our Experience
              </Heading>
              <Text fontSize="md" lineHeight="relaxed">
                With many years of experience in organizing a wide range of events, from cozy 
                gatherings to vibrant festivals, we aim to turn every occasion into something magical. 
                Big or small, every event receives the same level of care, attention, and enthusiasm.
              </Text>
            </Box>

            <Box>
              <Heading fontSize="xl" mb={2} color="orange.500">
                Our Mission
              </Heading>
              <Text fontSize="md" lineHeight="relaxed">
                Our mission is to bring people closer through unique, inspiring, and engaging events. 
                We believe that the most meaningful memories are born when people come together to 
                laugh, discover, celebrate, and enjoy.
              </Text>
            </Box>
          </SimpleGrid>

          <Box 
            p={5} 
            borderRadius="lg" 
            bg={colorMode === "dark" ? "whiteAlpha.50" : "blackAlpha.50"}
            mt={4}
          >
            <Heading fontSize="lg" mb={2} textAlign="center">
              Contribute to the Community
            </Heading>
            <Text fontSize="md" lineHeight="relaxed" textAlign="center">
              We also invite visitors of our platform to contribute by adding their own events. 
              Together, we build a vibrant, up‑to‑date, and inclusive event calendar that reflects 
              the creativity and diversity of our community.
            </Text>
          </Box>
        </Stack>
      </Box>

      <Footer />
    </>
  );
};