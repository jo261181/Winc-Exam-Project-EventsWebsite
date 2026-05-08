import { Box, Text, Heading, Image, Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import HeadingExample from "../components/ui/Heading";

export const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Background image */}
      <Box
        position="fixed"
        inset="0"
        bgImage="url('/images/pexels-diva-34731924.jpg')"
        bgSize="cover"
        bgPosition="center"
        opacity="0.4"
        zIndex="-1"
      />

      {/* Header */}
      <HeadingExample>
        <Flex gap={8} align="center">
          <Heading>
            <Flex align="center">
              <Image
                src="/images/logo.png"
                alt="Winc Events"
                height={{ base: "60px", sm: "70px", md: "80px" }}
                objectFit="contain"
              />
            </Flex>
          </Heading>

          <Button onClick={() => navigate("/")}>
            Terug naar events
          </Button>
        </Flex>
      </HeadingExample>

      {/* Content */}
      <Box p={6} maxW="800px" mx="auto" mt={6}>
        <Text fontSize="2xl" mb={4}>
          Over Ons
        </Text>

        <Text mb={4}>
          Wij zijn een team van enthousiaste evenementenorganisatoren die zich inzetten om
          onvergetelijke ervaringen te creëren voor onze gemeenschap.
        </Text>

        <Text mb={4}>
          Met jarenlange ervaring in het organiseren van diverse evenementen streven we ernaar
          om elke gelegenheid speciaal te maken.
        </Text>

        <Text mb={4}>
          Onze missie is om mensen samen te brengen door middel van unieke en boeiende
          evenementen die herinneringen creëren die een leven lang meegaan.
        </Text>

        <Text mb={4}>
          Of je nu op zoek bent naar een intieme bijeenkomst of een groots evenement, wij staan
          klaar om je te helpen bij het plannen en uitvoeren van een onvergetelijke ervaring.
        </Text>
      </Box>
    </>
  );
};
