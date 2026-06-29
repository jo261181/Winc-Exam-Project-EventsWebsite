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
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export default function EventForm({
  initialValues = {},
  allCategories = [], // FIX 1: Aangepast van categories naar allCategories om te matchen met de paginas
  onSubmit,
  onCancel,
  onDelete,
}) {
  function toLocalInputValue(dateString) {
    if (!dateString) return "";
    const d = new Date(dateString);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const [formData, setFormData] = useState({
    title: initialValues.title || "",
    description: initialValues.description || "",
    location: initialValues.location || "",
    startTime: toLocalInputValue(initialValues.startTime),
    endTime: toLocalInputValue(initialValues.endTime),
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
    setFormData((prev) => {
      const numericId = Number(id); // Zorg dat de IDs altijd als numbers worden opgeslagen
      const exists = prev.categoryIds.includes(numericId);
      return {
        ...prev,
        categoryIds: exists
          ? prev.categoryIds.filter((c) => c !== numericId)
          : [...prev.categoryIds, numericId],
      };
    });
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
      <Card.Header p={6} fontWeight="bold" fontSize="lg">
        {initialValues.id ? "Edit Event" : "Create Event"}
      </Card.Header>

      {/* BODY */}
      <Card.Body px={6} pb={4}>
        <Stack gap={4} w="full">
          {/* Event Name */}
          <Box>
            <Input
              placeholder="Event name"
              value={formData.title}
              onChange={handleChange("title")}
            />
          </Box>

          {/* Categories checkboxes (Nu gekoppeld via allCategories) */}
          <Box border="1px solid" borderColor="gray.200" p={3} borderRadius="md" _dark={{ borderColor: "gray.700" }}>
            <Text fontWeight="medium" mb={2} fontSize="sm" color="orange.500">
              Categories
            </Text>
            <Stack gap={2}>
              {allCategories.map((cat) => (
                <HStack key={cat.id} gap={2}>
                  {/* FIX 2: Chakra v3 gebruikt 'checked' en 'onCheckedChange' in plaats van 'isChecked' */}
                  <Checkbox.Root
                    checked={formData.categoryIds.includes(cat.id)}
                    onCheckedChange={() => toggleCategory(cat.id)}
                    colorPalette="orange"
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label fontSize="sm">{cat.name}</Checkbox.Label>
                  </Checkbox.Root>
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
              value={formData.startTime}
              onChange={handleChange("startTime")}
            />
          </Box>

          {/* Enddate */}
          <Box>
            <Input
              type="datetime-local"
              value={formData.endTime}
              onChange={handleChange("endTime")}
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
            variant="outline"
            onClick={onDelete}
            bg="red.500"
            color="white"
            _hover={{ bg: "red.600" }}
          >
            Delete
          </Button>
        )}

        <Button
          colorPalette="blue"
          onClick={() => onSubmit({ ...formData, id: initialValues.id })}
        >
          {initialValues.id ? "Save" : "Create"}
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}