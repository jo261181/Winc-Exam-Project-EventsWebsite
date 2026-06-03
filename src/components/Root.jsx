import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { useEffect, useState } from "react";
import { Toaster } from "../components/ui/toaster";

export const Root = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("/events.json").then((res) => res.json()),
      fetch("/categories.json").then((res) => res.json()),
    ]).then(([events, categories]) => {
      setData({ events, categories });
    });
  }, []);

  return (
    <>
      {/* Render Navigation pas als data geladen is */}
      {data && <Navigation categories={data.categories} />}

      <Toaster />

      <Outlet context={{ data, setData }} />
    </>
  );
};