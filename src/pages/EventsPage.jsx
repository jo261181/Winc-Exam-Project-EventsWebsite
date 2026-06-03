import {
  Image,
  HStack,
  Badge,
  Button,
  Box,
  Text,
  Card,
  SimpleGrid,
  Stack,
  Skeleton,
} from "@chakra-ui/react";

import HeadingExample from "../components/ui/Heading";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import SimpleModal from "../components/ui/modal";
import EventForm from "../components/ui/EventForm";
import Footer from "../components/ui/Footer";
import { toaster } from "../components/ui/toaster";

// -----------------------------------------------------
// Skeleton
// -----------------------------------------------------
export const EventsPageSkeleton = () => (
  <Box p={6}>
    <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} gap="30px">
      {[...Array(6)].map((_, i) => (
        <Card.Root
          key={i}
          w="100%"
          borderRadius="lg"
          bg="whiteAlpha.800"
          alignItems="center"
          boxShadow="md"
          p={4}
        >
          <Skeleton
            height={{ base: "120px", md: "130px", lg: "170px" }}
            w="100%"
            borderRadius="md"
            mb={4}
          />

          <Stack w="100%" gap={3}>
            <Skeleton height="24px" width="70%" />
            <Skeleton height="16px" width="90%" />
            <Skeleton height="16px" width="50%" />
          </Stack>

          <Stack w="100%" mt={4} gap={2}>
            <Skeleton height="16px" width="60%" />
            <Skeleton height="16px" width="50%" />
          </Stack>

          <HStack mt={4} w="100%" gap={2}>
            <Skeleton height="20px" width="60px" borderRadius="md" />
            <Skeleton height="20px" width="80px" borderRadius="md" />
          </HStack>

          <Skeleton height="36px" width="120px" mt={4} borderRadius="md" />
        </Card.Root>
      ))}
    </SimpleGrid>
  </Box>
);

// -----------------------------------------------------
// EventsPage
// -----------------------------------------------------
export const EventsPage = () => {
  const { data, setData } = useOutletContext();
  const navigate = useNavigate();

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  if (!data) return <EventsPageSkeleton />;

  const eventsArray = data.events || [];
  const categories = data.categories || [];

  // -----------------------------------------------------
  // Create
  // -----------------------------------------------------
 const addEvent = async (newEvent) => {
  const imageUrl = newEvent.image || "";
  const eventToSave = {
    id: crypto.randomUUID(),
    ...newEvent,
    image: imageUrl,
    categoryIds: newEvent.categoryIds
      ? Array.isArray(newEvent.categoryIds)
        ? newEvent.categoryIds.map(Number)
        : [Number(newEvent.categoryIds)]
      : [],
  };

  // ⭐ schrijf naar json-server
  await fetch("http://localhost:3000/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventToSave),
  });

  // ⭐ update UI state
  setData({
    ...data,
    events: [...data.events, eventToSave],
  });

  toaster.create({
    title: "Event created",
    description: "Your event has been successfully added.",
    type: "success",
  });
};
  // -----------------------------------------------------
  // Update
  // -----------------------------------------------------
  const updateEvent = async (values) => {
  const imageUrl =
    values.image instanceof File
      ? URL.createObjectURL(values.image)
      : values.image;

  const updatedEvent = {
    ...values,
    id: Number(values.id),
    image: imageUrl,
    categoryIds: values.categoryIds
      ? Array.isArray(values.categoryIds)
        ? values.categoryIds.map(Number)
        : [Number(values.categoryIds)]
      : [],
  };

  // ⭐ schrijf naar json-server
  await fetch(`http://localhost:3000/events/${updatedEvent.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedEvent),
  });

  // ⭐ update UI state
  setData({
    ...data,
    events: data.events.map((evt) =>
      evt.id === updatedEvent.id ? updatedEvent : evt
    ),
  });

  toaster.create({
    title: "Event updated",
    description: "The changes have been saved.",
    type: "success",
  });
};

  // -----------------------------------------------------
  // Filtering
  // -----------------------------------------------------

  const deleteEvent = async (id) => {
  await fetch(`http://localhost:3000/events/${id}`, {
    method: "DELETE",
  });

  setData({
    ...data,
    events: data.events.filter((evt) => evt.id !== id),
  });

  setEditOpen(false);

  toaster.create({
    title: "Event deleted",
    description: "The event has been removed.",
    type: "success",
  });
};
  const filteredEvents = eventsArray.filter((evt) => {
    const search = searchTerm.toLowerCase();

    const categoryMatch = evt.categoryIds?.some((id) => {
      const category = categories.find((c) => c.id === id);
      return category?.name.toLowerCase().includes(search);
    });

    return (
      evt.title.toLowerCase().includes(search) ||
      evt.description.toLowerCase().includes(search) ||
      evt.location.toLowerCase().includes(search) ||
      categoryMatch
    );
  });

  // -----------------------------------------------------
  // Render
  // -----------------------------------------------------
  return (
    <>
      <HeadingExample
        data={data}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onCreate={() => setCreateOpen(true)}
        rightContent={null}
        noSticky
      />

      {/* Create Modal */}
      <SimpleModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create new event"
      >
        <EventForm
          onSubmit={(values) => {
            addEvent(values);
            setCreateOpen(false);
          }}
          cancel={() => setCreateOpen(false)}
          allCategories={categories}
        />
      </SimpleModal>

      {/* Edit Modal */}
      <SimpleModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit event"
      >
        <EventForm
  initialValues={editEvent}
  onSubmit={(values) => {
    updateEvent(values);
    setEditOpen(false);
  }}
  onDelete={deleteEvent}
  cancel={() => setEditOpen(false)}
  allCategories={categories}
/>
        
      </SimpleModal>

      {/* Background */}
      <Box
        position="fixed"
        inset="0"
        bgImage="url('/images/pexels-diva-34731924.jpg')"
        bgSize="cover"
        bgPosition="center"
        opacity="0.4"
        zIndex="-1"
      />

      {/* Events Grid */}
      <Box position="relative" zIndex="1" p={6}>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} gap="30px">
          {filteredEvents.map((evt) => (
            <Card.Root
              key={evt.id}
              w="100%"
              borderRadius="lg"
              alignItems="center"
              mb={5}
              cursor="pointer"
              onClick={() => navigate(`/events/${evt.id}`)}
              boxShadow="md"
              _hover={{ transform: "scale(1.03)", boxShadow: "lg" }}
              transition="0.2s"
            >
              <Card.Header p={6} w="100%">
                <Image
                  src={evt.image}
                  alt={evt.title}
                  w="100%"
                  h={{ base: "120px", md: "130px", lg: "170px" }}
                  objectFit="cover"
                  borderRadius="md"
                  mb={4}
                />

                <Card.Title fontSize={{ base: "md", md: "lg", lg: "2xl" }}>
                  {evt.title}
                </Card.Title>

                <Card.Description fontSize={{ base: "sx", md: "sm", lg: "md" }}>
                  {evt.description}
                </Card.Description>
              </Card.Header>

              <Card.Body>
                <Text mt={1} fontWeight="medium">
                  {evt.location}
                </Text>

                <Text mt={1}>
                  {new Date(evt.startTime).toLocaleString("nl-NL", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                  {" – "}
                  {new Date(evt.endTime).toLocaleString("nl-NL", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </Text>

                <HStack mt={4}>
                  {evt.categoryIds?.map((id) => {
                    const category = categories.find((c) => c.id === id);
                    return (
                      <Badge
                        key={id}
                        size="lg"
                        variant="solid"
                        colorPalette="orange"
                      >
                        {category?.name}
                      </Badge>
                    );
                  })}
                </HStack>
              </Card.Body>

              <Card.Footer gap={3}>
                <Button
                  variant="surface"
                  border="1px solid"
                  borderColor="gray.300"
                  onClick={() => navigate(`/events/${evt.id}`)}
                >
                  View details
                </Button>

                <Button
                  variant="surface"
                  border="1px solid"
                  borderColor="gray.300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditEvent(evt);
                    setEditOpen(true);
                  }}
                >
                  Edit
                </Button>
              </Card.Footer>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Box>

      <Footer>
        <Text textAlign="center" py={4} color="black.800">
          &copy; {new Date().getFullYear()} PixelBloom Drift. All rights
          reserved.
        </Text>
      </Footer>
    </>
  );
};
