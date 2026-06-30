import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { useEffect, useState } from "react";
import { Toaster } from "../components/ui/toaster";

export const Root = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [eventsRes, categoriesRes] = await Promise.all([
          fetch("http://localhost:3000/events"),
          fetch("http://localhost:3000/categories"),
        ]);

        if (eventsRes.ok && categoriesRes.ok) {
          const events = await eventsRes.json();
          const categories = await categoriesRes.json();
          setData({ events, categories });
          return;
        }
      } catch (error) {
      }

      const fallback = await fetch("/Events.json").then((res) => res.json());
      setData({
        events: fallback.events,
        categories: fallback.categories,
      });
    }

    loadData();
  }, []);

  return (
    <>
      <Navigation />
      <Toaster />
      <Outlet context={{ data, setData }} />
    </>
  );
};