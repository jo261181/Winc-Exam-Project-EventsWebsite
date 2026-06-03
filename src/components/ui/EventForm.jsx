import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Field,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";

export default function EventForm({
  initialValues = {},
  onSubmit,
  cancel,
  onDelete = () => {},
  allCategories,
}) {
  const initialEvent = initialValues;

  const [imagePreview, setImagePreview] = useState(initialEvent?.image || "");

  const [start, setStart] = useState(toDateTimeLocal(initialEvent?.startTime));

  const [end, setEnd] = useState(toDateTimeLocal(initialEvent?.endTime));

  const [timeError, setTimeError] = useState("");

  useEffect(() => {
    if (start && end && end < start) {
      setTimeError("End date cannot be earlier than start date");
    } else {
      setTimeError("");
    }
  }, [start, end]);

  function handleSubmit(e) {
    e.preventDefault();
    if (timeError) return;

    const formData = new FormData(e.target);
  const values = Object.fromEntries(formData.entries());
values.categoryIds = formData.getAll("categoryIds").map(Number);


    values.categoryIds = formData.getAll("categoryIds").map(Number);

    values.startTime = toISO(values.startTime);
    values.endTime = toISO(values.endTime);

    values.image = imagePreview || initialEvent?.image || "";

    onSubmit(values);
  }

  function toISO(value) {
    return new Date(value).toISOString();
  }

  function toDateTimeLocal(value) {
    if (!value) return "";
    return value.slice(0, 16);
  }

  return (
    <Card.Root maxW="sm" as="form" onSubmit={handleSubmit}>
      <Card.Header>
        <Card.Description>
          {initialEvent?.id
            ? "Update the event details below"
            : "Fill in the form below to create an event"}
        </Card.Description>
      </Card.Header>

      <input type="hidden" name="id" value={initialEvent?.id || ""} />

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
              {allCategories.map((cat) => (
                <label
                  key={cat.id}
                  style={{
                    display: "flex",
                    gap: "6px",
                    alignItems: "center",
                  }}
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
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Enddate and Time</Field.Label>
            <Input
              type="datetime-local"
              name="endTime"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </Field.Root>

          {timeError && (
            <Text color="red.500" fontSize="sm">
              {timeError}
            </Text>
          )}

          <Field.Root>
            <Field.Label>Event Image</Field.Label>

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Event Preview"
                style={{
                  width: "100%",
                  maxHeight: "220px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "12px",
                }}
              />
            )}

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onloadend = () => {
                  setImagePreview(reader.result); 
                };
                reader.readAsDataURL(file);
              }}
            />
          </Field.Root>
        </Stack>
      </Card.Body>

      <Card.Footer justifyContent="center" gap={6} pt={4} mt={2}>
        {initialEvent?.id && (
          <Button
            variant="surface"
            outline="1px solid"
            outlineColor="gray.300"
            colorPalette="red"
            width="inherit"
            type="button"
            onClick={() => onDelete(initialEvent.id)}
          >
            Delete
          </Button>
        )}

        <Button
          variant="surface"
          outline="1px solid"
          outlineColor="gray.300"
          type="submit"
          colorPalette="gray"
          width="inherit"
        >
          {initialEvent?.id ? "Save changes" : "Create Event"}
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}