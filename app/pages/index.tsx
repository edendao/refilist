import { HStack, useColorModeValue } from "@chakra-ui/react"
import { BlitzPage, Router, Routes } from "blitz"
import React, { useEffect } from "react"
import { GiEarthAfricaEurope, GiEarthAmerica, GiEarthAsiaOceania } from "react-icons/gi"

const Home: BlitzPage = () => {
  useEffect(() => {
    Router.prefetch(Routes.Projects().pathname)
  }, [])

  const color = useColorModeValue("inherit", "white")

  return (
    <HStack color={color} fontSize="9xl" align="center" justify="center" w="100%">
      <GiEarthAmerica />
      <GiEarthAfricaEurope />
      <GiEarthAsiaOceania />
    </HStack>
  )
}

Home.suppressFirstRenderFlicker = true

export default Home
