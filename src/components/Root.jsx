import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Toaster, toaster } from "../components/ui/toaster";

export const Root = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/events").then((res) => res.json()),
      fetch("http://localhost:3000/categories").then((res) => res.json())
    ]).then(([events, categories]) => {
      setData({ events, categories });
    });
  }, []);

  if (!data) return <p>Loading…</p>;

  return (
    <Box>
      
      <Navigation />
      <Toaster />
      <Outlet context={{ data, setData }} />
    </Box>
  );
};
