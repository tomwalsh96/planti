import Head from "next/head";
import styles from "../styles/home.module.css";
import Link from "next/link";
import GetStartedModal from "../components/getStartedModal";

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

        <GetStartedModal />

        <div className={styles.info}>

          <Link
            href="/about"
            passHref
          >
            <a className={styles.card}>
              <h2>About &rarr;</h2>
              <p>Find out more about the project, and why I built it</p>
            </a>
          </Link>
          
          <Link
            href="/learn"
            passHref
          >
            <a className={styles.card}>
              <h2>Learn &rarr;</h2>
              <p>Learn how to set up your own system!</p>
            </a>
          </Link>

          <Link
            href="/social"
            passHref
          >
            <a className={styles.card}>
              <h2>Social &rarr;</h2>
              <p>Upload your own creation and see what others built.</p>
            </a>
          </Link>
          

        </div>
      </main>

    </div>
  )
};
