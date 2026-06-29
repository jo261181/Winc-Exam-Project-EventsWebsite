import React, { useMemo } from "react";
import {
  Box,
  Input,
  Button,
  Text,
  Image,
  Grid,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import { useColorMode, ColorModeButton } from "./color-mode";

export default function HeadingExample({
  data = {},
  onCreate,
  searchTerm,
  setSearchTerm,
  selectedCategories = [],
  setSelectedCategories = () => {},
  categories = [],
  rightContent = null,
  noSticky = false,
}) {
  const { colorMode } = useColorMode();

  const searchEnabled =
    typeof searchTerm === "string" && typeof setSearchTerm === "function";

  const events = Array.isArray(data?.events) ? data.events : [];

  const filteredEvents = useMemo(() => {
    if (!searchEnabled) return events;

    const search = (searchTerm || "").trim().toLowerCase();
    if (search === "") return events;

    return events.filter((event) => {
      const title = (event.title || "").toLowerCase();
      const description = (event.description || "").toLowerCase();
      const location = (event.location || "").toLowerCase();

      const eventCategoryNames =
        (event.categoryIds || [])
          .map((id) => categories.find((c) => c.id === id)?.name?.toLowerCase())
          .filter(Boolean) || [];

      return (
        title.includes(search) ||
        description.includes(search) ||
        location.includes(search) ||
        eventCategoryNames.some((cat) => cat.includes(search))
      );
    });
  }, [events, searchEnabled, searchTerm, categories]);

  const toggleCategory = (catId) => {
    if (selectedCategories.includes(catId)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== catId));
    } else {
      setSelectedCategories([...selectedCategories, catId]);
    }
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    if (searchEnabled) setSearchTerm("");
  };

  // VERANDERING: Kolommen veranderd naar 1fr delen zodat het midden ook écht het absolute midden is
  const templateColumns = {
    base: "1fr",
    md: searchEnabled ? "1fr 2fr 1fr" : rightContent ? "1fr 1fr" : "1fr",
    lg: searchEnabled ? "1fr 2fr 1fr" : rightContent ? "1fr 1fr" : "1fr",
  };

  return (
    <Box
      pt={5}
      pb={3}
      px={4}
      bg={colorMode === "dark" ? "black" : "white"}
      position={noSticky ? "relative" : "sticky"}
      top={noSticky ? "auto" : "0"}
      zIndex={100}
      boxShadow="sm"
    >
      <Grid
        templateColumns={templateColumns}
        alignItems="center"
        gap={6}
        mb={6}
        minH={{ base: "auto", md: "90px" }}
        justifyItems="center"
      >
        {/* LOGO BOX */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent={{ base: "center", md: "flex-start" }} // Aangepast naar links uitlijnen op desktop voor betere balans
          justifySelf="stretch" // Strekt uit om de 1fr kolom te vullen
          height="100%"
          w="100%"
          ps={{ base: 0, md: 4, lg: 8 }}
        >
          <Image
            src="/images/logo.png"
            alt="Winc Events Logo"
            w={{ base: "140px", md: "160px" }}
          />
        </Box>

        {/* SEARCH INPUT + NO EVENT FOUND MELDING */}
        {searchEnabled && (
          <Box 
            width="100%" 
            maxW={{ base: "100%", md: "500px", lg: "600px" }} // Iets verfijnde max breedte voor een strakkere look
            display="flex"
            flexDirection="column"
            alignItems="center"
            position="relative"
            justifySelf="center" // Forceert de box exact in het midden van zijn grid-sectie
          >
            <Input
              width="100%"
              placeholder="Search events..."
              _placeholder={{ color: "gray.600" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              color="black"
              bg="white"
              boxShadow="sm"
              aria-label="Search events"
              border="1px solid"
              borderColor="gray.300"
            />
            
            {searchTerm?.trim() !== "" && filteredEvents.length === 0 && (
              <Text 
                color="red.500" 
                textAlign="center" 
                fontWeight="medium" 
                position="absolute"
                top="100%"
                left="0"
                right="0"
                mt={1}
              >
                No Event Found
              </Text>
            )}
          </Box>
        )}

        {/* BUTTONS / RIGHT CONTENT */}
        {(rightContent || onCreate) && (
          <Box
            display="flex"
            justifyContent={{ base: "center", md: "flex-end" }}
            justifySelf="stretch" // Strekt uit om de 1fr kolom te vullen
            alignItems="center"
            w="100%"
            pe={{ base: 0, md: 4, lg: 8 }}
          >
            {rightContent ? (
              rightContent
            ) : (
              <Box 
                display="flex" 
                gap={2} 
                flexWrap="nowrap" 
                justifyContent={{ base: "center", md: "flex-end" }}
                alignItems="center"
                whiteSpace="nowrap"
              >
                <Button
                  variant="outline"
                  border="1px solid"
                  borderColor="gray.500"
                  onClick={onCreate}
                  colorScheme="blue"
                  size="sm"
                >
                  Create new event
                </Button>

                <Button
                  as={RouterLink}
                  to="/about-us"
                  variant="outline"
                  border="1px solid"
                  borderColor="gray.500"
                  size="sm"
                >
                  About Us
                </Button>

                <ColorModeButton size="sm" />
              </Box>
            )}
          </Box>
        )}
      </Grid>

      {/* CATEGORIES */}
      {categories.length > 0 && (
        <Box mt={{ base: 4, md: 1 }} mb={2}>
          <Box display="flex" gap={3} flexWrap="wrap" justifyContent="center">
            {categories.map((cat) => {
              const active = selectedCategories.includes(cat.id);

              return (
                <Box
                  key={cat.id}
                  as="button"
                  px={3}
                  py={1}
                  borderRadius="md"
                  fontSize="sm"
                  fontWeight="medium"
                  bg={active ? "orange.500" : "orange.100"}
                  color={active ? "white" : "black"}
                  border="1px solid"
                  borderColor={active ? "orange.600" : "orange.300"}
                  boxShadow={active ? "inset 0 0 6px rgba(0,0,0,0.25)" : "sm"}
                  transform={active ? "translateY(1px)" : "none"}
                  transition="all 0.15s ease"
                  _hover={{
                    bg: active ? "orange.600" : "orange.200",
                  }}
                  _active={{
                    bg: "orange.700",
                    transform: "translateY(2px)",
                    boxShadow: "inset 0 0 8px rgba(0,0,0,0.35)",
                  }}
                  onClick={() => toggleCategory(cat.id)}
                  aria-pressed={active}
                >
                  {cat.name}
                </Box>
              );
            })}
          </Box>

          <Box textAlign="center" mt={3} mb={3}>
            <Button
              size="sm"
              variant="outline"
              borderColor="orange.400"
              color="orange.600"
              onClick={resetFilters}
            >
              Reset filters
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}