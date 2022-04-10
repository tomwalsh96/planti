import styles from './footer.module.css'

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <a
          href="https://tomwalsh96.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by
          <div className={styles.name}>
            Tom Walsh
          </div>
        </a>
      </footer>
    </>
  )
}