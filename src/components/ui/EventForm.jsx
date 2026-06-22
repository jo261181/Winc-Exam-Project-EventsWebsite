import { Card, Skeleton, Stack, HStack, Box } from "@chakra-ui/react";

export default function EventFormSkeleton() {
  return (
    <Card.Root maxW="sm" mx="auto" p={0}>
      {/* HEADER */}
      <Card.Header p={6}>
        <Skeleton height="20px" width="80%" />
      </Card.Header>

      {/* BODY */}
      <Card.Body px={6} pb={4}>
        <Stack gap={4} w="full">

          {/* Event Name */}
          <Box>
            <Skeleton height="16px" width="120px" mb={2} />
            <Skeleton height="40px" borderRadius="md" />
          </Box>

          {/* Categories */}
          <Box>
            <Skeleton height="16px" width="100px" mb={3} />
            <Stack gap={2}>
              <HStack gap={2}>
                <Skeleton height="20px" width="20px" borderRadius="sm" />
                <Skeleton height="16px" width="80px" />
              </HStack>
              <HStack gap={2}>
                <Skeleton height="20px" width="20px" borderRadius="sm" />
                <Skeleton height="16px" width="100px" />
              </HStack>
              <HStack gap={2}>
                <Skeleton height="20px" width="20px" borderRadius="sm" />
                <Skeleton height="16px" width="90px" />
              </HStack>
            </Stack>
          </Box>

          {/* Description */}
          <Box>
            <Skeleton height="16px" width="140px" mb={2} />
            <Skeleton height="90px" borderRadius="md" />
          </Box>

          {/* Location */}
          <Box>
            <Skeleton height="16px" width="90px" mb={2} />
            <Skeleton height="40px" borderRadius="md" />
          </Box>

          {/* Startdate */}
          <Box>
            <Skeleton height="16px" width="160px" mb={2} />
            <Skeleton height="40px" borderRadius="md" />
          </Box>

          {/* Enddate */}
          <Box>
            <Skeleton height="16px" width="150px" mb={2} />
            <Skeleton height="40px" borderRadius="md" />
          </Box>

          {/* Image preview */}
          <Box>
            <Skeleton
              height="180px"
              width="100%"
              borderRadius="md"
              mb={3}
            />
            <Skeleton height="40px" width="100%" borderRadius="md" />
          </Box>
        </Stack>
      </Card.Body>

      {/* FOOTER */}
      <Card.Footer
        justifyContent="center"
        gap={6}
        pt={4}
        pb={6}
      >
        <Skeleton height="40px" width="120px" borderRadius="md" />
        <Skeleton height="40px" width="160px" borderRadius="md" />
      </Card.Footer>
    </Card.Root>
  );
}
