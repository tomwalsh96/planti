import Head from 'next/head'
import styles from '../styles/home.module.css'
import { Button, ButtonGroup } from '@chakra-ui/react'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Planti</title>
        <meta name="description" content="A house plant manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Planti!
        </h1>

        <p className={styles.description}>
          Your house plant manager
        </p>

        <ButtonGroup direction='row' spacing={4} align='center' className={styles.start}>
          <Button colorScheme='green' variant='solid'>
            Signup
          </Button>
          <Button colorScheme='green' variant='outline'>
            Login
          </Button>
        </ButtonGroup>

        <div className={styles.info}>
          <a href="/about" className={styles.card}>
            <h2>About &rarr;</h2>
            <p>Find out more about the project, and why I built it</p>
          </a>

          <a href="/tutorial" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn how to set up your own system!</p>
          </a>

          <a
            href="/social"
            className={styles.card}
          >
            <h2>Social &rarr;</h2>
            <p>Upload your own creation and discover see what others built.</p>
          </a>

        </div>
      </main>

    </div>
  )
}
