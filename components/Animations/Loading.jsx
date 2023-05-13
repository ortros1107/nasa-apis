import styles from "@/styles/Animation.module.css";

const Loading = () => {
  return (
    <div className={styles["loading-container"]}>
  <div className={styles["loading-text"]}>
    <span>L</span>
    <span>O</span>
    <span>A</span>
    <span>D</span>
    <span>I</span>
    <span>N</span>
    <span>G</span>
  </div>
</div>
  )
}

export default Loading