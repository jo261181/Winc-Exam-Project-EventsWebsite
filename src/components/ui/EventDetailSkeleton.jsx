import { Card, Skeleton, HStack, Box } from "@chakra-ui/react";

export default function EventDetailSkeleton() {
  return (
    <Card.Root
      w="100%"
      maxW={{ base: "100%", sm: "500px", md: "650px", lg: "700px" }}
      mx="auto"
      p={{ base: 4, md: 6 }}
      boxShadow="md"
    >
      {/* IMAGE */}
      <Skeleton
        height={{ base: "180px", sm: "220px", md: "260px" }}
        w="100%"
        borderRadius="md"
        mb={4}   // ⭐ gelijk aan echte detailpagina
      />

      {/* HEADER */}
      <Card.Header p={0} mb={2}>
        <Skeleton height="32px" width="70%" mb={2} />   {/* title */}
        <Skeleton height="20px" width="90%" />          {/* description */}
      </Card.Header>

      {/* BODY */}
      <Card.Body p={0} mt={2}>
        <Skeleton height="18px" width="60%" mb={2} />   {/* location */}
        <Skeleton height="18px" width="80%" mb={4} />   {/* date/time */}

        <HStack mt={4} gap={2} flexWrap="wrap">
          <Skeleton height="28px" width="80px" borderRadius="md" />
          <Skeleton height="28px" width="100px" borderRadius="md" />
        </HStack>
      </Card.Body>

      {/* FOOTER */}
      <Card.Footer p={0} mt={6} gap={3} flexWrap="wrap">
        <Skeleton height="40px" width="130px" borderRadius="md" />
        <Skeleton height="40px" width="130px" borderRadius="md" />
        <Skeleton height="40px" width="130px" borderRadius="md" />
      </Card.Footer>
    </Card.Root>
  );
}
