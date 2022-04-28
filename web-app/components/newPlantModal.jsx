import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Divider,
  Text
} from "@chakra-ui/react";
import {
  AddIcon
} from "@chakra-ui/icons";
import { Formik } from "formik";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { firestore } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";



export default function NewPlantModal() {

  // states
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [plantName, setPlantName] = useState('');
  const [plantID, setPlantID] = useState('');
  const [isCreated, setIsCreated] = useState(false);

  const { user } = useAuth();

  // function to add new plant to user account
  const addPlant = async event => {
    event.preventDefault();
    const plant = await addDoc(collection(firestore, "users", user.uid, "plants"), {
      name: plantName,
      reservoir: 0,
      temperature: 0,
      humidity: 0,
      imageUrl: "https://media.istockphoto.com/photos/house-plantficus-high-variegata-picture-id187359443?k=20&m=187359443&s=612x612&w=0&h=HzAAvIB-C7CsXHWowlx94MbmdC_o2tlt4WqVtvjOQ6o="
    })
    setPlantID(plant.id);
    setIsCreated(true);
  };


  return (
    <>

      <Button
        leftIcon={<AddIcon />}
        colorScheme="green"
        onClick={onOpen}
      >
        New plant
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsCreated(false);
          onClose();
        }}
        trapFocus={false}
        isCentered
        size="xl"
      >
        <ModalOverlay
          backdropFilter="blur(5px)"
        />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody
            pt="10"
            pb="6"
          >
          {!isCreated ? (
            <>
              <Text
              mb="1"
                fontSize="2xl"
                fontWeight="bold"
              >
                Step 1
              </Text>
              <Divider
                mb="5"
              ></Divider>
              <Formik>
              <form onSubmit={addPlant}>
                <FormControl isRequired>
                  <FormLabel>Plant Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="name"
                    onChange={event => setPlantName(event.currentTarget.value)}
                  />
                </FormControl>
                <Button
                  colorScheme="green"
                  variant="solid"
                  type="submit"
                  width="full"
                  mt={4}
                >
                  Add
                </Button>
              </form>
            </Formik>
            </>
          ) : (
            <>
              <Text
                mb="1"
                fontSize="2xl"
                fontWeight="bold"
              >
                Step 2
              </Text>
              <Divider
                mb="5"
              ></Divider>
              <Text
                mb="4"
              >
                Connect your hardware using the following ID's:
              </Text>
              <Text
                fontWeight="bold"
              >
                User ID:
              </Text>
              <Text
                mb="4"
              >
                {user.uid}
              </Text>
              <Text
                fontWeight="bold"
              >
                Plant ID:
              </Text>
              <Text>{plantID}</Text>
            </>
          )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
};