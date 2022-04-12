import Layout from '../components/layout/layout.jsx'
import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthUserProvider } from '../context/AuthUserContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </AuthUserProvider>
  )
}
