import styles from './getStartedModal.module.css'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CircularProgress
} from '@chakra-ui/react';
import {
  ViewIcon,
  ViewOffIcon
} from '@chakra-ui/icons';
import {
  Formik,
  Form,
  Field } from 'formik'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../../services/firebase';



export default function GetStartedModal() {

  // open/close modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // toggle password visibility
  const [showPass, setShowPass] = useState(false);
  const showPassToggle = () => setShowPass(!showPass);

  const router = useRouter();

  // // email and password states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState("");

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

  // temp error handling
  const [signupError, setSignupError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
              className={styles.tabs}
              variant='line'
              colorScheme='green'
            >
              <TabList
                mb='1em'
              >
                <Tab>Signup</Tab>
                <Tab>Login</Tab>
              </TabList>
              <TabPanels
                className={styles.tabPanels}
              >
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
                          'Sign Up'
                        )}
                      </Button>
                    </form>
                  </Formik>
                  <div
                    className={styles.federatedProvider}
                  >
                    <p>- or -</p>
                    <p>Signup with Google</p>
                  </div>
                </TabPanel>
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
                          'Log In'
                        )}
                      </Button>
                    </form>
                  </Formik>
                  <div
                    className={styles.federatedProvider}
                  >
                    <p>- or -</p>
                    <p>Login with Google</p>
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}