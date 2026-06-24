import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";
import { useColorMode } from "../ui/color-mode";

export default function AboutUsSkeleton() {
  const { colorMode } = useColorMode();

  return (
    <>
      <Box
        position="fixed"
        inset="0"
        bgImage="url('/images/pexels-diva-34731924.jpg')"
        bgSize="cover"
        bgPosition="center"
        opacity="0.55"
        zIndex="-1"
      />

      <Box
        maxW="900px"
        mx="auto"
        mt={6}
        px={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Skeleton height="40px" width="200px" borderRadius="md" />
        <Skeleton height="32px" width="120px" borderRadius="md" />
      </Box>

      <Box
        maxW="900px"
        mx="auto"
        mt={8}
        p={6}
        px={2}
        bg={colorMode === "dark" ? "black" : "whiteAlpha.800"}
        borderRadius="md"
        boxShadow="md"
      >
        <Skeleton height="36px" width="200px" mx="auto" mb={6} />

        <SkeletonText mt="4" noOfLines={4} spacing="4" mx={5} />
        <SkeletonText mt="6" noOfLines={4} spacing="4" mx={5} />
        <SkeletonText mt="6" noOfLines={4} spacing="4" mx={5} />
        <SkeletonText mt="6" noOfLines={4} spacing="4" mx={5} />
      </Box>
    </>
  );
}
