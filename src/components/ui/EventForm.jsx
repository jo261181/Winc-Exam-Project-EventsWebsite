import { useState } from "react";
import {
  Button,
  Card,
  Field,
  Input,
  Stack,
  Text,
  Textarea,
  HStack,
} from "@chakra-ui/react";

export default function EventForm({ initialValues = {}, onSubmit, cancel }) {
  const initialEvent = initialValues;
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
            <Input
              name="location"
              required
              defaultValue={initialEvent?.location}
            />
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
            <HStack gap={3}>
              <Field.Label>Event Image:</Field.Label>
              <Input
                type="file"
                name="image"
                id="file-upload"
                display="none"
                onChange={(e) => setImageFile(e.target.files[0])}
              />

              <Button
                as="label"
                htmlFor="file-upload"
                colorPalette="gray"
                variant="outline"
                size="sm"
              >
                Upload Image
              </Button>
            </HStack>

            {imageFile && (
              <Text mt={2} fontSize="sm" color="gray.600">
                Gekozen: {imageFile.name}
              </Text>
            )}
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
          colorPalette="gray"
          width="inherit"
        >
          {initialEvent ? "Save changes" : "Create Event"}
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
