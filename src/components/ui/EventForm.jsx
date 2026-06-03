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

    const values = {
      id: initialEvent?.id || crypto.randomUUID(),
      title: formData.get("title"),
      description: formData.get("description"),
      location: formData.get("location"),
      startTime: toISO(start),
      endTime: toISO(end),
      image: imagePreview || initialEvent?.image || "",
      categoryIds: formData.getAll("categoryIds").map(Number),
    };

    onSubmit(values);
  }

  function toISO(value) {
    if (!value) return "";
    return new Date(value).toISOString();
  }

  function toDateTimeLocal(value) {
    if (!value) return "";
    return value.slice(0, 16);
  }

  // ⭐ Mini compressie voor betere performance
  function compressImage(base64, maxWidth = 900, quality = 0.7) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = maxWidth / img.width;
        const width = img.width > maxWidth ? maxWidth : img.width;
        const height = img.width > maxWidth ? img.height * scale : img.height;

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = base64;
    });
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
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onloadend = async () => {
                  const compressed = await compressImage(reader.result);
                  setImagePreview(compressed);
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