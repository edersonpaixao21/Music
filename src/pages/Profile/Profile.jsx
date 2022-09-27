import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserCircle } from "phosphor-react";
import Header from "../../components/Header/Header";
import { Loading } from '../../components/Loading/Loading';
import { getUser } from "../../services/userAPI";
import styles from './Profile.module.css'

export function Profile() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    const request = await getUser();
    setUserData(request);
    setLoading(false);
  }

  const handleLogoutBtn = () => {
    localStorage.setItem('favorite_songs', JSON.stringify([]));
    localStorage.removeItem('user');
    navigate('/');
  }

  return (
    <div>
      <Header />
      <main className={styles.container}>
        {loading ? <Loading /> : (
          <section className={styles.userContainer}>
          <div className={styles.userImageContainer}>
            {userData.image === '' ? <UserCircle size={60} className={styles.userIcon}/> : <img src={ userData.image } alt={ `${userData.name} photo`} className={styles.userImage} />}            
            <NavLink to="/profile/edit"><button type="button" className={styles.editButton}>Editar perfil</button></NavLink>
          </div>
          <h4 className={styles.nameHeader}>Nome:</h4>
          <p className={styles.name}>{ userData.name }</p>
          <h4 className={styles.emailHeader}>Email:</h4>
          <p className={styles.email}>{ userData.email }</p>
          <h4 className={styles.descriptionHeader}>Descrição:</h4>
          <p className={styles.description}>{ userData.description }</p>
          <button className={styles.logoutBtn} onClick={ handleLogoutBtn }>Sair</button>
        </section>
        )}        
      </main>
    </div>
  )
}

export default Profile;
