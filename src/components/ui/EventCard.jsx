import { Card, Image, Text, Badge, HStack, Stack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function EventCard({ event, categories, onEditClick }) {
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

        {/* TITLE - Responsive centrering */}
        <Card.Title
          fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
          fontWeight="bold"
          lineHeight="1.2"
          textAlign={{ base: "center", md: "left" }}
        >
          {event.title}
        </Card.Title>

        {/* DESCRIPTION - Responsive centrering */}
        <Card.Description
          fontSize={{ base: "sm", md: "md" }}
          lineHeight="1.3"
          fontWeight="bold"
          textAlign={{ base: "center", md: "left" }}
          mt={2}
          color="gray.500"
          noOfLines={2}
        >
          {event.description}
        </Card.Description>
      </Card.Header>

      {/* BODY */}
      <Card.Body px={6} pb={4}>
        <Stack gap={1} alignItems={{ base: "center", md: "flex-start" }}>
          {/* LOCATION */}
          <Text fontWeight="medium" textAlign={{ base: "center", md: "left" }}>
            {event.location}
          </Text>

          {/* DATE RANGE */}
          <Text textAlign={{ base: "center", md: "left" }}>
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
        </Stack>

        {/* CATEGORY BADGES - Gecentreerd op mobiel */}
        <HStack mt={4} flexWrap="wrap" gap={2} justifyContent={{ base: "center", md: "flex-start" }}>
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

      {/* FOOTER - Actieknoppen gecentreerd op mobiel */}
      <Card.Footer gap={3} px={6} pb={6} justifyContent={{ base: "center", md: "flex-start" }}>
        <Button
          variant="surface"
          border="1px solid"
          borderColor="gray.500"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/events/${event.id}`);
          }}
        >
          View details
        </Button>

        <Button
          variant="surface"
          border="1px solid"
          borderColor="gray.500"
          onClick={(e) => {
            e.stopPropagation();
            onEditClick(); // Roept de edit-handler aan op de EventsPage
          }}
        >
          Edit
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}