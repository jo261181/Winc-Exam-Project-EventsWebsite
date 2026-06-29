import React, { useMemo } from "react";
import {
  Box,
  Input,
  Button,
  Text,
  Image,
  Grid,
  Skeleton,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import { useColorMode, ColorModeButton } from "./color-mode";

export default function HeadingSkeleton({
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

  // EXACT OVERGENOMEN LOGICA EN BEREKENINGEN UIT HEADING.JSX
  const searchEnabled =
    typeof searchTerm === "undefined" && typeof setSearchTerm === "undefined"
      ? true
      : typeof searchTerm === "string" && typeof setSearchTerm === "function";

  const skeletonCategories =
    categories.length > 0
      ? categories
      : [
          { id: 1, name: "sports" },
          { id: 2, name: "games" },
          { id: 3, name: "relaxation" },
        ];

  const templateColumns = {
    base: "1fr",
    md: searchEnabled ? "1fr 2fr 1fr" : rightContent ? "1fr 1fr" : "1fr",
    lg: searchEnabled ? "1fr 3fr 1fr" : rightContent ? "1fr 1fr" : "1fr",
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
        gap={4}
        mb={2}
        minH={{ base: "auto", md: "90px" }}
        justifyItems="center" // Exact overgenomen uit Heading.jsx
      >
        {/* LOGO BOX - STRUCTUUR EN PROPS EXACT GELIJK */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          w="100%"
        >
          <Skeleton borderRadius="md">
            <Image
              src="/images/logo.png"
              alt="Winc Events Logo"
              w={{ base: "140px", md: "160px" }}
              style={{ opacity: 0, userSelect: "none" }} // Onzichtbaar voor de skeleton look
            />
          </Skeleton>
        </Box>

        {/* SEARCH INPUT - STRUCTUUR EN PROPS EXACT GELIJK */}
        {searchEnabled && (
          <Skeleton width="100%" maxW={{ base: "100%", md: "500px", lg: "700px" }} borderRadius="md">
            <Input
              width="100%"
              maxW={{ base: "100%", md: "500px", lg: "700px" }}
              placeholder="Search events..."
              _placeholder={{ color: "gray.600" }}
              color="black"
              bg="white"
              boxShadow="sm"
              aria-label="Search events"
              border="1px solid"
              borderColor="gray.300"
              style={{ opacity: 0 }}
            />
          </Skeleton>
        )}

        {/* BUTTONS / RIGHT CONTENT - STRUCTUUR EN PROPS EXACT GELIJK */}
        {(rightContent || onCreate || true) && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            w="100%"
          >
            {rightContent ? (
              <Skeleton borderRadius="md">
                <Box style={{ opacity: 0 }}>{rightContent}</Box>
              </Skeleton>
            ) : (
              <Box 
                display="flex" 
                gap={2} 
                flexWrap="wrap" 
                justifyContent="center"
                alignItems="center"
              >
                <Skeleton borderRadius="md">
                  <Button
                    variant="outline"
                    border="1px solid"
                    borderColor="gray.500"
                    colorScheme="blue"
                    size="sm"
                    style={{ opacity: 0, userSelect: "none" }}
                  >
                    Create new event
                  </Button>
                </Skeleton>

                <Skeleton borderRadius="md">
                  <Button
                    as={RouterLink}
                    to="/about-us"
                    variant="outline"
                    border="1px solid"
                    borderColor="gray.500"
                    size="sm"
                    style={{ opacity: 0, userSelect: "none" }}
                  >
                    About Us
                  </Button>
                </Skeleton>

                <Skeleton borderRadius="md">
                  <Box style={{ opacity: 0, userSelect: "none" }}>
                    <ColorModeButton size="sm" />
                  </Box>
                </Skeleton>
              </Box>
            )}
          </Box>
        )}
      </Grid>

      {/* CATEGORIES - STRUCTUUR EN PROPS EXACT GELIJK */}
      {skeletonCategories.length > 0 && (
        <Box mt={{ base: 4, md: 1 }} mb={2}>
          <Box display="flex" gap={3} flexWrap="wrap" justifyContent="center">
            {skeletonCategories.map((cat) => (
              <Skeleton key={cat.id} borderRadius="md">
                <Box
                  as="button"
                  px={3}
                  py={1}
                  borderRadius="md"
                  fontSize="sm"
                  fontWeight="medium"
                  border="1px solid"
                  style={{ opacity: 0, userSelect: "none" }}
                >
                  {cat.name}
                </Box>
              </Skeleton>
            ))}
          </Box>

          {/* RESET FILTERS - STRUCTUUR EN PROPS EXACT GELIJK */}
          <Box textAlign="center" mt={3} mb={3}>
            <Skeleton borderRadius="md" display="inline-block">
              <Button
                size="sm"
                variant="outline"
                borderColor="orange.400"
                color="orange.600"
                style={{ opacity: 0, userSelect: "none" }}
              >
                Reset filters
              </Button>
            </Skeleton>
          </Box>
        </Box>
      )}
    </Box>
  );
}