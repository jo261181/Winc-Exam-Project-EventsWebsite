import { Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react";

export default function NavigationSkeleton() {
  return (
    <Flex gap={8} align="center" p={4}>
      <SkeletonCircle size="10" />
      <Skeleton height="32px" width="180px" borderRadius="md" />
      <Skeleton height="32px" width="120px" borderRadius="md" />
    </Flex>
  );
}
