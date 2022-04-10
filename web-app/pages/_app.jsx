import Layout from '../components/layout/layout.jsx'
import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}
