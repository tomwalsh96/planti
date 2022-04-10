import styles from './footer.module.css'
import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <Link
          href="https://tomwalsh96.com"
          target="_blank"
        >
          Built by
          <div className={styles.name}>
            Tom Walsh
          </div>
        </Link>
      </footer>
    </>
  )
}