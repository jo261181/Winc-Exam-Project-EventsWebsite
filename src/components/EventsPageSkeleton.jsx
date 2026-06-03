import {
  Box,
  Skeleton,
  Stack,
  SimpleGrid,
  HStack
} from "@chakra-ui/react";
import HeadingExample from "./ui/Heading";

export default function EventsPageSkeleton() {
  return (
    <>
      <Box
        position="fixed"
        inset="0"
        bgImage="url('/images/pexels-diva-34731924.jpg')"
        bgSize="cover"
        bgPosition="center"
        opacity="0.4"
        zIndex="-1"
      />

      <Box position="relative" zIndex="1" p={6}>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} gap="30px">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Box
              key={i}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              shadow="md"
              w="100%"
              bg="whiteAlpha.800"
            >
              <Skeleton
                height={{ base: "120px", md: "130px", lg: "170px" }}
                w="100%"
                borderRadius="md"
                mb={4}
              />

              <Stack spacing={3}>
                <Skeleton height="20px" width="70%" />
                <Skeleton height="16px" width="90%" />
                <Skeleton height="16px" width="60%" />
                <Skeleton height="16px" width="50%" />

                <HStack spacing={2} mt={2}>
                  <Skeleton height="20px" width="60px" borderRadius="md" />
                  <Skeleton height="20px" width="80px" borderRadius="md" />
                </HStack>

                <Skeleton height="36px" width="120px" borderRadius="md" mt={2} />
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}