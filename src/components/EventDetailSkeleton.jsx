import { Skeleton, Stack, HStack, Card, Button, Box } from "@chakra-ui/react";

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
        mb={3}
      />

      {/* HEADER */}
      <Card.Header>
        <Skeleton height="32px" width="70%" borderRadius="md" />
        <Skeleton height="20px" width="90%" borderRadius="md" mt={2} />
      </Card.Header>

      {/* BODY */}
      <Card.Body>
        <Skeleton height="20px" width="60%" borderRadius="md" mt={2} />
        <Skeleton height="18px" width="50%" borderRadius="md" mt={2} />

        <HStack
          mt={4}
          justify={{ base: "center", md: "flex-start" }}
          flexWrap="wrap"
          gap={2}
        >
          <Skeleton height="24px" width="70px" borderRadius="md" />
          <Skeleton height="24px" width="90px" borderRadius="md" />
          <Skeleton height="24px" width="60px" borderRadius="md" />
        </HStack>
      </Card.Body>

      {/* FOOTER BUTTONS */}
      <Card.Footer
        gap={3}
        justify={{ base: "center", md: "flex-start" }}
        flexWrap="wrap"
        mt={4}
      >
        <Skeleton height="36px" width="120px" borderRadius="md" />
        <Skeleton height="36px" width="100px" borderRadius="md" />
        <Skeleton height="36px" width="100px" borderRadius="md" />
      </Card.Footer>
    </Card.Root>
  );
}