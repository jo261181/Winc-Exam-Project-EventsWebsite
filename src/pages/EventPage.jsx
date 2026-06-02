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
} from "@chakra-ui/react";

import SimpleModal from "../components/ui/modal";
import EventForm from "../components/ui/EventForm";
import { toaster } from "../components/ui/toaster";
import Footer from "../components/ui/Footer";
import EventDetailSkeleton from "../components/EventDetailSkeleton";

export default function EventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, setData } = useOutletContext();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // LOADING
  if (!data) {
    return (
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <EventDetailSkeleton />
      </Box>
    );
  }

  const events = data.events || [];
  const categories = data.categories || [];
  const event = events.find((evt) => evt.id.toString() === id);

  // IMAGE HELPER
  function getImageSrc(image) {
    if (!image) return "";
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    return image;
  }

  // ⭐ UPDATE EVENT — volledig gefixt
  function updateEvent(id, values) {
    // categorieën correct ophalen
    let catIds = values["categoryIds[]"];

    if (!catIds) {
      catIds = [];
    } else if (!Array.isArray(catIds)) {
      catIds = [catIds];
    }

    const updatedEvent = {
      ...event,
      ...values,
      id: Number(id),
      categoryIds: catIds.map(Number),
      image:
        values.image instanceof File
          ? values.image
          : values.image ?? event.image,
    };

    const updated = {
      ...data,
      events: data.events.map((evt) =>
        evt.id === updatedEvent.id ? updatedEvent : evt
      ),
    };

    setData(updated);

    toaster.create({
      title: "Event updated",
      description: "De wijzigingen zijn opgeslagen.",
      type: "success",
    });
  }

  // ⭐ DELETE EVENT — werkt 100%
  function handleDelete() {
    const updated = {
      ...data,
      events: data.events.filter((e) => e.id !== event.id),
    };

    setData(updated);

    toaster.create({
      title: "Event deleted",
      description: "Het evenement is succesvol verwijderd.",
      type: "success",
    });

    setDeleteOpen(false);
    navigate("/events");
  }

  if (!event) {
    return (
      <Box p={6}>
        <Text>Event not found</Text>
        <Button mt={4} variant="outline" onClick={() => navigate("/events")}>
          Go back
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Box p={6} position="relative">
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

        {/* Event Card */}
        <Card.Root
          w="100%"
          maxW={{ base: "100%", sm: "500px", md: "650px", lg: "700px" }}
          mx="auto"
          p={{ base: 4, md: 6 }}
          boxShadow="md"
        >
          <Image
            src={getImageSrc(event.image)}
            alt={event.title}
            w="100%"
            h={{ base: "180px", sm: "220px", md: "260px" }}
            objectFit="cover"
            borderRadius="md"
            mb={3}
          />

          <Card.Header>
            <Card.Title
              fontSize={{ base: "xl", sm: "2xl" }}
              fontWeight="bold"
              textAlign={{ base: "center", md: "left" }}
            >
              {event.title}
            </Card.Title>

            <Card.Description
              fontSize={{ base: "md", sm: "lg" }}
              textAlign={{ base: "center", md: "left" }}
            >
              {event.description}
            </Card.Description>
          </Card.Header>

          <Card.Body>
            <Text
              mt={2}
              fontSize={{ base: "md", sm: "lg" }}
              textAlign={{ base: "center", md: "left" }}
            >
              {event.location}
            </Text>

            <Text
              mt={2}
              fontSize={{ base: "sm", sm: "md" }}
              textAlign={{ base: "center", md: "left" }}
            >
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
            justify={{ base: "center", md: "flex-start" }}
            flexWrap="wrap"
          >
            <Button
              variant="surface"
              border="1px solid"
              borderColor="gray.300"
              onClick={() => setEditOpen(true)}
            >
              Edit Event
            </Button>

            <Button
              variant="surface"
              border="1px solid"
              borderColor="gray.300"
              onClick={() => setDeleteOpen(true)}
            >
              Delete
            </Button>

            <Button
              variant="surface"
              border="1px solid"
              borderColor="gray.300"
              onClick={() => navigate("/events")}
            >
              Back
            </Button>
          </Card.Footer>
        </Card.Root>

        {/* ⭐ EDIT MODAL */}
        <SimpleModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          title="Edit event"
        >
          <EventForm
            initialValues={event}
            allCategories={categories}
            onSubmit={(values) => {
              updateEvent(event.id, values);
              setEditOpen(false);
            }}
            cancel={() => setEditOpen(false)}
            onDelete={() => {
              setEditOpen(false);
              setDeleteOpen(true);
            }}
          />
        </SimpleModal>

        {/* ⭐ DELETE MODAL */}
        <SimpleModal
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          title="Delete event"
        >
          <Text>Are you sure you want to delete this event?</Text>

          <HStack mt={4}>
            <Button colorPalette="red" onClick={handleDelete}>
              Delete
            </Button>

            <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          </HStack>
        </SimpleModal>
      </Box>

      <Footer />
    </>
  );
}
