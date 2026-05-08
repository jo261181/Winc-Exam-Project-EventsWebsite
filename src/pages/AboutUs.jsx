import { Box, Text, Heading, Image, Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import HeadingExample from "../components/ui/Heading";

export const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Achtergrond over de hele pagina */}
      <Box
        position="fixed"
        inset="0"
        bgImage="url('/images/pexels-diva-34731924.jpg')"
        bgSize="cover"
        bgPosition="center"
        opacity="0.35"
        zIndex="-1"
      />

      {/* Header */}
      <HeadingExample
        rightContent={
          <Button onClick={() => navigate("/")} colorScheme="blue">
            Terug naar events
          </Button>
        }
      />

      {/* Content */}
      <Box
        maxW="800px"
        mx="auto"
        mt={8}
        p={6}
        bg="whiteAlpha.800"
        borderRadius="md"
        boxShadow="md"
      >
        <Heading fontSize="3xl" mb={4} textAlign="center">
          Over Ons
        </Heading>

        <Text mb={4}>
          Wij zijn een team van enthousiaste evenementenorganisatoren die zich
          inzetten om onvergetelijke ervaringen te creëren voor onze gemeenschap.
        </Text>

        <Text mb={4}>
          Met jarenlange ervaring in het organiseren van diverse evenementen,
          van kleine bijeenkomsten tot grootschalige festivals, streven we ernaar
          om elke gelegenheid speciaal te maken.
        </Text>

        <Text mb={4}>
          Onze missie is om mensen samen te brengen door middel van unieke en
          boeiende evenementen die herinneringen creëren die een leven lang
          meegaan.
        </Text>

        <Text mb={4}>
          Of je nu op zoek bent naar een intieme bijeenkomst of een groots
          evenement, wij staan klaar om je te helpen bij het plannen en
          uitvoeren van een onvergetelijke ervaring.
        </Text>
      </Box>
    </>
  );
};
