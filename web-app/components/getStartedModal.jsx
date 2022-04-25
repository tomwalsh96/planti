import {
  Button,
  ButtonGroup,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CircularProgress,
  Box,
  Flex,
  Divider,
  Text
} from "@chakra-ui/react";
import {
  ViewIcon,
  ViewOffIcon
} from "@chakra-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { Formik } from "formik";
import { useState } from "react";
import { useRouter } from "next/router";
import { auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "../services/firebase";



export default function GetStartedModal() {

  // states
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [googleError, setGoogleError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  // toggle password visibility
  const showPassToggle = () => setShowPass(!showPass);

  // init router
  const router = useRouter();

  // login submission
  const handleSignup = async event => {
    event.preventDefault();
    setSignupError(null);
    setIsLoading(true);
    if (password === confirmation)
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setIsLoading(false);
          onClose();
          router.push("/dashboard");
        })
        .catch(error => {
          if (error.code == "auth/email-already-in-use") {
            setSignupError("Email already in use.")
            setIsLoading(false);
          } else if (error.code == "auth/weak-password") {
            setSignupError("Password must be atleast 6 characters.")
            setIsLoading(false);
          } else {
            setSignupError(error.message)
            setIsLoading(false);
          }
        });
    else {
      setSignupError("Passwords don't match.")
      setIsLoading(false);
    }
  };

  // login submission
  const handleLogin = async event => {
    event.preventDefault();
    setLoginError(null);
    setGoogleError(null);
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(false);
        onClose();
        router.push("/dashboard");
      })
      .catch((error) => {
        if ( error.code == "auth/user-not-found") {
          setLoginError("User not found.")
        } else if ( error.code == "auth/wrong-password" ) {
          setLoginError("Password incorrect.")
        } else {
          setLoginError(error.message)
        }
        setIsLoading(false);
      });
  };

  // google authentication
  const googleAuth = async event => {
    event.preventDefault();
    setLoginError(null);
    setGoogleError(null);
    setIsLoadingGoogle(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        setIsLoadingGoogle(false);
        onClose();
        router.push("/dashboard");
      }).catch((error) => {
        if ( error.code == "auth/popup-closed-by-user") {
          setGoogleError("Popup closed by user.");
        }  else {
          setGoogleError(error.message);
        }
        setIsLoadingGoogle(false);
      });
  }

  return (
    <>

      <Button onClick={onOpen} colorScheme='green' variant='solid'>
        Get Started
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        trapFocus={false}
        isCentered
        size="xl"
      >
        <ModalOverlay
          backdropFilter="blur(5px)"
        />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Tabs
              pt="10"
              pb="4"
              variant='line'
              colorScheme='green'
            >
              <TabList
                mb='1em'
              >
                <Tab>Login</Tab>
                <Tab>Signup</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Formik>
                    <form onSubmit={handleLogin}>
                      <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                          type="email"
                          placeholder="email@address.com"
                          onChange={event => setEmail(event.currentTarget.value)}
                        />
                      </FormControl>
                      <FormControl isRequired mt={6}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Input
                            type={showPass ? 'text' : 'password'}
                            placeholder="password"
                            onChange={event => setPassword(event.currentTarget.value)}
                          />
                          <InputRightElement width="3rem">
                            <Button h="1.5rem" size="sm" onClick={showPassToggle}>
                              {showPass ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                      <Button
                        colorScheme="green"
                        variant="solid"
                        type="submit"
                        width="full"
                        mt={4}
                      >
                        {isLoading ? (
                          <CircularProgress isIndeterminate size="24px" color="green" />
                        ) : (
                          'Log in'
                        )}
                      </Button>
                      {loginError && (
                        <Alert
                          mt={4}
                          status='error'
                        >
                        <AlertIcon />
                        <AlertTitle>{loginError}</AlertTitle>
                        <AlertDescription>Try again.</AlertDescription>
                      </Alert>
                      )}
                    </form>
                  </Formik>
                  <Box
                    pt="4"
                    pb="2"
                  >
                    <Flex
                      align="center"
                    >
                      <Divider />
                      <Text p="3">or</Text>
                      <Divider />
                    </Flex>
                    <ButtonGroup
                      isAttached
                      variant='outline'
                      width="full"
                      mt={4}
                    >
                      <IconButton
                        icon={<FcGoogle />}
                        onClick={googleAuth}
                      />
                      <Button
                        colorScheme="blue"
                        variant="solid"
                        width="full"
                        onClick={googleAuth}
                      >
                        {isLoadingGoogle ? (
                          <CircularProgress isIndeterminate size="24px" colorScheme="blue" />
                        ) : (
                          'Log in with Google'
                        )}
                      </Button>
                    </ButtonGroup>
                    {googleError && (
                        <Alert
                          mt={4}
                          status='error'
                        >
                        <AlertIcon />
                        <AlertTitle>{googleError}</AlertTitle>
                        <AlertDescription>Try again.</AlertDescription>
                      </Alert>
                      )}
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Formik>
                    <form onSubmit={handleSignup}>
                      <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                          type="email"
                          placeholder="email@address.com"
                          onChange={event => setEmail(event.currentTarget.value)}
                        />
                      </FormControl>
                      <FormControl isRequired mt={6}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Input
                            id="password"
                            type={showPass ? 'text' : 'password'}
                            placeholder="password"
                            onChange={event => setPassword(event.currentTarget.value)}
                          />
                          <InputRightElement width="3rem">
                            <Button h="1.5rem" size="sm" onClick={showPassToggle}>
                              {showPass ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <InputGroup mt={2}>
                          <Input
                            id="confirmation"
                            type={showPass ? 'text' : 'password'}
                            placeholder="confirm password"
                            onChange={event => setConfirmation(event.currentTarget.value)}
                          />
                          <InputRightElement width="3rem">
                            <Button h="1.5rem" size="sm" onClick={showPassToggle}>
                              {showPass ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                      <Button
                        colorScheme="green"
                        variant="solid"
                        type="submit"
                        width="full"
                        mt={4}
                      >
                        {isLoading ? (
                          <CircularProgress isIndeterminate size="24px" color="teal" />
                        ) : (
                          'Sign up'
                        )}
                      </Button>
                      {signupError && (
                        <Alert
                          mt={4}
                          status='error'
                        >
                        <AlertIcon />
                        <AlertTitle>{signupError}</AlertTitle>
                        <AlertDescription>Try again.</AlertDescription>
                      </Alert>
                      )}
                    </form>
                  </Formik>
                  <Box
                    pt="4"
                    pb="2"
                  >
                    <Flex
                      align="center"
                    >
                      <Divider />
                      <Text p="3">or</Text>
                      <Divider />
                    </Flex>
                    <ButtonGroup
                      isAttached
                      variant='outline'
                      width="full"
                      mt={4}
                    >
                      <IconButton
                        icon={<FcGoogle />}
                        onClick={googleAuth}
                      />
                      <Button
                        colorScheme="blue"
                        variant="solid"
                        width="full"
                        onClick={googleAuth}
                      >
                        {isLoadingGoogle ? (
                          <CircularProgress isIndeterminate size="24px" colorScheme="blue" />
                        ) : (
                          'Sign up with Google'
                        )}
                      </Button>
                    </ButtonGroup>
                    {googleError && (
                        <Alert
                          mt={4}
                          status='error'
                        >
                        <AlertIcon />
                        <AlertTitle>{googleError}</AlertTitle>
                        <AlertDescription>Try again.</AlertDescription>
                      </Alert>
                      )}
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}