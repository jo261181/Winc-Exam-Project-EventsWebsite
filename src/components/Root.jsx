import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { useEffect, useState } from "react";
import { Toaster } from "../components/ui/toaster";

export const Root = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/Events.json")
      .then((res) => res.json())
      .then((json) => {
        setData({
          events: json.events,
          categories: json.categories
        });
      });
  }, []);

  return (
    <>
      {data && <Navigation categories={data.categories} />}
      <Toaster />
      <Outlet context={{ data, setData }} />
    </>
  );
};