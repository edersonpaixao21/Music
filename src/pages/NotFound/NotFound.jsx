import styles from './NotFound.module.css';
import logo from '../../images/logo.png';

export function NotFound() {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} />
      <div className={styles.message}>
        <p className={styles.sorry}>Ops!</p>
        <p className={styles.notfind}>We couldn't find the page you're looking for.</p>
      </div>
    </div>
  )
}

export default NotFound;
