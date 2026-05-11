import { useState } from "react";
import { Button, Card, Field, Input, Stack, Textarea } from "@chakra-ui/react";

export default function EventForm({ cancel, initialEvent, onSubmit }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    if (imageFile) {
      values.image = imageFile;
    }

    onSubmit(values);
  }

  return (
    <Card.Root maxW="sm" as="form" onSubmit={handleSubmit}>
      <Card.Header>
        
        <Card.Description>
          {initialEvent
            ? "Update the event details below"
            : "Fill in the form below to create an event"}
        </Card.Description>
      </Card.Header>

      <Card.Body>
        <Stack gap="4" w="full">
          <Field.Root>
            <Field.Label>Event Name</Field.Label>
            <Input name="title" required defaultValue={initialEvent?.title} />
          </Field.Root>

          <Field.Root>
            <Field.Label>Event Description</Field.Label>
            <Textarea
              name="description"
              required
              defaultValue={initialEvent?.description}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Location</Field.Label>
            <Input name="location" required defaultValue={initialEvent?.location} />
          </Field.Root>

          <Field.Root>
            <Field.Label>Startdate and Time</Field.Label>
            <Input
              type="datetime-local"
              name="startTime"
              required
              defaultValue={initialEvent?.startTime}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Enddate and Time</Field.Label>
            <Input
              type="datetime-local"
              name="endTime"
              required
              defaultValue={initialEvent?.endTime}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Event Image</Field.Label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImageFile(file);
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
            />
          </Field.Root>

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Event Preview"
              style={{
                maxWidth: "100%",
                borderRadius: "8px",
                marginTop: "10px",
              }}
            />
          )}
        </Stack>
      </Card.Body>

      <Card.Footer justifyContent="flex-end" gap={4} pt={4} mt={2}>
        <Button variant="outline" onClick={cancel}>
          Cancel
        </Button>

        <Button
          variant="solid"
          type="submit"
          colorScheme="blue"
          width="inherit"
           
        >
          {initialEvent ? "Save changes" : "Create Event"}
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
