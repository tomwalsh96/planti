import Head from "next/head";
import {
  Heading,
  Center,
  Text,
  Box,
  Badge,
  Image,
  Wrap,
  WrapItem,
  AspectRatio,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";
import {
  SettingsIcon
} from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import {
  useEffect
} from "react";
import NewPlantModal from "../components/newPlantModal";
import { useState } from "react";
import { firestore } from "../services/firebase";
import { collection, query, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import HardwareSetup from "../components/hardwareSetup";
import EditPlantModal from "../components/editPlantModal";

export default function Dashboard() {

  // const plants = [
  //   {id: "steven-1", name: "steven", reservoir: "10", temperature: "12", humidity: "40", imageUrl: "https://media.istockphoto.com/photos/house-plantficus-high-variegata-picture-id187359443?k=20&m=187359443&s=612x612&w=0&h=HzAAvIB-C7CsXHWowlx94MbmdC_o2tlt4WqVtvjOQ6o=" },
  //   {id: "eric-1", name: "eric", reservoir: "35", temperature: "12", humidity: "40", imageUrl: "https://media.istockphoto.com/photos/houseplant-in-black-pot-isolated-on-white-background-picture-id519687055?k=20&m=519687055&s=612x612&w=0&h=XicWya0KCKUcvZnUeTssoTwcs1RNmewKcDBIo3WysEY=" },
  //   {id: "stan-1", name: "stan", reservoir: "80", temperature: "12", humidity: "40", imageUrl: "https://media.istockphoto.com/photos/decorative-banana-plant-in-stone-marble-vase-isolated-on-white-3d-picture-id1144381259?k=20&m=1144381259&s=612x612&w=0&h=2uFbUJ0GnnNcsShJVda7cHD_in7I84pt_3hOolHQz_k=" }
  // ]

  const { isOpen: isOpenSetup, onOpen: onOpenSetup, onClose: onCloseSetup} = useDisclosure();
  const [plants, setPlants] = useState([]);

  // init router
  const router = useRouter();

  // get user data and reroute if not logged in
  const { user } = useAuth();
  useEffect(() => {

    if (!user) {
      router.replace("/");
    } else {
      const q = query(collection(firestore, "users", user.uid, "plants"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newPlants = [];
        querySnapshot.forEach((doc) => {
            newPlants.push(doc);
        });
        setPlants(newPlants);
      });
      return unsubscribe;
    }
  }, [user]);

  async function deletePlant(id) {
    await deleteDoc(doc(firestore, "users", user.uid, "plants", id));
  }


  return(
    <>

      <Head>
        <title>Planti - Dashboard</title>
        <meta name="description" content="A house plant manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Center mt="2rem">
        <Heading>
          Dashboard
        </Heading>
      </Center>
      <Center my="1rem">
        <Text>
          All your plants and their current stats are displayed here.
        </Text>
      </Center>
      <Center mb="2rem">
        <NewPlantModal />
      </Center>
        
      <Wrap
        minHeight="90vh"
        p="2rem"
        spacing="2rem"
        justify="center"
      >
        {plants.map((plant) => 
          <WrapItem
            key={plant.id}
          >
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              w="30rem"
              h="20rem"
              boxShadow="md"
            >
              <Flex>
                <AspectRatio w="12rem" h="20rem" ratio={4 / 3}>
                  <Image src={plant.data().imageUrl}/>
                </AspectRatio>
                <Box
                  p="6"
                >
                  <Box
                    display="flex"
                    alignItems="baseline"
                  >
                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      isTruncated
                      width="8rem"
                    >
                      {plant.data().name}
                    </Box>
                  </Box>

                  {plant.data().reservoir <= 20 &&
                    <Badge
                      borderRadius="full"
                      px="2"
                      mt="1"
                      mb="3"
                      colorScheme="red"
                    >
                      Needs Water
                    </Badge>
                  }

                  <Box color="gray.600" fontSize="sm">
                    Reservoir: {plant.data().reservoir}%
                  </Box>

                  <Box color="gray.600" fontSize="sm">
                    Temperature: {plant.data().temperature}°C
                  </Box>

                  <Box color="gray.600" fontSize="sm">
                    Humidity: {plant.data().humidity}%
                  </Box>

                </Box>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    m="1"
                    icon={<SettingsIcon />}
                    variant="ghost"
                  />
                  <MenuList>
                    <EditPlantModal oldName={plant.data().name} userID={user.uid} plantID={plant.id}/>
                    <MenuItem
                      onClick={onOpenSetup}
                    >
                      Hardware Setup
                    </MenuItem>
                    <Modal
                      isOpen={isOpenSetup}
                      onClose={onCloseSetup}
                      trapFocus={false}
                      isCentered
                      size="xl"
                    >
                      <ModalOverlay
                        bg="blackAlpha.300"
                        backdropFilter="blur(2px)"
                      />
                      <ModalContent>
                        <ModalCloseButton />
                        <ModalBody
                          pt="10"
                          pb="6"
                        >
                          <HardwareSetup heading={"Hardware Setup"} userID={user.uid} plantID={plant.id}/>
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                    <MenuDivider />
                    <MenuItem
                      onClick={() => deletePlant(plant.id)}
                    >
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </Box>
          </WrapItem>
        )}
      </Wrap>

    </>
  )
};