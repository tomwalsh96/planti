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
  MenuDivider,
  Avatar,
  AvatarBadge,
  AvatarGroup
} from '@chakra-ui/react'
import { useAuth } from "../../../context/AuthContext"

export default function Navbar() {

  const { user, logout } = useAuth();

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

        {user && (
          <div className={styles.userMenu}>
            <Menu>
              <MenuButton as={Button} colorScheme='pink'>
                {user.email}
              </MenuButton>
              <MenuList>
                <MenuGroup title='Profile'>
                  <MenuItem>
                  <Link
                    href="/dashboard"
                    passHref
                  >
                    <a>
                      <div >Dashboard</div>
                    </a>
                  </Link>
                  </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </div>
        )}
      </div>
    </>
  )
}