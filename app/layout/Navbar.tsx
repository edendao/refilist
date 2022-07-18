import { Box, Drawer, DrawerContent, DrawerOverlay, Flex, useDisclosure } from "@chakra-ui/react"
import { ToggleButton } from "app/components/ToggleButton"
import React from "react"

import { Sidebar } from "./Sidebar"

export const Navbar = () => {
  const { isOpen, onToggle, onClose } = useDisclosure()

  return (
    <Box width="full" py="4" px={{ base: "4", md: "8" }} bg="bg-accent">
      <Flex justify="space-between">
        <ToggleButton isOpen={isOpen} onClick={onToggle} aria-label="Open Menu" />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          isFullHeight
          preserveScrollBarGap
        >
          <DrawerOverlay />
          <DrawerContent>
            <Sidebar />
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  )
}
