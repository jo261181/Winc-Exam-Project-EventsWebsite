import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { Toaster } from "./ui/toaster"; 

export const Root = () => {
  const [data, setData] = useState(null);

useEffect(() => {
  fetch("http://localhost:3000/events")
    .then((res) => res.json())
    .then((json) => setData({ events: json, categories: [] }));
}, []);

  if (!data) return <p>Loading…</p>;

  return (
    <Box>
      <Toaster />   
      <Navigation />
      <Outlet context={{ data, setData }} />
    </Box>
  );
};