import {
  Box,
  Input,
  Button,
  Flex,
  Heading,
  Text,
  Image,
  Center,
  Grid,
} from "@chakra-ui/react";

export default function HeadingExample({
  children,
  data,
  onCreate,
  searchTerm,
  setSearchTerm,
}) {
  // 🔹 Fallback: als er geen searchTerm is → simpele header
  const searchEnabled = typeof searchTerm === "string" && typeof setSearchTerm === "function";

  const events = Array.isArray(data?.events) ? data.events : [];
  const categories = Array.isArray(data?.categories) ? data.categories : [];

  const filteredEvents =
    searchEnabled && searchTerm.trim() !== ""
      ? events.filter((event) => {
          const search = searchTerm.toLowerCase();

          const eventCategoryNames =
            event.categoryIds
              ?.map((id) =>
                categories.find((c) => c.id === id)?.name?.toLowerCase()
              )
              .filter(Boolean) || [];

          return (
            event.title.toLowerCase().includes(search) ||
            event.description.toLowerCase().includes(search) ||
            event.location.toLowerCase().includes(search) ||
            eventCategoryNames.some((cat) => cat.includes(search))
          );
        })
      : events;

  return (
    <Box
      p={3}
      bg="gray.100"
      position="sticky"
      top="0"
      zIndex={100}
      boxShadow="sm"
    >
      <Grid
        templateColumns={{
          base: "1fr",
          md: searchEnabled ? "1fr 2fr 1fr" : "1fr",
          lg: searchEnabled ? "1fr 3fr 1fr" : "1fr",
        }}
        alignItems="center"
        gap={4}
        mb={2}
      >
        {/* Logo */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent={{ base: "center", md: "flex-start" }}
        >
          <Image
            src="/images/logo.png"
            alt="Winc Events Logo"
            w={{ base: "100px", md: "120px" }}
            ml={{ base: 0, md: "20px" }}
          />
        </Box>

        {/* 🔹 Zoekbalk alleen tonen als searchEnabled true is */}
        {searchEnabled && (
          <Input
            width="100%"
            maxW={{ base: "100%", md: "500px", lg: "700px" }}
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            bg="white"
            justifySelf="center"
          />
        )}

        {/* 🔹 Knop alleen tonen als onCreate bestaat */}
        {onCreate && (
          <Box
            display="flex"
            justifyContent={{ base: "center", md: "flex-end" }}
            pr={{ base: 0, md: "20px" }}
          >
            <Button onClick={onCreate} colorScheme="blue">
              Create new event
            </Button>
          </Box>
        )}
      </Grid>

      {/* 🔹 No Event Found alleen als searchEnabled */}
      {searchEnabled && searchTerm.trim() !== "" && filteredEvents.length === 0 && (
        <Text color="gray.500" textAlign="center">
          No Event Found
        </Text>
      )}
    </Box>
  );
}