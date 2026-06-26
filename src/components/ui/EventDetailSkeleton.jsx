import { Card, Skeleton, HStack, Box } from "@chakra-ui/react";

export default function EventDetailSkeleton() {
  return (
    <Card.Root
      w="100%"
      maxW={{ base: "100%", sm: "500px", md: "650px", lg: "700px" }}
      mx="auto"
      p={{ base: 4, md: 6 }}
      boxShadow="md"
      borderRadius="lg"
      pointerEvents="none"
      aria-hidden="true"
    >
      {/* IMAGE */}
      <Skeleton
        w="100%"
        h={{ base: "180px", sm: "220px", md: "260px" }}
        borderRadius="md"
        mb={3}
      />

      {/* HEADER */}
      <Card.Header>
        {/* Titel */}
        <Skeleton height="32px" width="70%" mb={1} />

        {/* Description – moet groter zijn */}
        <Skeleton height="16px" width="85%" />
      </Card.Header>

      {/* BODY */}
      <Card.Body px={6} pb={4}>
        {/* Location */}
        <Skeleton height="16px" width="60%" mt={2} mb={1} />

        {/* Date */}
        <Skeleton height="14px" width="55%" mb={1} />

        {/* Badges – echte badges zijn breder */}
        <HStack
          mt={4}
          justify={{ base: "center", md: "flex-start" }}
          flexWrap="wrap"
          gap={2}
        >
          <Skeleton height="26px" width="100px" borderRadius="md" />
          <Skeleton height="26px" width="100px" borderRadius="md" />
        </HStack>
      </Card.Body>

      {/* FOOTER BUTTONS */}
      <Card.Footer
        gap={3}
        px={6}
        pb={6}
        justify={{ base: "center", md: "flex-start" }}
        flexWrap="wrap"
      >
        {/* Edit Event */}
        <Skeleton height="32px" width="130px" borderRadius="md" />

        {/* Delete Event */}
        <Skeleton height="32px" width="130px" borderRadius="md" />

        {/* Back */}
        <Box ml="auto">
          <Skeleton height="32px" width="80px" borderRadius="md" />
        </Box>
      </Card.Footer>
    </Card.Root>
  );
}
