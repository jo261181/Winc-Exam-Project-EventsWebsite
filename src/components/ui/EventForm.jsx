import {
  Card,
  Stack,
  HStack,
  Box,
  Input,
  Textarea,
  Checkbox,
  Button,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";

export default function EventForm({
  initialValues = {},
  categories = [],
  onSubmit,
  onCancel,
  onDelete,
}) {
const [formData, setFormData] = useState({
  name: initialValues.title || "",
  description: initialValues.description || "",
  location: initialValues.location || "",
  startdate: initialValues.startTime || "",
  enddate: initialValues.endTime || "",
  image: initialValues.image || "",
  categoryIds: initialValues.categoryIds || [],
});


  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const toggleCategory = (id) => {
    setFormData((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(id)
        ? prev.categoryIds.filter((c) => c !== id)
        : [...prev.categoryIds, id],
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card.Root maxW="sm" mx="auto" p={0}>
      {/* HEADER */}
      <Card.Header p={6}>
        {initialValues.id ? "Edit Event" : "Create Event"}
      </Card.Header>

      {/* BODY */}
      <Card.Body px={6} pb={4}>
        <Stack gap={4} w="full">
          {/* Event Name */}
          <Box>
            <Input
              placeholder="Event name"
              value={formData.name}
              onChange={handleChange("name")}
            />
          </Box>

          {/* Categories */}
          <Box>
            <Stack gap={2}>
              {categories.map((cat) => (
                <HStack key={cat.id} gap={2}>
                  <Checkbox
                    isChecked={formData.categoryIds.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                  />
                  <Box>{cat.name}</Box>
                </HStack>
              ))}
            </Stack>
          </Box>

          {/* Description */}
          <Box>
            <Textarea
              placeholder="Description"
              value={formData.description}
              onChange={handleChange("description")}
            />
          </Box>

          {/* Location */}
          <Box>
            <Input
              placeholder="Location"
              value={formData.location}
              onChange={handleChange("location")}
            />
          </Box>

          {/* Startdate */}
          <Box>
            <Input
              type="datetime-local"
              value={formData.startdate}
              onChange={handleChange("startdate")}
            />
          </Box>

          {/* Enddate */}
          <Box>
            <Input
              type="datetime-local"
              value={formData.enddate}
              onChange={handleChange("enddate")}
            />
          </Box>

          {/* Image preview + upload */}
          <Box>
            {formData.image && (
              <Image
                src={formData.image}
                alt="Preview"
                borderRadius="md"
                mb={3}
                height="180px"
                width="100%"
                objectFit="cover"
              />
            )}

            <Input type="file" accept="image/*" onChange={handleImageUpload} />
          </Box>
        </Stack>
      </Card.Body>

      {/* FOOTER */}
      <Card.Footer justifyContent="center" gap={6} pt={4} pb={6}>
        {initialValues.id && (
          <Button
            colorScheme="red"
            variant="outline"
            onClick={onDelete}
            bg="red.500"
            color="white"
          >
            Delete
          </Button>
        )}

        <Button
          colorScheme="blue"
          onClick={() => onSubmit({ ...formData, id: initialValues.id })}
        >
          {initialValues.id ? "Save" : "Create"}
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
