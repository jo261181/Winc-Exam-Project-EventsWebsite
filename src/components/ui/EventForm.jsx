<<<<<<< HEAD
import {
  Button,
  Card,
  Field,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";

export default function EventForm({ cancel, initialEvent, onSubmit }) {

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    onSubmit(values);
  }

  return (
    <Card.Root maxW="sm" as="form" onSubmit={handleSubmit}>
      <Card.Header>
        <Card.Title>
          {initialEvent ? "Edit Event" : "Create Event"}
        </Card.Title>
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
            <Input
              name="title"
              required
              defaultValue={initialEvent?.title}
            />
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

        </Stack>
      </Card.Body>

      <Card.Footer justifyContent="flex-end" gap={3}>
        <Button variant="ghost" onClick={cancel}>
          Cancel
        </Button>

        <Button variant="solid" type="submit" colorScheme="blue" width="inherit">
          {initialEvent ? "Save changes" : "Create Event"}
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}

=======
import {
  Button,
  Card,
  Field,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";

export default function EventForm({ cancel, initialEvent, onSubmit }) {

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    onSubmit(values);
  }

  return (
    <Card.Root maxW="sm" as="form" onSubmit={handleSubmit}>
      <Card.Header>
        <Card.Title>
          {initialEvent ? "Edit Event" : "Create Event"}
        </Card.Title>
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
            <Input
              name="title"
              required
              defaultValue={initialEvent?.title}
            />
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

        </Stack>
      </Card.Body>

      <Card.Footer justifyContent="flex-end" gap={3}>
        <Button variant="ghost" onClick={cancel}>
          Cancel
        </Button>

        <Button variant="solid" type="submit" colorScheme="blue" width="inherit">
          {initialEvent ? "Save changes" : "Create Event"}
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}

>>>>>>> 3637cb57b823052f655bcd3b3789c641b297ff48
