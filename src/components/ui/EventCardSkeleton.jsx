import { Card, Skeleton, HStack } from "@chakra-ui/react";

export default function EventCardSkeleton() {
  return (
    <Card.Root
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
          w="100%"
          h={{ base: "140px", md: "160px", lg: "190px" }}
          borderRadius="md"
          mb={4}
        />

        {/* TITLE */}
        <Skeleton
          height="28px"
          width="70%"
          borderRadius="md"
          mb={2}
        />

        {/* DESCRIPTION */}
        <Skeleton
          height="20px"
          width="90%"
          borderRadius="md"
        />
      </Card.Header>

      {/* BODY */}
      <Card.Body px={6} pb={4}>
        {/* LOCATION */}
        <Skeleton height="18px" width="60%" mb={1} />

        {/* DATE RANGE */}
        <Skeleton height="18px" width="80%" />

        {/* CATEGORY BADGES */}
        <HStack mt={4} gap={2}>
          <Skeleton height="28px" width="70px" borderRadius="md" />
          <Skeleton height="28px" width="90px" borderRadius="md" />
          <Skeleton height="28px" width="60px" borderRadius="md" />
        </HStack>
      </Card.Body>

      {/* FOOTER */}
      <Card.Footer gap={3} px={6} pb={6}>
        <Skeleton height="40px" width="120px" borderRadius="md" />
        <Skeleton height="40px" width="110px" borderRadius="md" />
      </Card.Footer>
    </Card.Root>
  );
}