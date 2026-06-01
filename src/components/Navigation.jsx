import { Flex, Button, Heading, Image } from "@chakra-ui/react";
import SimpleModal from "../components/ui/modal";
import { useState } from "react";
import EventForm from "../components/ui/EventForm";

export const Navigation = ({ categories, addEvent }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Flex gap={8} align="center" p={4}>
        <Heading>
          <Flex align="center"></Flex>
        </Heading>
      </Flex>

      <SimpleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create a new event"
      >
        <EventForm categories={categories} addEvent={addEvent} />
      </SimpleModal>
    </>
  );
};
