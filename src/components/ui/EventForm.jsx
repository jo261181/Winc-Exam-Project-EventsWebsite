<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import { useState } from "react";
>>>>>>> dc6d5f5818e7193db03cf0e40a3a3b151a2dc2d9
import {
  Button,
  Card,
  Field,
  Input,
  Stack,
  Text,
  Textarea,
<<<<<<< HEAD
} from "@chakra-ui/react";

export default function EventForm({
  initialValues = {},
  onSubmit,
  cancel,
  onDelete = () => {},
  allCategories,
}) {
  const initialEvent = initialValues;

  const [imagePreview, setImagePreview] = useState(
    initialEvent?.image || ""
  );

  const [start, setStart] = useState(
    toDateTimeLocal(initialEvent?.startTime)
  );

  const [end, setEnd] = useState(
    toDateTimeLocal(initialEvent?.endTime)
  );

  const [timeError, setTimeError] = useState("");

  // -----------------------------------
  // Validate dates
  // -----------------------------------
  useEffect(() => {
    if (start && end && end < start) {
      setTimeError("End date cannot be earlier than start date");
    } else {
      setTimeError("");
    }
  }, [start, end]);

  // -----------------------------------
  // Cleanup blob URLs
  // -----------------------------------
  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // -----------------------------------
  // Submit
  // -----------------------------------
  function handleSubmit(e) {
    e.preventDefault();

    if (timeError) return;

    const formData = new FormData(e.target);

    const values = Object.fromEntries(formData.entries());

    // Alle categorieën ophalen
    values.categoryIds = formData
      .getAll("categoryIds")
      .map(Number);

    values.startTime = toISO(values.startTime);
    values.endTime = toISO(values.endTime);

    // Afbeelding bewaren
    values.image = imagePreview || initialEvent?.image || "";
=======
  HStack,
} from "@chakra-ui/react";

export default function EventForm({ initialValues = {}, onSubmit, cancel, allCategories }) {

  const initialEvent = initialValues;
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    // Convert datetime-local → ISO
    values.startTime = toISO(values.startTime);
    values.endTime = toISO(values.endTime);

    if (imageFile) {
      values.image = imageFile;
    }
>>>>>>> dc6d5f5818e7193db03cf0e40a3a3b151a2dc2d9

    onSubmit(values);
  }

<<<<<<< HEAD
  // -----------------------------------
  // Helpers
  // -----------------------------------
=======
>>>>>>> dc6d5f5818e7193db03cf0e40a3a3b151a2dc2d9
  function toISO(value) {
    return new Date(value).toISOString();
  }

  function toDateTimeLocal(value) {
    if (!value) return "";
<<<<<<< HEAD
    return value.slice(0, 16);
  }

  // -----------------------------------
  // Render
  // -----------------------------------
=======
    return value.slice(0, 16); // "2023-03-10T18:00"
  }

>>>>>>> dc6d5f5818e7193db03cf0e40a3a3b151a2dc2d9
  return (
    <Card.Root maxW="sm" as="form" onSubmit={handleSubmit}>
      <Card.Header>
        <Card.Description>
<<<<<<< HEAD
          {initialEvent?.id
=======
          {initialEvent
>>>>>>> dc6d5f5818e7193db03cf0e40a3a3b151a2dc2d9
            ? "Update the event details below"
            : "Fill in the form below to create an event"}
        </Card.Description>
      </Card.Header>

<<<<<<< HEAD
      <input
        type="hidden"
        name="id"
        value={initialEvent?.id || ""}
      />

      <Card.Body>
        <Stack gap="4" w="full">

          {/* TITLE */}
          <Field.Root>
            <Field.Label>Event Name</Field.Label>

            <Input
              name="title"
              required
              defaultValue={initialEvent?.title}
            />
          </Field.Root>

          {/* CATEGORIES */}
=======
      <input type="hidden" name="id" value={initialEvent?.id} />

      <Card.Body>
        <Stack gap="4" w="full">
          <Field.Root>
            <Field.Label>Event Name</Field.Label>
            <Input name="title" required defaultValue={initialEvent?.title} />
          </Field.Root>

>>>>>>> dc6d5f5818e7193db03cf0e40a3a3b151a2dc2d9
          <Field.Root>
            <Text fontWeight="medium" mb={2}>
              Categories
            </Text>

            <Stack gap="2">
<<<<<<< HEAD
              {allCategories.map((cat) => (
                <label
                  key={cat.id}
                  style={{
                    display: "flex",
                    gap: "6px",
                    alignItems: "center",
                  }}
=======
              {allCategories?.map((cat) => (
                <label
                  key={cat.id}
                  style={{ display: "flex", gap: "6px", alignItems: "center" }}
>>>>>>> dc6d5f5818e7193db03cf0e40a3a3b151a2dc2d9
                >
                  <input
                    type="checkbox"
                    name="categoryIds"
                    value={cat.id}
<<<<<<< HEAD
                    defaultChecked={initialEvent?.categoryIds?.includes(
                      cat.id
                    )}
                  />

=======
                    defaultChecked={initialEvent?.categoryIds?.includes(cat.id)}
                  />
>>>>>>> dc6d5f5818e7193db03cf0e40a3a3b151a2dc2d9
                  {cat.name}
                </label>
              ))}
            </Stack>
          </Field.Root>

<<<<<<< HEAD
          {/* DESCRIPTION */}
          <Field.Root>
            <Field.Label>Event Description</Field.Label>

=======
          <Field.Root>
            <Field.Label>Event Description</Field.Label>
>>>>>>> dc6d5f5818e7193db03cf0e40a3a3b151a2dc2d9
            <Textarea
              name="description"
              required
              defaultValue={initialEvent?.description}
            />
          </Field.Root>

<<<<<<< HEAD
          {/* LOCATION */}
          <Field.Root>
            <Field.Label>Location</Field.Label>

=======
          <Field.Root>
            <Field.Label>Location</Field.Label>
>>>>>>> dc6d5f5818e7193db03cf0e40a3a3b151a2dc2d9
            <Input
              name="location"
              required
              defaultValue={initialEvent?.location}
            />
          </Field.Root>

<<<<<<< HEAD
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

          {/* EVENT IMAGE */}
          <Field.Root>
            <Field.Label>Event Image</Field.Label>

            {/* Bestaande of nieuwe afbeelding tonen */}
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

            {/* Nieuwe afbeelding kiezen */}
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  const previewUrl =
                    URL.createObjectURL(file);

                  setImagePreview(previewUrl);
                }
              }}
            />
          </Field.Root>

        </Stack>
      </Card.Body>

      <Card.Footer
        justifyContent="center"
        gap={6}
        pt={4}
        mt={2}
      >
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

        {/* SUBMIT BUTTON */}
        <Button
          variant="surface"
          outline="1px solid"
          outlineColor="gray.300"
=======
          <Field.Root>
            <Field.Label>Startdate and Time</Field.Label>
            <Input
              type="datetime-local"
              name="startTime"
              defaultValue={toDateTimeLocal(initialEvent?.startTime)}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Enddate and Time</Field.Label>
            <Input
              type="datetime-local"
              name="endTime"
              defaultValue={toDateTimeLocal(initialEvent?.endTime)}
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
>>>>>>> dc6d5f5818e7193db03cf0e40a3a3b151a2dc2d9
          type="submit"
          colorPalette="gray"
          width="inherit"
        >
<<<<<<< HEAD
          {initialEvent?.id
            ? "Save changes"
            : "Create Event"}
=======
          {initialEvent ? "Save changes" : "Create Event"}
>>>>>>> dc6d5f5818e7193db03cf0e40a3a3b151a2dc2d9
        </Button>
      </Card.Footer>
    </Card.Root>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> dc6d5f5818e7193db03cf0e40a3a3b151a2dc2d9
