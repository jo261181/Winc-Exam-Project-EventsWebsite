import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";

import {
  Box,
  Text,
  Badge,
  Button,
  Image,
  HStack,
  Card,
  Dialog, // We gebruiken nu direct de officiële Chakra v3 Dialog
} from "@chakra-ui/react";

import EventForm from "../components/ui/EventForm";
import { toaster } from "../components/ui/toaster";
import Footer from "../components/ui/Footer";
import EventDetailSkeleton from "../components/ui/EventDetailSkeleton";

export default function EventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, setData } = useOutletContext();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  
  // Slaat het ID op dat verwijderd moet worden
  const [activeDeleteId, setActiveDeleteId] = useState(null);

  if (!data) {
    return (
      <>
        <Box p={6} position="relative">
          <EventDetailSkeleton />
        </Box>
        <Footer />
      </>
    );
  }

  const events = data.events || [];
  const categories = data.categories || [];
  
  const currentId = id || activeDeleteId;
  const event = events.find((evt) => evt.id.toString() === currentId?.toString());

  if (!event && id) {
    return (
      <Box p={6}>
        <Text>Event not found</Text>
        <Button mt={4} variant="outline" onClick={() => navigate("/")}>
          Go back
        </Button>
      </Box>
    );
  }

  async function updateEvent(targetId, values) {
    const updatedEvent = {
      ...event,
      ...values,
      id: Number(targetId),
      categoryIds: values.categoryIds || [],
      image: values.image || event.image || "",
    };

    const res = await fetch(`http://localhost:3000/events/${targetId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEvent),
    });

    if (!res.ok) {
      toaster.create({
        title: "Error",
        description: "The event couldn't be saved.",
        type: "error",
      });
      return;
    }

    const saved = await res.json();

    const updated = {
      ...data,
      events: data.events.map((evt) => (evt.id === saved.id ? saved : evt)),
    };

    setData(updated);

    toaster.create({
      title: "Event updated",
      description: "The changes have been saved.",
      type: "success",
    });
  }

  async function handleDelete() {
    const eventId = activeDeleteId || id;

    if (!eventId || eventId === "undefined") {
      toaster.create({
        title: "Error",
        description: "Invalid event ID. Cannot delete.",
        type: "error",
      });
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        toaster.create({
          title: "Error",
          description: "The event couldn't be deleted on the server.",
          type: "error",
        });
        return;
      }

      // 1. Lokale context direct bijwerken
      const updated = {
        ...data,
        events: data.events.filter((e) => e.id.toString() !== eventId.toString()),
      };
      setData(updated);

      // 2. Toon de succes-toaster
      toaster.create({
        title: "Event deleted",
        description: "The event has been deleted.",
        type: "success",
      });

      // 3. Sluit alles af en reset de state
      setDeleteOpen(false);
      setEditOpen(false);
      setActiveDeleteId(null);
      
      if (id) {
        navigate("/");
      }
      
    } catch (error) {
      console.error(error);
      toaster.create({
        title: "Error",
        description: "A network error occurred while deleting.",
        type: "error",
      });
    }
  }

  return (
    <>
      <Box p={6} position="relative">
        <Box
          position="fixed"
          inset="0"
          bgImage="url('/images/pexels-diva-34731924.jpg')"
          bgSize="cover"
          bgPosition="center"
          opacity="0.4"
          zIndex="-1"
        />

        {event && id && (
          <Card.Root
            w="100%"
            maxW={{ base: "100%", sm: "500px", md: "650px", lg: "700px" }}
            mx="auto"
            p={{ base: 4, md: 6 }}
            boxShadow="md"
          >
            <Image
              src={event.image}
              alt={event.title}
              w="100%"
              h={{ base: "180px", sm: "220px", md: "260px" }}
              objectFit="cover"
              borderRadius="md"
              mb={3}
            />

            <Card.Header>
              <Card.Title
                fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                fontWeight="bold"
                textAlign={{ base: "center", md: "left" }}
              >
                {event.title}
              </Card.Title>

              <Card.Description
                fontSize={{ base: "md", md: "lg", lg: "xl" }}
                textAlign={{ base: "center", md: "left" }}
                color="gray.600"
              >
                {event.description}
              </Card.Description>
            </Card.Header>

            <Card.Body px={6} pb={4}>
              <Text
                mt={2}
                fontWeight="semibold"
                fontSize={{ base: "md", sm: "lg" }}
                textAlign={{ base: "center", md: "left" }}
              >
                Location: {event.location}
              </Text>

              <Text
                mt={2}
                fontSize={{ base: "sm", sm: "md" }}
                textAlign={{ base: "center", md: "left" }}
              >
                Date:{" "}
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

              <HStack
                mt={4}
                justify={{ base: "center", md: "flex-start" }}
                flexWrap="wrap"
                gap={2}
              >
                {event.categoryIds?.map((id) => {
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

            <Card.Footer
              gap={3}
              px={6}
              pb={6}
              justify={{ base: "center", md: "flex-start" }}
              flexWrap="wrap"
            >
              <Button
                variant="surface"
                border="1px solid"
                color="black"
                bg="white"
                borderColor="gray.500"
                onClick={() => {
                  setActiveDeleteId(event.id);
                  setEditOpen(true);
                }}
              >
                Edit Event
              </Button>

              <Button
                variant="surface"
                border="1px solid"
                bg="red.500"
                color="white"
                borderColor="red.500"
                onClick={() => {
                  setActiveDeleteId(event.id);
                  setDeleteOpen(true);
                }}
              >
                Delete Event
              </Button>

              <Button
                variant="surface"
                border="1px solid"
                ml="auto"
                borderColor="gray.500"
                onClick={() => navigate("/")}
              >
                Back
              </Button>
            </Card.Footer>
          </Card.Root>
        )}

        {/* 1. OFFICILE CHAKRA EDIT DIALOG (Geen SimpleModal meer nodig) */}
        <Dialog.Root open={editOpen} onOpenChange={(e) => setEditOpen(e.open)}>
          <Dialog.Content>
            <Dialog.Body>
              {event && (
                <EventForm
                  initialValues={event}
                  allCategories={categories}
                  onSubmit={(values) => {
                    updateEvent(event.id, values);
                    setEditOpen(false);
                  }}
                  onCancel={() => setEditOpen(false)}
                  onDelete={(incomingId) => {
                    setActiveDeleteId(incomingId); 
                    setDeleteOpen(true); // Schiet direct de losstaande bevestigingspop-up in
                  }}
                />
              )}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Root>

        {/* 2. OFFICILE CHAKRA BEVESTIGINGS DIALOG (Losstaand, garandeert 100% zichtbaarheid) */}
        <Dialog.Root open={deleteOpen} onOpenChange={(e) => setDeleteOpen(e.open)}>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title fontWeight="bold">Delete event</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text>Are you sure you want to delete this event?</Text>
            </Dialog.Body>
            <Dialog.Footer mt={4}>
              <HStack gap={3}>
                <Button 
                  colorPalette="red" 
                  bg="red.500" 
                  color="white" 
                  _hover={{ bg: "red.600" }}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button variant="outline" onClick={() => setDeleteOpen(false)}>
                  Cancel
                </Button>
              </HStack>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>

      </Box>

      <Footer />
    </>
  );
}