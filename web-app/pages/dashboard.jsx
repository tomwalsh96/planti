import styles from '../styles/dashboard.module.css'

import Head from 'next/head'

import {
  Heading,
  Text,
  Box,
  Badge,
  Image,
  Wrap,
  WrapItem,
  AspectRatio,
  Flex
} from '@chakra-ui/react'

export default function Dashboard() {

  const plants = [
    {id: "steven-1", name: "steven", reservoir: "10", temperature: "12", humidity: "40", imageUrl: "https://media.istockphoto.com/photos/house-plantficus-high-variegata-picture-id187359443?k=20&m=187359443&s=612x612&w=0&h=HzAAvIB-C7CsXHWowlx94MbmdC_o2tlt4WqVtvjOQ6o=" },
    {id: "eric-1", name: "eric", reservoir: "35", temperature: "12", humidity: "40", imageUrl: "https://media.istockphoto.com/photos/houseplant-in-black-pot-isolated-on-white-background-picture-id519687055?k=20&m=519687055&s=612x612&w=0&h=XicWya0KCKUcvZnUeTssoTwcs1RNmewKcDBIo3WysEY=" },
    {id: "stan-1", name: "stan", reservoir: "80", temperature: "12", humidity: "40", imageUrl: "https://media.istockphoto.com/photos/decorative-banana-plant-in-stone-marble-vase-isolated-on-white-3d-picture-id1144381259?k=20&m=1144381259&s=612x612&w=0&h=2uFbUJ0GnnNcsShJVda7cHD_in7I84pt_3hOolHQz_k=" }
  ]

  return(
    <div className={styles.container}>

      <Head>
        <title>Planti - Dashboard</title>
        <meta name="description" content="A house plant manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Heading mb="0.6rem">
          Dashboard
        </Heading>
        <Text mb="2rem">
          All your plants and their current stats are displayed here.
        </Text>
        <Wrap spacing='2rem' justify='center'>
          {plants.map((plant) => 
            <WrapItem key={plant.id}>
              <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' w='30rem' h='20rem'>
                <Flex>
                  <AspectRatio w="12rem" h="20rem" ratio={4 / 3}>
                    <Image src={plant.imageUrl}/>
                  </AspectRatio>
                  <Box p='6'>
                    <Box display='flex' alignItems='baseline' mb="0.6rem">
                      <Box
                        mt='1'
                        fontWeight='semibold'
                        as='h4'
                        lineHeight='tight'
                        isTruncated
                      >
                        {plant.name}
                      </Box>
                      {plant.reservoir <= 20 &&
                        <Badge borderRadius='full' px='2' colorScheme='red' ml="1rem">
                          Needs Water
                        </Badge>
                      }
                    </Box>

                    <Box color='gray.600' fontSize='sm'>
                      Reservoir: {plant.reservoir}%
                    </Box>

                    <Box color='gray.600' fontSize='sm'>
                      Temperature: {plant.temperature}%
                    </Box>

                    <Box color='gray.600' fontSize='sm'>
                      Humidity: {plant.humidity}%
                    </Box>

                  </Box>
                </Flex>
              </Box>
            </WrapItem>
          )}
        </Wrap>
      </main>
    </div>
  )
}