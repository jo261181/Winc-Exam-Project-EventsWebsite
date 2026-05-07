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

export default function EventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, setData } = useOutletContext();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const events = data.events || [];
  const categories = data.categories || [];

  const event = events.find((evt) => evt.id.toString() === id);

  if (!event) {
    return (
      <Box p={6}>
        <Text>Event not found</Text>
        <Button mt={4} onClick={() => navigate("/events")}>
          Go back
        </Button>
      </Box>
    );
  }

  function handleDelete() {
    const updated = {
      ...data,
      events: data.events.filter((e) => e.id !== event.id),
    };

    setData(updated);
    setDeleteOpen(false);
    navigate("/events");
  }

  function handleEditSubmit(values) {
    const updated = {
      ...data,
      events: data.events.map((e) =>
        e.id === event.id ? { ...e, ...values } : e
      ),
    };

    setData(updated);
    setEditOpen(false);
  }

  return (
    <Box p={6}>
      <Card.Root w="100%" maxW="800px" mx="auto" p={6} boxShadow="md">
        <Image
          src={event.image}
          alt={event.title}
          w="100%"
          h={{ base: "200px", md: "300px" }}
          objectFit="cover"
          borderRadius="md"
          mb={4}
        />

        <Card.Header>
          <Card.Title fontSize="2xl" fontWeight="bold">
            {event.title}
          </Card.Title>
          <Card.Description>{event.description}</Card.Description>
        </Card.Header>

        <Card.Body>
          <Text mt={2}>{event.location}</Text>

          <Text mt={2}>
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

          <HStack mt={4}>
            {event.categoryIds?.map((id) => {
              const category = categories.find((c) => c.id === id);
              return (
                <Badge key={id} colorPalette="orange">
                  {category?.name}
                </Badge>
              );
            })}
          </HStack>
        </Card.Body>

        <Card.Footer gap={3}>
          <Button onClick={() => setEditOpen(true)}>Edit</Button>
          <Button colorPalette="red" onClick={() => setDeleteOpen(true)}>
            Delete
          </Button>
          <Button onClick={() => navigate("/events")}>Back</Button>
        </Card.Footer>
      </Card.Root>

      {/* EDIT MODAL */}
      <SimpleModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit event"
      >
        <EventForm
          initialValues={event}
          onSubmit={handleEditSubmit}
          cancel={() => setEditOpen(false)}
        />
      </SimpleModal>

      {/* DELETE MODAL */}
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
  );
}
