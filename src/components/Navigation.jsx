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

        <Button
          variant="surface"
          border="1px solid"
          borderColor="gray.300"
          onClick={() => setModalOpen(true)}
        >
          Create Event
        </Button>
      </Flex>

      {/* Render EventForm alleen als modal open is */}
      {modalOpen && (
        <SimpleModal
          open={true}
          onClose={() => setModalOpen(false)}
          title="Create a new event"
        >
          <EventForm
            allCategories={categories}
            onSubmit={(values) => {
              addEvent(values);
              setModalOpen(false);
            }}
            cancel={() => setModalOpen(false)}
          />
        </SimpleModal>
      )}
    </>
  );
};