import { ChakraProvider } from "@chakra-ui/react"
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
  return (
    <ChakraProvider>
      <ErrorBoundary
        FallbackComponent={RootErrorFallback}
        onReset={useQueryErrorResetBoundary().reset}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ErrorBoundary>
    </ChakraProvider>
  )
}
