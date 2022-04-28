import {
  Divider,
  Text
} from "@chakra-ui/react";

export default function HardwareSetup(props) {

  const { heading, userID, plantID } = props;

  return (
    <>
      <Text
        mb="1"
        fontSize="2xl"
        fontWeight="bold"
      >
        {heading}
      </Text>
      <Divider
        mb="5"
      ></Divider>
      <Text
        mb="4"
      >
        Connect your hardware using the following IDs:
      </Text>
      <Text
        fontWeight="bold"
      >
        User ID:
      </Text>
      <Text
        mb="4"
      >
        {userID}
      </Text>
      <Text
        fontWeight="bold"
      >
        Plant ID:
      </Text>
      <Text>{plantID}</Text>
    </>
  )
};