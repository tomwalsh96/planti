import Head from 'next/head'
import styles from '../styles/social.module.css'

export default function Social() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Planti - Social</title>
        <meta name="description" content="A house plant manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Social Page</h1>

        <p>Nothing to show here yet.</p>

        <p>Show a grid of plants connected to the service, an gallery of images over time and relevant graphics/data</p>

        <p>users can choose whether to make a plant public or not.</p>

        <p>Maybe even start growing competitions? Could be a modern twist to the sunflower growing competition in schools.</p>

      </main>

    </div>
  )
}