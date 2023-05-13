import styles from "../styles/404.module.css";

const NotFound = () => {
  return (
    <main className={`${styles["error-404"]}`} role="main">
            <h1 className={`${styles.h1}`}>404</h1>
            <h2 className={`${styles.h2}`}>Not Found</h2>
            <p className={`${styles.p}`}>This page doesn`t exist.</p>
        </main>
  )
}

export default NotFound;