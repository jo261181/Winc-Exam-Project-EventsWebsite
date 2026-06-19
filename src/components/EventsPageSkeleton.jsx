import {
  Box,
  Skeleton,
  Stack,
  SimpleGrid,
  HStack,
  Card,
} from "@chakra-ui/react";

export default function EventsPageSkeleton() {
  return (
    <>
      {/* BACKGROUND */}
      <Box
        position="fixed"
        inset="0"
        bgImage="url('/images/pexels-diva-34731924.jpg')"
        bgSize="cover"
        bgPosition="center"
        opacity="0.4"
        zIndex="-1"
      />

      {/* CONTENT */}
      <Box position="relative" zIndex="1" p={6}>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} gap="30px">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card.Root
              key={i}
              w="100%"
              borderRadius="lg"
              alignItems="center"
              mb={5}
              boxShadow="md"
              p={0}
            >
              {/* IMAGE */}
              <Card.Header p={6} w="100%">
                <Skeleton
                  height={{ base: "120px", md: "130px", lg: "170px" }}
                  w="100%"
                  borderRadius="md"
                  mb={4}
                />

                {/* TITLE */}
                <Skeleton height="24px" width="70%" borderRadius="md" />

                {/* DESCRIPTION */}
                <Skeleton height="16px" width="90%" borderRadius="md" mt={2} />
              </Card.Header>

              {/* BODY */}
              <Card.Body w="100%" px={6}>
                {/* LOCATION */}
                <Skeleton height="16px" width="60%" borderRadius="md" mt={2} />

                {/* DATE */}
                <Skeleton height="16px" width="50%" borderRadius="md" mt={2} />

                {/* BADGES */}
                <HStack mt={4} gap={2}>
                  <Skeleton height="20px" width="60px" borderRadius="md" />
                  <Skeleton height="20px" width="80px" borderRadius="md" />
                </HStack>
              </Card.Body>

              {/* FOOTER */}
              <Card.Footer gap={3} px={6} pb={6}>
                <Skeleton height="36px" width="120px" borderRadius="md" />
              </Card.Footer>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}