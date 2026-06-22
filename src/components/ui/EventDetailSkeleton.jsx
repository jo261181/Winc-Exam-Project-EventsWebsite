import { Card, Skeleton, HStack } from "@chakra-ui/react";

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
      cursor="default"
      aria-hidden="true"
    >
      {/* IMAGE */}
      <Skeleton
        height={{ base: "180px", sm: "220px", md: "260px" }}
        w="100%"
        borderRadius="md"
        mb={4}
      />

      {/* HEADER */}
      <Card.Header px={6} mb={2}>
        <Skeleton height="32px" width="70%" mb={2} />
        <Skeleton height="20px" width="90%" />
      </Card.Header>

      {/* BODY */}
      <Card.Body px={6} pb={4}>
        <Skeleton height="18px" width="60%" mb={2} />
        <Skeleton height="18px" width="80%" mb={4} />

        <HStack
          mt={4}
          gap={2}
          flexWrap="wrap"
          justify={{ base: "center", md: "flex-start" }}
        >
          <Skeleton height="28px" width="80px" borderRadius="md" />
          <Skeleton height="28px" width="100px" borderRadius="md" />
        </HStack>
      </Card.Body>

      {/* FOOTER */}
      <Card.Footer
        gap={3}
        px={6}
        pb={6}
        justify={{ base: "center", md: "flex-start" }}
        flexWrap="wrap"
      >
        <Skeleton height="40px" width="130px" borderRadius="md" />
        <Skeleton height="40px" width="130px" borderRadius="md" />
        <Skeleton height="40px" width="130px" borderRadius="md" />
      </Card.Footer>
    </Card.Root>
  );
}
