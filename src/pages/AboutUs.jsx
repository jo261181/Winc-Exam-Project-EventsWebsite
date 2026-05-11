import { Box, Text, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import HeadingExample from "../components/ui/Heading";
import Footer from "../components/ui/Footer";

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
        opacity="0.55"
        zIndex="-1"
      />

      <HeadingExample
        rightContent={
          <Button onClick={() => navigate("/")} colorScheme="blue">
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
        bg="whiteAlpha.800"
        borderRadius="md"
        boxShadow="md"
      >
        <Heading fontSize="3xl" mb={4} textAlign="center">
          About Us
        </Heading>

        <Text mb={4} mx={5}>
          We are a team of passionate and dedicated event organizers who pour
          our heart and energy into creating unforgettable experiences for our
          community. What drives us is the joy of bringing people together — uniting creativity, 
          excitement, and connection in one place.
        </Text>

        <Text mb={4} mx={5}>
          With many years of experience in organizing a wide range of events,
          from small gatherings to large-scale festivals, we strive to make
          every occasion truly special. No matter the size, every event receives
          the same level of care, attention, and enthusiasm from our team.
        </Text>

        <Text mb={4} mx={5}>
          Our mission is to bring people closer through unique, inspiring, and
          engaging events. We believe that meaningful memories are created when
          people come together to laugh, discover, celebrate, and enjoy — moments 
          that stay with you for a lifetime.
        </Text>

        <Text mb={4} mx={5}>
          Whether you're looking for an intimate gathering, a lively
          celebration, or a large public event, we are here to help you plan,
          shape, and execute an experience you will never forget.
        </Text>

        <Text mb={4} mx={5}>
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
