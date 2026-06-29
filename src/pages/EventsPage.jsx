import {
  Image,
  HStack,
  Badge,
  Button,
  Box,
  Text,
  Card,
  SimpleGrid,
} from "@chakra-ui/react";

import Footer from "../components/ui/Footer";
import HeadingExample from "../components/ui/Heading";
import SimpleModal from "../components/ui/modal";
import { useState } from "react";
import EventCardSkeleton from "../components/ui/EventCardSkeleton";
import { useNavigate, useOutletContext } from "react-router-dom";
import EventForm from "../components/ui/EventForm";
import HeadingSkeleton from "../components/ui/HeadingSkeleton";
import { toaster } from "../components/ui/toaster"; 

import {
  createEvent,
  updateEvent,
  deleteEvent,
} from "../services/events";

export const EventsPage = () => {
  const { data, setData } = useOutletContext();
  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = data?.categories || [];
  const eventsArray = data?.events || [];

  // -----------------------------------------------------
  // LOADING STATE
  // -----------------------------------------------------
  if (!data) {
    return (
      <>
        <HeadingSkeleton
          data={data}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          categories={[]}
          onCreate={() => {}}
          noSticky
        />

        <Box
          position="fixed"
          inset="0"
          bgImage="url('/images/pexels-diva-34731924.jpg')"
          bgSize="cover"
          bgPosition="center"
          opacity="0.4"
          zIndex="-1"
        />

        <Box position="relative" zIndex="1" p={6}>
          <SimpleGrid columns={[1, 2, 3, 4]} gap={6}>
            {[...Array(4)].map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </SimpleGrid>
        </Box>

        <Footer>
          <Text textAlign="center" py={4} color="black.800">
            &copy; {new Date().getFullYear()} PixelWave. All rights reserved.
          </Text>
        </Footer>
      </>
    );
  }

  // -----------------------------------------------------
  // CRUD HANDLERS
  // -----------------------------------------------------

  async function handleCreate(values) {
    const newEvent = await createEvent(values);

    setData({
      ...data,
      events: [...data.events, newEvent],
    });
  }

  async function handleUpdate(values) {
    const updated = await updateEvent(values.id, values);

    setData({
      ...data,
      events: data.events.map((evt) =>
        evt.id === updated.id ? updated : evt
      ),
    });
  }

  async function handleDelete(id) {
    await deleteEvent(id);

    setData({
      ...data,
      events: data.events.filter((evt) => evt.id !== id),
    });

    setEditOpen(false);
  }

  async function handleCreate(values) {
  try {
    const newEvent = await createEvent(values);

    setData({
      ...data,
      events: [...data.events, newEvent],
    });

    // Toon succes melding
    toaster.create({
      title: "Event created!",
      description: "The new event has been saved successfully.",
      type: "success",
      duration: 3000,
    });
  } catch (error) {
    // Altijd handig: een foutmelding als er iets misgaat met de server
    toaster.create({
      title: "Something went wrong",
      description: "Could not create the event.",
      type: "error",
    });
  }
}

async function handleUpdate(values) {
  try {
    const updated = await updateEvent(values.id, values);

    setData({
      ...data,
      events: data.events.map((evt) =>
        evt.id === updated.id ? updated : evt
      ),
    });

    // Toon succes melding
    toaster.create({
      title: "Event updated!",
      description: "The changes have been saved successfully.",
      type: "success",
      duration: 3000,
    });
  } catch (error) {
    toaster.create({
      title: "Something went wrong",
      description: "Could not save the changes.",
      type: "error",
    });
  }
}
  // -----------------------------------------------------
  // FILTERING
  // -----------------------------------------------------
  const filteredEvents = eventsArray.filter((evt) => {
    const search = searchTerm.toLowerCase();

const matchesSearch =
  (evt.title || "").toLowerCase().includes(search) ||
  (evt.description || "").toLowerCase().includes(search) ||
  (evt.location || "").toLowerCase().includes(search) ||
  evt.categoryIds?.some((id) => {
    const category = categories.find((c) => c.id === id);
    return (category?.name || "").toLowerCase().includes(search);
  });


    const matchesCategories =
      selectedCategories.length === 0 ||
      evt.categoryIds?.some((id) => selectedCategories.includes(id));

    return matchesSearch && matchesCategories;
  });

  // -----------------------------------------------------
  // RENDER
  // -----------------------------------------------------
  return (
    <>
      <HeadingExample
        data={data}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onCreate={() => setCreateOpen(true)}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        categories={categories}
        noSticky
      />

      {/* CREATE MODAL */}
      <SimpleModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create new event"
      >
        <EventForm
          onSubmit={(values) => {
            handleCreate(values);
            setCreateOpen(false);
          }}
          cancel={() => setCreateOpen(false)}
          allCategories={categories}
        />
      </SimpleModal>

      {/* EDIT MODAL */}
      <SimpleModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit event"
      >
        <EventForm
          key={editEvent?.id}
          initialValues={editEvent}
          onSubmit={(values) => {
            handleUpdate(values);
            setEditOpen(false);
          }}
          onDelete={handleDelete}
          cancel={() => setEditOpen(false)}
          allCategories={categories}
        />
      </SimpleModal>

      {/* BACKGROUND */}
      <Box
        position="fixed"
        inset="0"
        bgImage="url('/images/pexels-diva-34731924.jpg')"
        bgSize="cover"
        bgPosition="center"
        opacity="0.4"
        zIndex="-1"
      />

      {/* CONTENT */}
      <Box position="relative" zIndex="1" px={6} pb={6} mt={6}>
        <SimpleGrid columns={[1, 2, 3, 4]} columnGap={6} rowGap={6}>
          {filteredEvents.map((evt) => (
            <Card.Root
              key={evt.id}
              w="100%"
              borderRadius="lg"
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
                  h={{ base: "140px", md: "160px", lg: "190px" }}
                  objectFit="cover"
                  borderRadius="md"
                  mb={4}
                />

                <Card.Title
                  fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                  fontWeight="bold"
                  lineHeight="1.2"
                  textAlign={{ base: "center", md: "left" }}
                >
                  {evt.title}
                </Card.Title>

                <Card.Description
                  fontSize={{ base: "md", md: "lg", lg: "xl" }}
                  lineHeight="1.3"
                  textAlign={{ base: "center", md: "left" }}
                  mt={2}
                  color="gray.600"
                >
                  {evt.description}
                </Card.Description>
              </Card.Header>

              <Card.Body px={6} pb={4}>
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

                <HStack mt={4} gap={2}>
                  {(evt.categoryIds || []).map((id) => {
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

              <Card.Footer gap={3} px={6} pb={6}>
                <Button
                  variant="surface"
                  border="1px solid"
                  borderColor="gray.500"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/events/${evt.id}`);
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
                    setEditEvent({
                      ...evt,
                      categoryIds: Array.isArray(evt.categoryIds)
                        ? evt.categoryIds
                        : [Number(evt.categoryIds)],
                    });
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
          &copy; {new Date().getFullYear()} PixelWave. All rights reserved.
        </Text>
      </Footer>
    </>
  );
};