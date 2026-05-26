export const EventsPageSkeleton = () => {
  return (
    <Box p={6}>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} gap="30px">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card.Root
            key={i}
            w="100%"
            borderRadius="lg"
            bg="whiteAlpha.800"
            alignItems="center"
            mb={5}
            boxShadow="md"
            p={4}
          >
            {/* IMAGE */}
            <Skeleton
              height={{ base: "120px", md: "130px", lg: "170px" }}
              w="100%"
              borderRadius="md"
              mb={4}
            />

            {/* TITLE + DESCRIPTION */}
            <Stack w="100%" gap={3}>
              <Skeleton height="24px" width="70%" />
              <Skeleton height="16px" width="90%" />
              <Skeleton height="16px" width="50%" />
            </Stack>

            {/* LOCATION + DATE */}
            <Stack w="100%" mt={4} gap={2}>
              <Skeleton height="16px" width="60%" />
              <Skeleton height="16px" width="50%" />
            </Stack>

            {/* BADGES */}
            <HStack mt={4} w="100%" gap={2}>
              <Skeleton height="20px" width="60px" borderRadius="md" />
              <Skeleton height="20px" width="80px" borderRadius="md" />
            </HStack>

            {/* BUTTON */}
            <Skeleton
              height="36px"
              width="120px"
              mt={4}
              borderRadius="md"
            />
          </Card.Root>
        ))}
      </SimpleGrid>
    </Box>
  );
};
