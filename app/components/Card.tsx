import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react"
import React from "react"

export const Card = (props: BoxProps) => (
  <Box
    minHeight="3xs"
    background="white"
    boxShadow={useColorModeValue("sm", "sm-dark")}
    transition="box-shadow 200ms ease-in-out"
    _hover={{ boxShadow: "xl" }}
    borderRadius="lg"
    padding="6"
    overflow="clip"
    {...props}
  />
)
