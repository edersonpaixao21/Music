import styles from './Loading.module.css';

function Loading() {
  return (
    <div className={styles.container}>
      <p className={styles.message}>Carregando...</p>
    </div>
  )
}

function LoadingUser() {
  return (<p className={styles.loadingUser}>Carregando...</p>)
}

export {Loading, LoadingUser};
