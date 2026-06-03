import { Skeleton, Stack, HStack, Card } from "@chakra-ui/react";

export default function EventDetailSkeleton() {
  return (
    <Card.Root
      w="100%"
      maxW={{ base: "100%", sm: "500px", md: "650px", lg: "700px" }}
      mx="auto"
      p={{ base: 4, md: 6 }}
      boxShadow="md"
    >
      <Skeleton
        height={{ base: "180px", sm: "220px", md: "260px" }}
        w="100%"
        borderRadius="md"
        mb={3}
      />

      <Stack w="100%" gap={3}>
        <Skeleton height="28px" width="70%" />
        <Skeleton height="18px" width="90%" />
        <Skeleton height="18px" width="50%" />
      </Stack>

      <Stack w="100%" mt={4} gap={2}>
        <Skeleton height="16px" width="60%" />
        <Skeleton height="16px" width="50%" />
      </Stack>

      <HStack mt={4} w="100%" gap={2}>
        <Skeleton height="20px" width="60px" borderRadius="md" />
        <Skeleton height="20px" width="80px" borderRadius="md" />
      </HStack>
    </Card.Root>
  );
}