import Image from 'next/image'
import Link from 'next/link'
import {
  Flex,
  Spacer,
  Button,
  IconButton,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Center,
  Avatar,
  Box
} from '@chakra-ui/react'
import {
  HamburgerIcon
} from '@chakra-ui/icons'
import { useAuth } from "../../context/AuthContext"
import {
  useState,
  useCallback,
  useEffect
} from 'react';

// media query which returns if viewport has reached breakpoint
const useMediaQuery = (width) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addListener(updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeListener(updateTarget);
  }, []);

  return targetReached;
};

export default function Navbar() {

  const { user, logout } = useAuth();
  const isBreakpoint = useMediaQuery(768);

  return (
    <>
      <Flex p="5" borderBottom="1px" borderBottomColor="green">
        <IconButton height="3.5rem" variant="ghost" colorScheme="green">
          <Link
            href="/"
            passHref
          >
            <a>
              <Center p="2">
                <Image src="/logo-512x512.png" alt="" width={40} height={40}/>
                <Text px="3" fontSize="3rem" color="black">Planti</Text>
              </Center>
            </a>
          </Link>
        </IconButton>

        <Spacer />

        {user && (
           isBreakpoint ? (
            <Box>
              <Menu>
                <MenuButton as={IconButton} height="3.5rem" width="3.5rem" icon={<HamburgerIcon />} variant='ghost' colorScheme='green'>
                  <Center>
                    <Avatar size="md" bg="green" name='Ryan Florence' src='https://bit.ly/ryan-florence'/>
                    <Box px="3">{user.email}</Box>
                  </Center>
                </MenuButton>
                <MenuList>
                  <MenuGroup title="Account">
                    <MenuItem>
                    <Link
                      href="/dashboard"
                      passHref
                    >
                      <a>
                        <div>Dashboard</div>
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
            </Box>
          ) : (
            <Box>
              <Menu>
                <MenuButton as={Button} height="3.5rem" variant='ghost' colorScheme='green'>
                  <Center>
                    <Avatar size="md" bg="green" name='Ryan Florence' src='https://bit.ly/ryan-florence'/>
                    <Box px="3">{user.email}</Box>
                  </Center>
                </MenuButton>
                <MenuList>
                  <MenuGroup title="Account">
                    <MenuItem>
                    <Link
                      href="/dashboard"
                      passHref
                    >
                      <a>
                        <div>Dashboard</div>
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
            </Box>
          )
        )}
      </Flex>
    </>
  )
}