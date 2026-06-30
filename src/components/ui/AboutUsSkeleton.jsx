import { Box, Stack, SimpleGrid, Skeleton } from "@chakra-ui/react";
import HeadingSkeleton from "../components/ui/HeadingSkeleton";
import Footer from "../components/ui/Footer";
import { useColorMode } from "../components/ui/color-mode";

export const AboutUsSkeleton = () => {
  const { colorMode } = useColorMode();

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

      <HeadingSkeleton
        rightContent={
          <Skeleton height="36px" width="120px" borderRadius="md" />
        }
      />

      <Box
        maxW="900px"
        mx="auto"
        mt={{ base: 6, md: 12 }}
        mb={{ base: 6, md: 12 }}
        p={{ base: 6, md: 10 }}
        bg={colorMode === "dark" ? "blackAlpha.800" : "whiteAlpha.900"}
        backdropFilter="blur(10px)"
        borderRadius="xl"
        boxShadow="2xl"
        border="1px solid"
        borderColor={colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.100"}
      >
        <Stack gap={6}>
          <Skeleton 
            height="40px" 
            width="200px" 
            mx="auto" 
            borderRadius="md" 
          />

          <Stack gap={2} maxW="750px" mx="auto" w="100%" mb={4}>
            <Skeleton height="18px" width="100%" borderRadius="sm" />
            <Skeleton height="18px" width="95%" borderRadius="sm" mx="auto" />
            <Skeleton height="18px" width="60%" borderRadius="sm" mx="auto" />
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} mt={2}>
            <Box>
              <Skeleton height="24px" width="150px" mb={3} borderRadius="sm" />
              <Stack gap={2}>
                <Skeleton height="16px" width="100%" borderRadius="sm" />
                <Skeleton height="16px" width="95%" borderRadius="sm" />
                <Skeleton height="16px" width="80%" borderRadius="sm" />
              </Stack>
            </Box>

            <Box>
              <Skeleton height="24px" width="130px" mb={3} borderRadius="sm" />
              <Stack gap={2}>
                <Skeleton height="16px" width="100%" borderRadius="sm" />
                <Skeleton height="16px" width="95%" borderRadius="sm" />
                <Skeleton height="16px" width="75%" borderRadius="sm" />
              </Stack>
            </Box>
          </SimpleGrid>

          <Box 
            p={5} 
            borderRadius="lg" 
            bg={colorMode === "dark" ? "whiteAlpha.50" : "blackAlpha.50"}
            mt={4}
          >
            <Skeleton height="20px" width="240px" mx="auto" mb={3} borderRadius="sm" />
            <Stack gap={2}>
              <Skeleton height="16px" width="90%" mx="auto" borderRadius="sm" />
              <Skeleton height="16px" width="75%" mx="auto" borderRadius="sm" />
            </Stack>
          </Box>
        </Stack>
      </Box>

      <Footer />
    </>
  );
};