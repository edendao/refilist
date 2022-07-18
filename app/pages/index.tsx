import { BlitzPage, Router, Routes } from "blitz"
import { useEffect } from "react"

const Home: BlitzPage = () => {
  useEffect(() => {
    Router.prefetch(Routes.Projects().pathname)
  }, [])

  return null
}

Home.suppressFirstRenderFlicker = true

export default Home
