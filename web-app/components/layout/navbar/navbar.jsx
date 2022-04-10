import styles from './navbar.module.css'
import Image from 'next/image'
import { Button } from '@chakra-ui/react'

export default function Navbar() {
  return (
    <>
      <div className={styles.navbar}>
        <a className={styles.logolink}
          href="/"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>
            <Image src="/logo-512x512.png" alt="" width={50} height={50} />
          </span>
          <div className={styles.title}>Planti</div>
        </a>
        <div className={styles.menu}>
          <a
            href="/data"
            rel="noopener noreferrer"
          >
            <Button colorScheme="green" variant="ghost" size="lg">
              Data
            </Button>
          </a>
        </div>
      </div>
    </>
  )
}