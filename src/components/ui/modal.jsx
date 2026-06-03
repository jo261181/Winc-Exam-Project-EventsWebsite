<<<<<<< HEAD
import { Dialog, Portal, Button, HStack, Box } from "@chakra-ui/react";
=======
import { Dialog, Portal, Button } from "@chakra-ui/react";
>>>>>>> dc6d5f5818e7193db03cf0e40a3a3b151a2dc2d9

export default function SimpleModal({ open, onClose, title, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.600" backdropFilter="blur(6px)" />
        <Dialog.Positioner>
<<<<<<< HEAD
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
=======
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
>>>>>>> dc6d5f5818e7193db03cf0e40a3a3b151a2dc2d9
            </Dialog.Header>

            <Dialog.Body>{children}</Dialog.Body>

            <Dialog.Footer>
<<<<<<< HEAD
              {/* <Button onClick={onClose}  rounded="full" variant="surface" border="1px solid" borderColor="gray.300">
                Close
              </Button> */}
=======
              <Button onClick={onClose}  rounded="full" variant="surface" border="1px solid" borderColor="gray.300">
                Close
              </Button>
>>>>>>> dc6d5f5818e7193db03cf0e40a3a3b151a2dc2d9
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> dc6d5f5818e7193db03cf0e40a3a3b151a2dc2d9
