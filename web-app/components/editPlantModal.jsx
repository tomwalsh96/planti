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
  Text,
  MenuItem
} from "@chakra-ui/react";
import {
  AddIcon
} from "@chakra-ui/icons";
import { Formik } from "formik";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { firestore } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import HardwareSetup from "./hardwareSetup";



export default function EditPlantModal(props) {

  const { oldName, userID, plantID } = props;

  // states
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit} = useDisclosure();
  // const { isOpen: isOpenNew, onOpen: onOpenNew, onClose: onCloseNew} = useDisclosure();
  const [newPlantName, setNewPlantName] = useState(oldName);

  // function to add edit plant
  const editPlant = async event => {
    event.preventDefault();
    await setDoc(doc(firestore, "users", userID, "plants", plantID), {
      name: newPlantName,
      reservoir: 0,
      temperature: 0,
      humidity: 0,
      imageUrl: "https://media.istockphoto.com/photos/house-plantficus-high-variegata-picture-id187359443?k=20&m=187359443&s=612x612&w=0&h=HzAAvIB-C7CsXHWowlx94MbmdC_o2tlt4WqVtvjOQ6o="
    });
    onCloseEdit();
  };


  return (
    <>

      <MenuItem
        onClick={onOpenEdit}
      >
        Edit Name
      </MenuItem>

      <Modal
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
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
            <Text
            mb="1"
              fontSize="2xl"
              fontWeight="bold"
            >
              Edit Plant
            </Text>
            <Divider
              mb="5"
            ></Divider>
            <Formik>
              <form onSubmit={editPlant}>
                <FormControl isRequired>
                  <FormLabel>New Plant Name</FormLabel>
                  <Input
                    type="text"
                    placeholder={oldName}
                    value={newPlantName}
                    onChange={event => setNewPlantName(event.currentTarget.value)}
                  />
                </FormControl>
                <Button
                  colorScheme="green"
                  variant="solid"
                  type="submit"
                  width="full"
                  mt={4}
                >
                  Edit
                </Button>
              </form>
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
};