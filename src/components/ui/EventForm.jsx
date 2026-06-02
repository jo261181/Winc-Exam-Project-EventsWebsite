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
import { useEffect } from "react";

export default function EventForm({
  initialValues = {},
  onSubmit,
  cancel,
  allCategories,
}) {
  const initialEvent = initialValues;

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [start, setStart] = useState(toDateTimeLocal(initialEvent?.startTime));
  const [end, setEnd] = useState(toDateTimeLocal(initialEvent?.endTime));

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const now = new Date().toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM

  useEffect(() => {
    if (initialEvent?.image && !imageFile) {
      setImagePreview(initialEvent.image);
    }
  }, [initialEvent, imageFile]);

  useEffect(() => {
    if (start && end && end < start) {
      setEnd(start); // endTime automatisch gelijk aan startTime
    }
  }, [start]);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    console.log("FORM VALUES:", values);


    // Convert datetime-local → ISO
    values.startTime = toISO(values.startTime);
    values.endTime = toISO(values.endTime);

    if (imageFile) {
      values.image = imageFile;
    } else {
      values.image = initialEvent?.image; // behoud originele afbeelding
    }
    //console.log("FORM VALUES:", values);

    onSubmit(values);
  }
  function toISO(value) {
    return new Date(value).toISOString();
  }

  function toDateTimeLocal(value) {
    if (!value) return "";
    return value.slice(0, 16); // "2023-03-10T18:00"
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

      <input type="hidden" name="id" value={initialEvent?.id} />

      <Card.Body>
        <Stack gap="4" w="full">
          <Field.Root>
            <Field.Label>Event Name</Field.Label>
            <Input name="title" required defaultValue={initialEvent?.title} />
          </Field.Root>

          <Field.Root>
            <Text fontWeight="medium" mb={2}>
              Categories
            </Text>

            <Stack gap="2">
              {allCategories?.map((cat) => (
                <label
                  key={cat.id}
                  style={{ display: "flex", gap: "6px", alignItems: "center" }}
                >
                  <input
                    type="checkbox"
                    name="categoryIds"
                    value={cat.id}
                    defaultChecked={initialEvent?.categoryIds?.includes(cat.id)}
                  />
                  {cat.name}
                </label>
              ))}
            </Stack>
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
              value={start}
              onChange={(e) => setStart(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
            />
          </Field.Root>



          <Field.Root>
            <Field.Label>Enddate and Time</Field.Label>
            <Input
              type="datetime-local"
              name="endTime"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
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
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImageFile(file);
                  if (file) {
                    setImagePreview(URL.createObjectURL(file)); // ← preview tonen
                  }
                }}
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
        <Button
          variant="surface"
          border="1px solid"
          borderColor="gray.300"
          onClick={cancel}
        >
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
