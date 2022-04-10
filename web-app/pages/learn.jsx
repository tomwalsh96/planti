import Head from 'next/head'
import styles from '../styles/learn.module.css'

export default function Learn() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Planti - Learn</title>
        <meta name="description" content="A house plant manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Learn how to build your own!</h1>

        <p>Nothing to show here yet.</p>

      </main>

    </div>
  )
}