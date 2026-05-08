<<<<<<< HEAD
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
              <Button onClick={onClose} variant="outline">
                Close
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
=======
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
              <Button onClick={onClose} variant="outline">
                Close
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
>>>>>>> 3637cb57b823052f655bcd3b3789c641b297ff48
}