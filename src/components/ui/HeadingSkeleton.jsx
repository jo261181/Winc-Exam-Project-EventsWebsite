import {
  Box,
  Grid,
  Skeleton,
  SkeletonText,
  ButtonGroup,
} from "@chakra-ui/react";
import { useColorMode } from "./color-mode";

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

  // Zelfde logica als Heading.jsx
  const searchEnabled =
    typeof searchTerm === "string" && typeof setSearchTerm === "function";

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
      {/* HEADER GRID */}
      <Grid
        templateColumns={templateColumns}
        alignItems="center"
        gap={4}
        mb={2}
        minH={{ base: "auto", md: "90px" }}
      >
        {/* LOGO */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent={{ base: "center", md: "flex-start" }}
          height="100%"
        >
          <Skeleton
            height="50px"
            width={{ base: "130px", md: "160px" }}
            ml={{ base: 0, md: "20px" }}
          />
        </Box>

        {/* SEARCH BAR */}
        {searchEnabled && (
          <Skeleton
            height="40px"
            width="100%"
            maxW={{ base: "100%", md: "500px", lg: "700px" }}
            justifySelf="center"
          />
        )}

        {/* BUTTONS */}
        {(rightContent || onCreate) && (
          <Box
            display="flex"
            justifyContent={{ base: "center", md: "flex-end" }}
            pr={{ base: 0, md: "20px" }}
            mb={{ base: 7, md: 0 }}
          >
            {rightContent ? (
              <Skeleton height="40px" width="160px" borderRadius="md" />
            ) : (
              <ButtonGroup>
                <Skeleton height="40px" width="150px" borderRadius="md" />
                <Skeleton height="40px" width="110px" borderRadius="md" />
                <Skeleton height="40px" width="40px" borderRadius="md" />
              </ButtonGroup>
            )}
          </Box>
        )}
      </Grid>

      {/* CATEGORY FILTERS */}
      {categories.length > 0 && (
        <Box mt={{ base: 3, md: 1 }} mb={2}>
          <Box display="flex" gap={3} flexWrap="wrap" justifyContent="center">
            {categories.map((cat) => (
              <Skeleton
                key={cat.id}
                height="32px"
                width={`${cat.name.length * 8 + 24}px`}
                borderRadius="md"
              />
            ))}
          </Box>

          {/* RESET BUTTON */}
          <Box textAlign="center" mt={3} mb={3}>
            <Skeleton height="32px" width="110px" borderRadius="md" mx="auto" />
          </Box>
        </Box>
      )}

      {/* NO RESULTS MESSAGE */}
      {searchEnabled && searchTerm?.trim() !== "" && (
        <Box textAlign="center">
          <SkeletonText noOfLines={1} width="140px" mx="auto" />
        </Box>
      )}
    </Box>
  );
}
