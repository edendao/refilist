import { Box, Flex, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import React from "react"

import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar"

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const bg = useColorModeValue("gray.100", "gray.900")

  return (
    <Flex as="section" direction={{ base: "column", lg: "row" }} flexGrow={1} bg={bg}>
      {isDesktop ? <Sidebar /> : <Navbar />}
      {children}
    </Flex>
  )
}
