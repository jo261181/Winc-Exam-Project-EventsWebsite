import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
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

  return (
    <>
      <Navigation />

      {/* ⬇️ Belangrijk: GEEN skeleton hier */}
      <Outlet context={{ data, setData }} />

      <Toaster />
    </>
  );
};