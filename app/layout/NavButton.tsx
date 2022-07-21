import { As, Button, ButtonProps, HStack, Icon, Text, useColorModeValue } from "@chakra-ui/react"
import { Link, RouteUrlObject, useRouter } from "blitz"
import React from "react"

interface NavButtonProps extends ButtonProps {
  to: RouteUrlObject | string
  icon: As
  label: string
}

export const NavButton = ({ icon, label, to, ...buttonProps }: NavButtonProps) => {
  const router = useRouter()
  const pathname = typeof to === "object" ? to.pathname : to
  const isActive = router?.pathname === pathname

  return (
    <Link href={to}>
      <Button
        variant={isActive ? "solid" : "ghost"}
        justifyContent="start"
        colorScheme={useColorModeValue("whiteAlpha", "blue")}
        {...buttonProps}
      >
        <HStack spacing="3">
          <Icon as={icon} boxSize="6" color="on-accent-subtle" />
          <Text>{label}</Text>
        </HStack>
      </Button>
    </Link>
  )
}
