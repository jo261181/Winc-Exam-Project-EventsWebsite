import {
  Box,
  Input,
  Button,
  Flex,
  Heading,
  Text,
  Image,
  Grid,
  ButtonGroup,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function HeadingExample({
  data,
  onCreate,
  searchTerm,
  setSearchTerm,
  rightContent,
}) {

  const searchEnabled =
    typeof searchTerm === "string" && typeof setSearchTerm === "function";

  const events = Array.isArray(data?.events) ? data.events : [];
  const categories = Array.isArray(data?.categories) ? data.categories : [];

  const filteredEvents =
    searchEnabled && searchTerm.trim() !== ""
      ? events.filter((event) => {
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
          base: rightContent ? "1fr 1fr" : "1fr",
          md: searchEnabled ? "1fr 2fr 1fr" : rightContent ? "1fr 1fr" : "1fr",
          lg: searchEnabled ? "1fr 3fr 1fr" : rightContent ? "1fr 1fr" : "1fr",
        }}
        alignItems="center"
        gap={4}
        mb={2}
      >
  
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

        {(rightContent || onCreate) && (
          <Box
            display="flex"
            justifyContent={{ base: "center", md: "flex-end" }}
            pr={{ base: 0, md: "20px" }}
          >
            {rightContent ? (
              rightContent
            ) : (
              <ButtonGroup>
                <Button onClick={onCreate} colorScheme="blue">
                  Create new event
                </Button>
                <Button as={RouterLink} to="/about-us" colorScheme="teal">
                  About Us
                </Button>
              </ButtonGroup>
            )}
          </Box>
        )}
      </Grid>

      
      {searchEnabled &&
        searchTerm.trim() !== "" &&
        filteredEvents.length === 0 && (
          <Text color="gray.500" textAlign="center">
            No Event Found
          </Text>
        )}
    </Box>
  );
}
