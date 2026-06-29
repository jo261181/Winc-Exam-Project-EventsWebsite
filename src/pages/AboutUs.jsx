import { Box, Text, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import HeadingExample from "../components/ui/Heading";
import Footer from "../components/ui/Footer";
import { useColorMode, ColorModeButton } from "../components/ui/color-mode";

export const AboutUs = () => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  return (
    <>
      <Box
        position="fixed"
        inset="0"
        bgImage="url('/images/pexels-diva-34731924.jpg')"
        bgSize="cover"
        bgPosition="center"
        opacity="0.55"
        zIndex="-1"
      />

      <HeadingExample
        rightContent={
          <Button
            onClick={() => navigate("/")}
            variant="surface"
            pl={2}
            size="sm"
            outline="1px solid"
            outlineColor="gray.300"
            _dark={{ outlineColor: "gray.100" }}
            type="submit"
            colorPalette="gray"
          >
            Back to events
          </Button>
        }
      />

      <Box
        maxW="900px"
        mx="auto"
        mt={8}
        p={6}
        px={2}
        bg={colorMode === "dark" ? "black" : "whiteAlpha.800"}
        borderRadius="md"
        boxShadow="md"
      >
        <Heading fontSize="3xl" mb={4} textAlign="center">
          About Us
        </Heading>

        <Text mb={4} mx={5} fontSize="md">
          We are a team of passionate and dedicated event organizers who pour
          our heart and energy into creating unforgettable experiences for our
          community. What drives us is the thrill of bringing people together —
          sparking creativity, excitement, and genuine connection in one
          unforgettable moment.
        </Text>
        <Text mb={4} mx={5} fontSize={{ base: "md", lg: "lg" }}>
          With many years of experience in organizing a wide range of events,
          from cozy gatherings to vibrant festivals, we aim to turn every
          occasion into something magical. Big or small, every event receives
          the same level of care, attention, and enthusiasm from our team —
          because every moment has the potential to become extraordinary.
        </Text>
        <Text mb={4} mx={5} fontSize={{ base: "md", lg: "lg" }}>
          Our mission is to bring people closer through unique, inspiring, and
          engaging events. We believe that the most meaningful memories are born
          when people come together to laugh, discover, celebrate, and enjoy —
          moments that stay with you long after the lights go out.
        </Text>
        <Text mb={4} mx={5} fontSize={{ base: "md", lg: "lg" }}>
          Whether you're dreaming of an intimate get‑together, a lively
          celebration, or a large public event, we are here to help you shape,
          plan, and execute an experience you will never forget.
        </Text>
        <Text mb={4} mx={5} fontSize={{ base: "md", lg: "lg" }}>
          We also invite visitors of our platform to contribute by adding their
          own events. Together, we build a vibrant, up‑to‑date, and inclusive
          event calendar that reflects the creativity and diversity of our
          community. Your idea might just become the next highlight everyone is
          talking about.
        </Text>
      </Box>
      <Footer />
    </>
  );
};
