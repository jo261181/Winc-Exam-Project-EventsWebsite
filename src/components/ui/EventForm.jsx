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
  allCategories = [],
  onSubmit,
  cancel,
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

  // State om per veld een foutmelding bij te houden
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    // Wis de foutmelding zodra de gebruiker begint te typen
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const toggleCategory = (id) => {
    setFormData((prev) => {
      const numericId = Number(id);
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

  // Validatiefunctie die wordt aangeroepen bij het indienen
  const handleValidateAndSubmit = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Event name is required.";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required.";
    }
    if (!formData.startTime) {
      newErrors.startTime = "Start date and time are required.";
    }
    if (!formData.endTime) {
      newErrors.endTime = "End date and time are required.";
    }

    // Extra logische check: eindtijd mag niet voor de starttijd liggen
    if (formData.startTime && formData.endTime) {
      const start = new Date(formData.startTime);
      const end = new Date(formData.endTime);
      if (end <= start) {
        newErrors.endTime = "End time must be after the start time.";
      }
    }

    // Als er fouten zijn gevonden, toon ze en stop het proces
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Geen fouten? Dan pas sturen we het door naar de parent component
    onSubmit({ ...formData, id: initialValues.id });
  };

return (
    <Card.Root maxW="sm" mx="auto" p={0} variant="unstyled" boxShadow="none" position="relative">
      
      {/* HANDMATIGE CANCEL KNOP (Werkt nu perfect in zowel Light als Dark mode) */}
      <Button
        type="button"
        size="sm"
        variant="outline"
        borderColor="gray.500"
        color="fg" // FIX: Schakelt nu automatisch mee met de actieve modus (zwart in light, wit in dark)
        position="absolute"
        top="-48px"  
        right="0px"   
        zIndex="50"   
        _hover={{ bg: "gray.100", _dark: { bg: "gray.700" } }} // Subtiele hover-kleur voor beide modi
        onClick={(e) => {
          e.preventDefault();
          if (typeof cancel === "function") {
            cancel(); 
          }
        }}
      >
        Cancel
      </Button>

      {/* BODY */}
      <Card.Body px={6} pb={4} pt={2}>
        <Stack gap={4} w="full">
          {/* Event Name */}
          <Box>
            <Input
              placeholder="Event name"
              value={formData.title}
              onChange={handleChange("title")}
              borderColor={errors.title ? "red.500" : "gray.200"}
              _focus={{ borderColor: errors.title ? "red.500" : "blue.500" }}
            />
            {errors.title && (
              <Text color="red.500" fontSize="xs" mt={1} fontWeight="medium">
                {errors.title}
              </Text>
            )}
          </Box>

          {/* Categories checkboxes */}
          <Box border="1px solid" borderColor="gray.200" p={3} borderRadius="md" _dark={{ borderColor: "gray.700" }}>
            <Text fontWeight="medium" mb={2} fontSize="sm" color="orange.500">
              Categories
            </Text>
            <Stack gap={2}>
              {allCategories.map((cat) => (
                <HStack key={cat.id} gap={2}>
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
              borderColor={errors.location ? "red.500" : "gray.200"}
              _focus={{ borderColor: errors.location ? "red.500" : "blue.500" }}
            />
            {errors.location && (
              <Text color="red.500" fontSize="xs" mt={1} fontWeight="medium">
                {errors.location}
              </Text>
            )}
          </Box>

          {/* Startdate */}
          <Box>
            <Text fontSize="xs" color="gray.400" mb={1}>Start Date & Time</Text>
            <Input
              type="datetime-local"
              value={formData.startTime}
              onChange={handleChange("startTime")}
              borderColor={errors.startTime ? "red.500" : "gray.200"}
              _focus={{ borderColor: errors.startTime ? "red.500" : "blue.500" }}
            />
            {errors.startTime && (
              <Text color="red.500" fontSize="xs" mt={1} fontWeight="medium">
                {errors.startTime}
              </Text>
            )}
          </Box>

          {/* Enddate */}
          <Box>
            <Text fontSize="xs" color="gray.400" mb={1}>End Date & Time</Text>
            <Input
              type="datetime-local"
              value={formData.endTime}
              onChange={handleChange("endTime")}
              borderColor={errors.endTime ? "red.500" : "gray.200"}
              _focus={{ borderColor: errors.endTime ? "red.500" : "blue.500" }}
            />
            {errors.endTime && (
              <Text color="red.500" fontSize="xs" mt={1} fontWeight="medium">
                {errors.endTime}
              </Text>
            )}
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
            type="button"
            variant="outline"
            bg="red.500"
            color="white"
            _hover={{ bg: "red.600" }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (typeof onDelete === "function") {
                onDelete(initialValues.id);
              }
            }}
          >
            Delete
          </Button>
        )}

        <Button
          colorPalette="blue"
          onClick={handleValidateAndSubmit} // We roepen nu eerst de validatie aan!
        >
          {initialValues.id ? "Save" : "Create"}
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}