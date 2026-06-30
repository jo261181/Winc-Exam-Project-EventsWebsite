import { Card, Skeleton, HStack, Stack, Box } from "@chakra-ui/react";

export default function EventCardSkeleton() {
  return (
    <Card.Root w="100%" borderRadius="lg" boxShadow="md">
      <Card.Header p={6} w="100%">
        <Skeleton
          placeholder="image"
          h={{ base: "140px", md: "160px", lg: "190px" }}
          w="100%"
          borderRadius="md"
          mb={4}
        />

        <Box display="flex" justifyContent={{ base: "center", md: "flex-start" }}>
          <Skeleton
            height="24px"
            width="75%"
            borderRadius="md"
            mb={2}
          />
        </Box>

        <Stack gap={1.5} mt={2} alignItems={{ base: "center", md: "flex-start" }}>
          <Skeleton height="14px" width="100%" borderRadius="sm" />
          <Skeleton height="14px" width="85%" borderRadius="sm" />
        </Stack>
      </Card.Header>

      <Card.Body px={6} pb={4}>
        <Stack gap={2} alignItems={{ base: "center", md: "flex-start" }}>
          <Skeleton height="16px" width="50%" borderRadius="sm" />
          <Skeleton height="14px" width="65%" borderRadius="sm" />
        </Stack>

      <HStack mt={4} flexWrap="wrap" gap={2} justifyContent={{ base: "center", md: "flex-start" }}>
          <Skeleton height="22px" width="60px" borderRadius="md" />
          <Skeleton height="22px" width="75px" borderRadius="md" />
        </HStack>
      </Card.Body> 

      <Card.Footer gap={3} px={6} pb={6} justifyContent={{ base: "center", md: "flex-start" }}>
        <Skeleton height="36px" width="110px" borderRadius="md" />
        <Skeleton height="36px" width="70px" borderRadius="md" />
      </Card.Footer>
    </Card.Root>
  );
}