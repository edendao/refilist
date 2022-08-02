import { Divider, Flex, FlexProps, Stack } from "@chakra-ui/react"
import { Routes } from "blitz"
import * as React from "react"
import { FiHelpCircle, FiHome, FiRss, FiSunrise } from "react-icons/fi"

import { NavButton } from "./NavButton"

export const Sidebar: React.FC<FlexProps> = (props) => (
  <Flex
    flex={1}
    minW={240}
    maxW={{ base: "full", sm: "xs" }}
    py={{ base: "6", sm: "8" }}
    px={{ base: "4", sm: "6" }}
    {...props}
  >
    <Stack justify="space-between" spacing="1" flex={1}>
      <Stack spacing={[3, 4, 5, 6]}>
        <NavButton label="Home" to={Routes.Home()} icon={FiHome} />
        <NavButton label="Projects" to={Routes.Projects()} icon={FiRss} />
        <NavButton label="Submit" to={Routes.NewProject()} icon={FiSunrise} />
      </Stack>
      <Stack spacing={[3, 4, 5, 6]}>
        <Divider />
        <NavButton label="Help" to={Routes.Help()} icon={FiHelpCircle} />
      </Stack>
    </Stack>
  </Flex>
)
