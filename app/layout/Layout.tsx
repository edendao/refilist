import { Box, Flex, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import React from "react"

import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar"

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  return (
    <Flex
      as="section"
      direction={{ base: "column", lg: "row" }}
      height="100vh"
      overflowY="scroll"
      bg={useColorModeValue("gray.100", "gray.800")}
    >
      {isDesktop ? <Sidebar /> : <Navbar />}
      <Box flex="1" overflow="scroll">
        {children}
      </Box>
    </Flex>
  )
}
