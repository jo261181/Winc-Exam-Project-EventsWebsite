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

import HeadingExample from "../components/ui/Heading";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import SimpleModal from "../components/ui/modal";
import EventForm from "../components/ui/EventForm";
import Footer from "../components/ui/Footer";

export const EventsPage = () => {
  const { data, setData } = useOutletContext();
  const [createOpen, setCreateOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const eventsArray = data.events || [];
  const categories = data.categories || [];

  const addEvent = (newEvent) => {
    let imageUrl = null;

    if (newEvent.image instanceof File) {
      imageUrl = URL.createObjectURL(newEvent.image);
    }

    const updated = {
      ...data,
      events: [
        ...data.events,
        {
          id: crypto.randomUUID(),
          ...newEvent,
          image: imageUrl,
          categoryIds: [],
        },
      ],
    };

    setData(updated);

    toaster.create({
      title: "Event created",
      description: "Your event has been successfully added.",
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

  return (
    <>
      <HeadingExample
        data={data}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onCreate={() => setCreateOpen(true)}
      />

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
        />
      </SimpleModal>

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
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} gap="30px">
          {filteredEvents.map((evt) => (
            <Card.Root
              key={evt.id}
              w="100%"
              borderRadius="lg"
              bg="whiteAlpha.800"
              alignItems="center"
              mb={5}
              cursor="pointer"
              onClick={() => navigate(`/events/${evt.id}`)}
              boxShadow="md"
              _hover={{
                transform: "scale(1.03)",
                boxShadow: "lg",
              }}
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

                <Card.Title
                  fontSize={{ base: "md", md: "lg", lg: "2xl" }}
                  fontWeight="semibold"
                >
                  {evt.title}
                </Card.Title>

                <Card.Description>{evt.description}</Card.Description>
              </Card.Header>

              <Card.Body>
                <Text mt={1}>{evt.location}</Text>

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
                      <Badge key={id} colorPalette="orange">
                        {category?.name}
                      </Badge>
                    );
                  })}
                </HStack>
              </Card.Body>

              <Card.Footer gap={3}>
                <Button onClick={() => navigate(`/events/${evt.id}`)}>
                  View details
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
