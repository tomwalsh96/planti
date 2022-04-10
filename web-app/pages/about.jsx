import Head from 'next/head'
import styles from '../styles/about.module.css'

export default function About() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Planti - About</title>
        <meta name="description" content="A house plant manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>About Page</h1>

        <p>Nothing to show here yet.</p>

      </main>

    </div>
  )
}