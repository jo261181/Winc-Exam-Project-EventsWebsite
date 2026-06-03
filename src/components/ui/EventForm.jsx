import { useState, useEffect } from "react";
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

export default function EventForm({
  initialValues = {},
  onSubmit,
  cancel,
  onDelete = () => {},
  allCategories = [],
}) {
  const initialEvent = initialValues;

  // -----------------------------
  // STATE
  // -----------------------------
  const [imagePreview, setImagePreview] = useState(
    initialEvent?.image || ""
  );
  const [imageFile, setImageFile] = useState(null);

  const [start, setStart] = useState(
    toDateTimeLocal(initialEvent?.startTime)
  );
  const [end, setEnd] = useState(
    toDateTimeLocal(initialEvent?.endTime)
  );

  const [timeError, setTimeError] = useState("");

  // -----------------------------
  // VALIDATE DATES
  // -----------------------------
  useEffect(() => {
    if (start && end && end < start) {
      setTimeError("End date cannot be earlier than start date");
    } else {
      setTimeError("");
    }
  }, [start, end]);

  // -----------------------------
  // CLEANUP BLOB URLS
  // -----------------------------
  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // -----------------------------
  // SUBMIT
  // -----------------------------
  function handleSubmit(e) {
    e.preventDefault();
    if (timeError) return;

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    // Categories
    values.categoryIds = formData.getAll("categoryIds").map(Number);

    // Convert datetime-local → ISO
    values.startTime = toISO(values.startTime);
    values.endTime = toISO(values.endTime);

    // Image
    if (imageFile) {
      values.image = imagePreview;
    } else {
      values.image = initialEvent?.image || "";
    }

    onSubmit(values);
  }

  // -----------------------------
  // HELPERS
  // -----------------------------
  function toISO(value) {
    return new Date(value).toISOString();
  }

  function toDateTimeLocal(value) {
    if (!value) return "";
    return value.slice(0, 16);
  }

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <Card.Root maxW="sm" as="form" onSubmit={handleSubmit}>
      <Card.Header>
        <Card.Description>
          {initialEvent?.id
            ? "Update the event details below"
            : "Fill in the form below to create an event"}
        </Card.Description>
      </Card.Header>

      <Card.Body>
        <Stack gap="4" w="full">
          {/* ID (hidden) */}
          <input
            type="hidden"
            name="id"
            value={initialEvent?.id || ""}
          />

          {/* TITLE */}
          <Field.Root>
            <Field.Label>Event Name</Field.Label>
            <Input
              name="title"
              required
              defaultValue={initialEvent?.title}
            />
          </Field.Root>

          {/* DESCRIPTION */}
          <Field.Root>
            <Field.Label>Description</Field.Label>
            <Textarea
              name="description"
              required
              defaultValue={initialEvent?.description}
            />
          </Field.Root>

          {/* LOCATION */}
          <Field.Root>
            <Field.Label>Location</Field.Label>
            <Input
              name="location"
              required
              defaultValue={initialEvent?.location}
            />
          </Field.Root>

          {/* CATEGORIES */}
          <Field.Root>
            <Text fontWeight="medium" mb={2}>
              Categories
            </Text>
          </Field.Root>

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

          {/* START TIME */}
          <Field.Root>
            <Field.Label>Startdate and Time</Field.Label>
            <Input
              type="datetime-local"
              name="startTime"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </Field.Root>

          {/* END TIME */}
          <Field.Root>
            <Field.Label>Enddate and Time</Field.Label>
            <Input
              type="datetime-local"
              name="endTime"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </Field.Root>

          {/* TIME ERROR */}
          {timeError && (
            <Text color="red.500" fontSize="sm">
              {timeError}
            </Text>
          )}

          {/* IMAGE PREVIEW */}
          <Field.Root>
            <Field.Label>Event Image</Field.Label>

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Event Preview"
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  borderRadius: "8px",
                  marginTop: "10px",
                }}
              />
            )}

            {/* NEW IMAGE */}
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImageFile(file);
                  const previewUrl = URL.createObjectURL(file);
                  setImagePreview(previewUrl);
                }
              }}
            />
          </Field.Root>
        </Stack>
      </Card.Body>

      <Card.Footer gap={3}>
        {/* DELETE BUTTON */}
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

        {/* CANCEL */}
        <Button
          variant="surface"
          outline="1px solid"
          outlineColor="gray.300"
          onClick={cancel}
        >
          Cancel
        </Button>

        {/* SUBMIT */}
        <Button
          variant="surface"
          outline="1px solid"
          outlineColor="gray.300"
          type="submit"
        >
          {initialEvent?.id ? "Save changes" : "Create Event"}
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
