import { Dialog, Portal, Button } from "@chakra-ui/react";

export default function SimpleModal({ open, onClose, title, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.600" backdropFilter="blur(6px)" />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>{children}</Dialog.Body>

            <Dialog.Footer>
              <Button onClick={onClose}  rounded="full" variant="surface" border="1px solid" borderColor="gray.300">
                Close
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}