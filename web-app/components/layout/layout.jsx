import Navbar from './navbar';
import Footer from './footer/footer';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
};