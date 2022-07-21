import { ChakraProvider } from "@chakra-ui/react"
import theme from "app/core/theme"
import { Layout } from "app/layout/Layout"
import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from "blitz"

function RootErrorFallback({ error }: ErrorFallbackProps) {
  return <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
}

export default function App({ Component, pageProps }: AppProps) {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary FallbackComponent={RootErrorFallback} onReset={reset}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ErrorBoundary>
    </ChakraProvider>
  )
}
