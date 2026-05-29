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

// ⭐ Skeleton voor EventsPage
export const EventsPageSkeleton = () => {
  return (
    <Box p={6}>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} gap="30px">
        {[1, 2, 3, 4, 5, 6].map((i) => (
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
};

// ⭐ EventsPage component
export const EventsPage = () => {
  // ⬇️ ALLE HOOKS BOVENAAN (belangrijk!)
  const { data, setData } = useOutletContext();
  const navigate = useNavigate();

  const [createOpen, setCreateOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // ⬇️ Skeleton tonen zolang data nog niet geladen is
  if (!data) return <EventsPageSkeleton />;

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
        rightContent={null}
        noSticky
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
        backgroundColor={{ base: "gray.400", _dark: "gray.700" }}
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
                  fontWeight="bold"
                >
                  {evt.title}
                </Card.Title>

                <Card.Description
                  fontSize={{ base: "sx", md: "sm", lg: "md" }}
                  fontWeight="semibold"
                >
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
                  variant="surface" border="1px solid" borderColor="gray.300"
                  onClick={() => navigate(`/events/${evt.id}`)}
                >
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
