import styles from './navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider
} from '@chakra-ui/react'
import useAuth from '../../../context/AuthUserContext'
import { auth, signOut } from '../../../services/firebase';

export default function Navbar() {

  return (
    <>
      <div className={styles.navbar}>
        <Link
          href="/"
          passHref
        >
          <a className={styles.logolink}>
            <span className={styles.logo}>
              <Image src="/logo-512x512.png" alt="" width={50} height={50} />
            </span>
            <div className={styles.title}>Planti</div>
          </a>
        </Link>
        {/* <div className={styles.menu}>
          <Link
            href="/data"
            passHref
          >
            <a>
              <Button colorScheme="green" variant="ghost" size="lg">
                Data
              </Button>
            </a>
          </Link>
        </div> */}

        {useAuth().user && (
          <Menu>
            <MenuButton as={Button} colorScheme='pink'>
              Profile
            </MenuButton>
            <MenuList>
              <MenuGroup title='Profile'>
                <MenuItem>My Account</MenuItem>
                <MenuItem>Payments </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup>
                <MenuItem onClick={()=>signOut(auth)}>Logout</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        )}
      </div>
    </>
  )
}