import Map from "@/components/Map";
import styles from "@/styles/Eonet.module.css";

const Eonet = () => {

  return (
    <main className={styles.main} role="main">
    <Map css={styles.map}/>
    </main>
  )
}

export default Eonet