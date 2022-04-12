import Head from 'next/head'
import styles from '../styles/data.module.css'
import { firestore } from '../services/firebase';
import { collection, orderBy, limit, query, onSnapshot } from "firebase/firestore";
import { useState } from 'react';

export default function Data() {

  const [logs, setLogs] = useState([]);

  const q = query(collection(firestore, "logs"), orderBy("time", "desc"), limit(10));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const newLogs = [];
    querySnapshot.forEach((doc) => {
        newLogs.push(doc.data());
    });
    setLogs(newLogs);
  });

  function timestampFormatted(timestamp) {
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Planti - Data</title>
        <meta name="description" content="A house plant manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Data Logs</h1>

        <div className={styles.grid}>
          { logs.map((log) => (
              <div
                key={log.id}
                className={styles.card}
              >
                <p className={styles.time}>{timestampFormatted(log.time)}.</p>
                <p className={styles.message}>The soil was {log.status}.</p>
              </div>
            ))
          }
        </div>
      </main>

    </div>
  )
}
