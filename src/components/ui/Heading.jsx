import React, { useMemo } from "react";
import {
  Box,
  Input,
  Button,
  Text,
  Image,
  Grid,
  ButtonGroup,
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

  const templateColumns = {
    base: rightContent ? "1fr 1fr" : "1fr",
    md: searchEnabled ? "1fr 2fr 1fr" : rightContent ? "1fr 1fr" : "1fr",
    lg: searchEnabled ? "1fr 3fr 1fr" : rightContent ? "1fr 1fr" : "1fr",
  };

  return (
    <Box
      pt={5}
      pb={3}
      px={3}
      bg={colorMode === "dark" ? "black" : "white"}
      position={noSticky ? "relative" : "sticky"}
      top={noSticky ? "auto" : "0"}
      zIndex={100}
      boxShadow="sm"
    >
      <Grid
        templateColumns={templateColumns}
        alignItems="center"
        gap={4}
        mb={2}
        minH={{ base: "auto", md: "90px" }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent={{ base: "center", md: "flex-start" }}
          height="100%"
        >
          <Image
            src="/images/logo.png"
            alt="Winc Events Logo"
            w={{ base: "130px", md: "160px" }}
            ml={{ base: 0, md: "20px" }}
          />
        </Box>

        {searchEnabled && (
          <Input
            width="100%"
            maxW={{ base: "100%", md: "500px", lg: "700px" }}
            placeholder="Search events..."
            _placeholder={{ color: "gray.800" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            color="black"
            bg="white"
            boxShadow="sm"
            justifySelf="center"
            aria-label="Search events"
          />
        )}

        {(rightContent || onCreate) && (
          <Box
            display="flex"
            justifyContent={{ base: "center", md: "flex-end" }}
            pr={{ base: 0, md: "20px" }}
            mb={{ base: 7, md: 0 }}
          >
            {rightContent ? (
              rightContent
            ) : (
              <ButtonGroup>
                <Button
                  variant="outline"
                  border="1px solid"
                  borderColor="gray.300"
                  onClick={onCreate}
                  colorScheme="blue"
                >
                  Create new event
                </Button>

                <Button
                  as={RouterLink}
                  to="/about-us"
                  variant="outline"
                  border="1px solid"
                  borderColor="gray.300"
                >
                  About Us
                </Button>

                <ColorModeButton />
              </ButtonGroup>
            )}
          </Box>
        )}
      </Grid>

      {categories.length > 0 && (
        <Box mt={{ base: 3, md: 1 }} mb={2}>
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

      {searchEnabled && searchTerm?.trim() !== "" && filteredEvents.length === 0 && (
        <Text color="gray.700" textAlign="center">
          No Event Found
        </Text>
      )}
    </Box>
  );
}