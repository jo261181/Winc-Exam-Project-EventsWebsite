import {
  Box,
  Input,
  Button,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";

export default function HeadingExample({
  children,
  data,
  onCreate,
  searchTerm,
  setSearchTerm,
}) {
  const events = Array.isArray(data?.events) ? data.events : [];
  const categories = Array.isArray(data?.categories) ? data.categories : [];

  const filteredEvents =
    searchTerm.trim() === ""
      ? events
      : events.filter((event) => {
          const search = searchTerm.toLowerCase();

          const eventCategoryNames =
            event.categoryIds
              ?.map((id) =>
                categories.find((c) => c.id === id)?.name?.toLowerCase(),
              )
              .filter(Boolean) || [];

          return (
            event.title.toLowerCase().includes(search) ||
            event.description.toLowerCase().includes(search) ||
            event.location.toLowerCase().includes(search) ||
            eventCategoryNames.some((cat) => cat.includes(search))
          );
        });

  return (
    <Box
      p={3}
      bg="gray.100"
      position="sticky"
      top="0"
      zIndex={100}
      boxShadow="sm"
    >
      <Flex
        align="center"
        justify="space-between"
        gap={4}
        flexWrap="wrap"
        mb={2}
      >
        <Heading size="lg">{children ?? "Events"}</Heading>

        <Input
          maxW="350px"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          bg="white"
        />

        <Button onClick={onCreate} colorScheme="blue">
          Create new event
        </Button>
      </Flex>

      {searchTerm.trim() !== "" && filteredEvents.length === 0 && (
        <Text color="gray.500" textAlign="center">
          No Event Found
        </Text>
      )}
    </Box>
  );
}