import { Box, SimpleGrid, Card, Skeleton, HStack, Stack } from "@chakra-ui/react";

export const EventsPageSkeleton = () => (
  <Box position="relative" zIndex="1" px={{ base: 4, md: 6 }} pb={6} mt={6}>
    <SimpleGrid 
      columns={[1, 2, 3, 4]} 
      columnGap={6} 
      rowGap={6}
      justifyItems={{ base: "center", md: "stretch" }} // Matcht de live pagina
      maxW="1400px" // Zorgt dat de grid stopt bij 1400px net als de live pagina
      mx="auto" // Centreert de grid op grote schermen
    >
      {[...Array(4)].map((_, i) => (
        <Card.Root
          key={i}
          w="100%"
          borderRadius="lg"
          boxShadow="md"
        >
          {/* HEADER */}
          <Card.Header p={6} w="100%" display="flex" flexDirection="column" alignItems={{ base: "center", md: "flex-start" }}>
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
            <Stack gap={1} alignItems={{ base: "center", md: "flex-start" }}>
              {/* LOCATION */}
              <Skeleton height="16px" width="60%" mb={1} />

              {/* DATE RANGE */}
              <Skeleton height="16px" width="80%" />
            </Stack>

            {/* CATEGORY BADGES */}
            <HStack mt={4} gap={2} flexWrap="wrap" justifyContent={{ base: "center", md: "flex-start" }}>
              <Skeleton height="24px" width="70px" borderRadius="md" />
              <Skeleton height="24px" width="90px" borderRadius="md" />
            </HStack>
          </Card.Body>

          {/* FOOTER */}
          <Card.Footer gap={3} px={6} pb={6} justifyContent={{ base: "center", md: "flex-start" }}>
            <Skeleton height="36px" width="110px" borderRadius="md" />
            <Skeleton height="36px" width="70px" borderRadius="md" />
          </Card.Footer>
        </Card.Root>
      ))}
    </SimpleGrid>
  </Box>
);