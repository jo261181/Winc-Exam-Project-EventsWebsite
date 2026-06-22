import { Box, SimpleGrid, Card, Skeleton, HStack } from "@chakra-ui/react";

export const EventsPageSkeleton = () => (
  <Box position="relative" zIndex="1" px={6} pb={6}>
    <SimpleGrid columns={[1, 2, 3, 4]} columnGap={6} rowGap={6}>
      {[...Array(4)].map((_, i) => (
        <Card.Root
          key={i}
          w="100%"
          borderRadius="lg"
          cursor="pointer"
          boxShadow="md"
          _hover={{ transform: "scale(1.03)", boxShadow: "lg" }}
          transition="0.2s"
        >
          {/* HEADER */}
          <Card.Header p={6} w="100%">
            {/* IMAGE */}
            <Skeleton
              height={{ base: "140px", md: "160px", lg: "190px" }}
              w="100%"
              borderRadius="md"
              mb={4}
            />

            {/* TITLE */}
            <Skeleton
              height="26px"
              width="70%"
              borderRadius="md"
              mb={2}
            />

            {/* DESCRIPTION */}
            <Skeleton
              height="18px"
              width="90%"
              borderRadius="md"
            />
          </Card.Header>

          {/* BODY */}
          <Card.Body px={6} pb={4}>
            {/* LOCATION */}
            <Skeleton height="16px" width="60%" mb={1} />

            {/* DATE RANGE */}
            <Skeleton height="16px" width="80%" />

            {/* CATEGORY BADGES */}
            <HStack mt={4} gap={2}>
              <Skeleton height="24px" width="70px" borderRadius="md" />
              <Skeleton height="24px" width="90px" borderRadius="md" />
            </HStack>
          </Card.Body>

          {/* FOOTER */}
          <Card.Footer gap={3} px={6} pb={6}>
            <Skeleton height="36px" width="120px" borderRadius="md" />
            <Skeleton height="36px" width="100px" borderRadius="md" />
          </Card.Footer>
        </Card.Root>
      ))}
    </SimpleGrid>
  </Box>
);
