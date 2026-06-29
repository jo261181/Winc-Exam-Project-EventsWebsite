import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import Footer from "../components/ui/Footer";
import HeadingExample from "../components/ui/Heading";
import SimpleModal from "../components/ui/modal";
import EventForm from "../components/ui/EventForm";
import HeadingSkeleton from "../components/ui/HeadingSkeleton";
import EventCard from "../components/ui/EventCard"; 
import { EventsPageSkeleton } from "../components/ui/EventsPageSkeleton"; // FIX: Juiste skeleton geïmporteerd
import { toaster } from "../components/ui/toaster";

import { createEvent, updateEvent, deleteEvent } from "../services/events";

export const EventsPage = () => {
  const { data, setData } = useOutletContext();
  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = data?.categories || [];
  const eventsArray = data?.events || [];

  // -----------------------------------------------------
  // LOADING STATE (Nu perfect uitgelijnd met de live pagina)
  // -----------------------------------------------------
  if (!data) {
    return (
      <>
        <HeadingSkeleton
          data={data}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          categories={[]}
          onCreate={() => {}}
          noSticky
        />

        <Box
          position="fixed"
          inset="0"
          bgImage="url('/images/pexels-diva-34731924.jpg')"
          bgSize="cover"
          bgPosition="center"
          opacity="0.4"
          zIndex="-1"
        />

        {/* FIX: Direct de complete pagina-skeleton aanroepen zonder extra wrapper-grid */}
        <EventsPageSkeleton />

        <Footer>
          <Text textAlign="center" py={4} color="black.800">
            &copy; {new Date().getFullYear()} PixelWave. All rights reserved.
          </Text>
        </Footer>
      </>
    );
  }

  // -----------------------------------------------------
  // CRUD HANDLERS
  // -----------------------------------------------------
  async function handleCreate(values) {
    try {
      const newEvent = await createEvent(values);
      setData({
        ...data,
        events: [...data.events, newEvent],
      });
      toaster.create({
        title: "Event created!",
        description: "The new event has been saved successfully.",
        type: "success",
        duration: 3000,
      });
    } catch (error) {
      toaster.create({
        title: "Something went wrong",
        description: "Could not create the event.",
        type: "error",
      });
    }
  }

  async function handleUpdate(values) {
    try {
      const updated = await updateEvent(values.id, values);
      setData({
        ...data,
        events: data.events.map((evt) =>
          evt.id === updated.id ? updated : evt
        ),
      });
      toaster.create({
        title: "Event updated!",
        description: "The changes have been saved successfully.",
        type: "success",
        duration: 3000,
      });
    } catch (error) {
      toaster.create({
        title: "Something went wrong",
        description: "Could not save the changes.",
        type: "error",
      });
    }
  }

  async function handleDelete(id) {
    try {
      await deleteEvent(id);
      setData({
        ...data,
        events: data.events.filter((evt) => evt.id !== id),
      });
      setEditOpen(false);
    } catch (error) {
      toaster.create({
        title: "Something went wrong",
        description: "Could not delete the event.",
        type: "error",
      });
    }
  }

  // -----------------------------------------------------
  // FILTERING
  // -----------------------------------------------------
  const filteredEvents = eventsArray.filter((evt) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      (evt.title || "").toLowerCase().includes(search) ||
      (evt.description || "").toLowerCase().includes(search) ||
      (evt.location || "").toLowerCase().includes(search) ||
      evt.categoryIds?.some((id) => {
        const category = categories.find((c) => c.id === id);
        return (category?.name || "").toLowerCase().includes(search);
      });

    const matchesCategories =
      selectedCategories.length === 0 ||
      evt.categoryIds?.some((id) => selectedCategories.includes(id));

    return matchesSearch && matchesCategories;
  });

  // Helper om de edit modal te triggeren vanuit de kaart component
  const triggerEdit = (evt) => {
    setEditEvent({
      ...evt,
      categoryIds: Array.isArray(evt.categoryIds)
        ? evt.categoryIds
        : [Number(evt.categoryIds)],
    });
    setEditOpen(true);
  };

  // -----------------------------------------------------
  // RENDER
  // -----------------------------------------------------
  return (
    <>
      <HeadingExample
        data={data}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onCreate={() => setCreateOpen(true)}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        categories={categories}
        noSticky
      />

      {/* CREATE MODAL */}
      <SimpleModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create new event"
      >
        <EventForm
          onSubmit={(values) => {
            handleCreate(values);
            setCreateOpen(false);
          }}
          cancel={() => setCreateOpen(false)}
          allCategories={categories}
        />
      </SimpleModal>

      {/* EDIT MODAL */}
      <SimpleModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit event"
      >
        <EventForm
          key={editEvent?.id}
          initialValues={editEvent}
          onSubmit={(values) => {
            handleUpdate(values);
            setEditOpen(false);
          }}
          onDelete={handleDelete}
          cancel={() => setEditOpen(false)}
          allCategories={categories}
        />
      </SimpleModal>

      {/* BACKGROUND */}
      <Box
        position="fixed"
        inset="0"
        bgImage="url('/images/pexels-diva-34731924.jpg')"
        bgSize="cover"
        bgPosition="center"
        opacity="0.4"
        zIndex="-1"
      />

      {/* CONTENT */}
      <Box position="relative" zIndex="1" px={{ base: 4, md: 6 }} pb={6} mt={6}>
        <SimpleGrid 
          columns={[1, 2, 3, 4]} 
          columnGap={6} 
          rowGap={6}
          justifyItems={{ base: "center", md: "stretch" }}
          maxW="1400px" 
          mx="auto"             
        >
          {filteredEvents.map((evt) => (
            <EventCard 
              key={evt.id} 
              event={evt} 
              categories={categories} 
              onEditClick={() => triggerEdit(evt)}
            />
          ))}
        </SimpleGrid>
      </Box>

      <Footer>
        <Text textAlign="center" py={4} color="black.800">
          &copy; {new Date().getFullYear()} PixelWave. All rights reserved.
        </Text>
      </Footer>
    </>
  );
};