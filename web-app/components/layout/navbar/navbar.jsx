import styles from './navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@chakra-ui/react'

export default function Navbar() {
  return (
    <>
      <div className={styles.navbar}>
        <Link
          href="/"
        >
          <span className={styles.logo}>
            <Image src="/logo-512x512.png" alt="" width={50} height={50} />
          </span>
          <div className={styles.title}>Planti</div>
        </Link>
        <div className={styles.menu}>
          <Link
            href="/data"
          >
            <Button colorScheme="green" variant="ghost" size="lg">
              Data
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}