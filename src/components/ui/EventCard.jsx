import { Card, Image, Text, Badge, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function EventCard({ event, categories }) {
  const navigate = useNavigate();

  const eventCategories =
    event.categoryIds?.map((id) => categories.find((c) => c.id === id)) || [];

  return (
    <Card.Root
      w="100%"
      borderRadius="lg"
      cursor="pointer"
      boxShadow="md"
      _hover={{ transform: "scale(1.03)", boxShadow: "lg" }}
      transition="0.2s"
      onClick={() => navigate(`/events/${event.id}`)}
    >
      {/* HEADER */}
      <Card.Header p={6} w="100%">
        {/* IMAGE */}
        <Image
          src={event.image}
          alt={event.title}
          w="100%"
          h={{ base: "140px", md: "160px", lg: "190px" }}
          objectFit="cover"
          borderRadius="md"
          mb={4}
        />

        {/* TITLE */}
        <Text
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="bold"
          mb={1}
        >
          {event.title}
        </Text>

        {/* DESCRIPTION */}
        <Text
          fontSize={{ base: "sm", md: "md" }}
          color="gray.600"
          noOfLines={2}
        >
          {event.description}
        </Text>
      </Card.Header>

      {/* BODY */}
      <Card.Body px={6} pb={4}>
        {/* LOCATION */}
        <Text mt={1}>{event.location}</Text>

        {/* DATE RANGE */}
        <Text mt={1} fontSize="sm" color="gray.700">
          {new Date(event.startTime).toLocaleString("nl-NL", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
          {" – "}
          {new Date(event.endTime).toLocaleString("nl-NL", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </Text>

        {/* CATEGORY BADGES */}
        <HStack mt={4} flexWrap="wrap" gap={2}>
          {eventCategories.map((cat) => (
            <Badge
              key={cat?.id}
              size="lg"
              variant="solid"
              colorPalette="orange"
            >
              {cat?.name}
            </Badge>
          ))}
        </HStack>
      </Card.Body>

      {/* FOOTER */}
      <Card.Footer gap={3} px={6} pb={6}>
        <Badge
          size="md"
          variant="surface"
          border="1px solid"
          borderColor="gray.300"
          px={3}
        >
          View Details
        </Badge>
      </Card.Footer>
    </Card.Root>
  );
}
