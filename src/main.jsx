import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "./components/ui/provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Root } from "./components/Root";
import EventPage from "./pages/EventPage";
import EventsPage from "./pages/EventsPage.jsx";
import { AboutUs } from "./pages/AboutUs";

// ⭐ voeg deze import toe
import { ColorModeProvider } from "./components/ui/color-mode";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <EventsPage /> },
      { path: "events", element: <EventsPage /> },
      { path: "events/:id", element: <EventPage /> },
      { path: "about-us", element: <AboutUs /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    {/* ⭐ jouw dark-mode provider MOET hier */}
    <ColorModeProvider>

      {/* Chakra UI provider */}
      <Provider>
        <RouterProvider router={router} />
      </Provider>

    </ColorModeProvider>

  </React.StrictMode>
);