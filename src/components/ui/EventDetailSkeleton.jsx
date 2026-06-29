import { Card, Skeleton, HStack } from "@chakra-ui/react";

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
        w="100%"
        h={{ base: "180px", sm: "220px", md: "260px" }}
        borderRadius="md"
        mb={3}
      />

      {/* HEADER */}
      <Card.Header>
        {/* Title */}
        <Skeleton
          height={{ base: "25px", md: "28px", lg: "34px" }}
          width="60%"
          mb={1}
        />

        {/* Description */}
        <Skeleton
          height={{ base: "16px", md: "18px", lg: "20px" }}
          width="80%"
          mb={4}
        />
      </Card.Header>

      {/* BODY */}
      <Card.Body px={6} pb={4}>
        {/* Location */}
        <Skeleton
          height={{ base: "16px", sm: "18px" }}
          width="55%"
          mb={2.5}
        />

        {/* Date */}
        <Skeleton
          height={{ base: "14px", sm: "16px" }}
          width="55%"
          mb={3}
        />

        {/* Badges */}
        <HStack
          mt={3}
          justify={{ base: "center", md: "flex-start" }}
          flexWrap="wrap"
          gap={2}
        >
          <Skeleton height="27px" width="65px" borderRadius="md" />
          <Skeleton height="27px" width="65px" borderRadius="md" />
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
        {/* Edit Event */}
        <Skeleton
          height="40px"
          width="100px"
          borderRadius="md"
        />

        {/* Delete Event */}
        <Skeleton
          height="40px"
          width="110px"
          borderRadius="md"
        />

        {/* Back */}
        <Skeleton
          height="40px"
          width="70px"
          borderRadius="md"
          ml="auto"
        />
      </Card.Footer>
    </Card.Root>
  );
}
