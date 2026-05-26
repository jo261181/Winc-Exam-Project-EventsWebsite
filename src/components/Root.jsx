import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Spinner, Text, VStack, Box, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Toaster } from "../components/ui/toaster";

export const Root = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/events").then((res) => res.json()),
      fetch("http://localhost:3000/categories").then((res) => res.json()),
    ]).then(([events, categories]) => {
      setData({ events, categories });
    });
  }, []);

  if (!data) {
    return (
      <Center h="100vh">
        <VStack colorPalette="teal" spacing={3}>
          <Spinner color="colorPalette.600" size="xl" />
          <Text color="colorPalette.600">Loading...</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Box>
      <Navigation />
      <Toaster />
      <Outlet context={{ data, setData }} />
    </Box>
  );
};