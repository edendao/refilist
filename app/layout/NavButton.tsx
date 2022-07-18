import { As, Button, ButtonProps, HStack, Icon, Text } from "@chakra-ui/react"
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

  return (
    <Button
      variant={router?.pathname === pathname ? "solid" : "ghost-on-accent"}
      justifyContent="start"
      {...buttonProps}
    >
      <Link href={to}>
        <HStack spacing="3">
          <Icon as={icon} boxSize="6" color="on-accent-subtle" />
          <Text>{label}</Text>
        </HStack>
      </Link>
    </Button>
  )
}
