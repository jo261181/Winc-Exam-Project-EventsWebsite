import { Dialog, Portal, Button, HStack, Box } from "@chakra-ui/react";

export default function SimpleModal({ open, onClose, title, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.600" backdropFilter="blur(6px)" />
        <Dialog.Positioner>
          <Dialog.Content maxW="450px" w="100%">
            <Dialog.Header>
              <HStack justify="space-between" align="center" w="100%">
                {/* BACK BUTTON */}
                <Button
                  variant="surface"
                   pl={2}  
                  size="sm"
                  
                  outline="1px solid"
                  outlineColor="gray.300"
                  _dark={{ outlineColor: "gray.100" }}
                  type="submit"
                  colorPalette="gray"
                  onClick={onClose}
                 
                >
                  ← Back
                </Button>

                {/* TITLE */}
                <Dialog.Title style={{ margin: "0 auto" }}>
                  {title}
                </Dialog.Title>

                {/* Lege box om titel te centreren */}
                <Box w="40px" />
              </HStack>
            </Dialog.Header>

            <Dialog.Body>{children}</Dialog.Body>

            <Dialog.Footer>
              {/* <Button onClick={onClose}  rounded="full" variant="surface" border="1px solid" borderColor="gray.300">
                Close
              </Button> */}
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
