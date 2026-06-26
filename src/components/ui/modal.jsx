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
                <Button
                  variant="surface"
                  
                  size="sm"
                  justifyContent="center"                  
                  outline="1px solid"
                  outlineColor="gray.300"
                  _dark={{ outlineColor: "gray.100" }}
                  type="submit"
                  colorPalette="gray"
                  onClick={onClose}
                  
                 
                >
                 Back
                </Button>

                <Dialog.Title style={{ margin: "0 auto" }}>
                  {title}
                </Dialog.Title>

                <Box w="40px" />
              </HStack>
            </Dialog.Header>

            <Dialog.Body>{children}</Dialog.Body>

            <Dialog.Footer>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}