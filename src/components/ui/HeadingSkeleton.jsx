import React from "react";
import {
  Box,
  Input,
  Button,
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

  // MATCH FIX: Precies dezelfde gecentreerde verdeling (1fr 2fr 1fr) als de echte Heading
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
        {/* LOGO BOX SKELETON */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent={{ base: "center", md: "flex-start" }} // MATCH FIX: Links uitlijnen op desktop
          justifySelf="stretch" // MATCH FIX: Rekken over de 1fr kolom
          height="100%"
          w="100%"
          ps={{ base: 0, md: 4, lg: 8 }}
        >
          <Skeleton borderRadius="md">
            <Image
              src="/images/logo.png"
              alt="Winc Events Logo"
              w={{ base: "140px", md: "160px" }}
              style={{ opacity: 0, userSelect: "none" }}
            />
          </Skeleton>
        </Box>

        {/* SEARCH INPUT SKELETON */}
        {searchEnabled && (
          <Skeleton width="100%" maxW={{ base: "100%", md: "500px", lg: "600px" }} borderRadius="md" justifySelf="center">
            {/* MATCH FIX: maxW veranderd naar 600px en justifySelf="center" toegevoegd voor het perfecte midden */}
            <Input
              width="100%"
              placeholder="Search events..."
              style={{ opacity: 0 }}
              disabled
            />
          </Skeleton>
        )}

        {/* BUTTONS / RIGHT CONTENT SKELETON */}
        {(rightContent || onCreate || true) && (
          <Box
            display="flex"
            justifyContent={{ base: "center", md: "flex-end" }}
            justifySelf="stretch" // MATCH FIX: Rekken over de 1fr kolom
            alignItems="center"
            w="100%"
            pe={{ base: 0, md: 4, lg: 8 }}
          >
            {rightContent ? (
              <Skeleton borderRadius="md">
                <Box style={{ opacity: 0 }}>{rightContent}</Box>
              </Skeleton>
            ) : (
              <Box 
                display="flex" 
                gap={2} 
                flexWrap="nowrap" 
                justifyContent={{ base: "center", md: "flex-end" }}
                alignItems="center"
              >
                <Skeleton borderRadius="md">
                  <Button
                    variant="outline"
                    border="1px solid"
                    borderColor="gray.500"
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

      {/* CATEGORIES SKELETON */}
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

          {/* RESET FILTERS SKELETON */}
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