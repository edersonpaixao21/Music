import styles from './Header.module.css';
import logo from '../../images/logo.png';
import { UserCircle } from 'phosphor-react';
import { getUser } from '../../services/userAPI';
import { useState, useEffect } from 'react';
import { LoadingUser } from '../Loading/Loading';
import { NavLink } from 'react-router-dom';


function Header() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const response = await getUser();
      setUsername(response.name);
      setLoading(false);
    }
    fetchUser()
  }, [username]);

  return (
    <header>
      <div className={styles.containerHeader}>
        <img className={styles.logo} src={logo}/>
        <section className={styles.containerUser}>
          <div><UserCircle size={25} /> {loading ? <LoadingUser /> : <span>{username}</span>}</div>
        </section>
      </div>
      <nav className={styles.containerLinks}>
        <NavLink to="/search"><section className={styles.links}>Procurar</section></NavLink>
        <NavLink to="/favorites"><section className={styles.links}>Favoritos</section></NavLink>
        <NavLink to="/profile"><section className={styles.links}>Perfil</section></NavLink>
      </nav>
    </header>
  )
}

export default Header;
