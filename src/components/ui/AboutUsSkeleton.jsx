import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";
import { useColorMode } from "../ui/color-mode";

export default function AboutUsSkeleton() {
  const { colorMode } = useColorMode();

  return (
    <>
      {/* Background */}
      <Box
        position="fixed"
        inset="0"
        bgImage="url('/images/pexels-diva-34731924.jpg')"
        bgSize="cover"
        bgPosition="center"
        opacity="0.55"
        zIndex="-1"
      />

      {/* HeadingExample skeleton */}
      <Box
        maxW="900px"
        mx="auto"
        mt={6}
        px={4}
        display="flex"
        justifyContent="flex-end"
      >
        {/* Back to events button */}
        <Skeleton height="32px" width="120px" borderRadius="md" />
      </Box>

      {/* Main content box */}
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
        {/* Title */}
        <Skeleton height="40px" width="220px" mx="auto" mb={6} />

        {/* Paragraph 1 */}
        <SkeletonText mt="4" noOfLines={5} spacing="4" mx={5} />

        {/* Paragraph 2 */}
        <SkeletonText mt="6" noOfLines={5} spacing="4" mx={5} />

        {/* Paragraph 3 */}
        <SkeletonText mt="6" noOfLines={5} spacing="4" mx={5} />

        {/* Paragraph 4 */}
        <SkeletonText mt="6" noOfLines={5} spacing="4" mx={5} />

        {/* Paragraph 5 */}
        <SkeletonText mt="6" noOfLines={5} spacing="4" mx={5} />
      </Box>
    </>
  );
}
