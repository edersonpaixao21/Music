import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserCircle } from "phosphor-react";
import Header from '../../components/Header/Header';
import { Loading } from '../../components/Loading/Loading';
import { getUser, updateUser } from "../../services/userAPI";
import styles from './ProfileEdit.module.css';

export function ProfileEdit() {
  const [image, setImage] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);
  
  const fetchUser = async () => {
    setLoading(true);
    const { name, email, image, description} = await getUser();
    setUsername(name);
    setEmail(email);
    setImage(image);
    setDescription(description);
    setLoading(false);
  }
  
  const REGEX_PATTERN = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
  let errorMsg;
  const validEmail = REGEX_PATTERN.test(email);
  const requirements = [
    validEmail,
    username.length > 0,
    email.length > 0,
    description.length > 0,
  ];

  !validEmail ? errorMsg ='Por favor, digite um e-mail válido' : errorMsg = '';

  const isDisabled = requirements.every((condition) => condition === true);    

  const handleInput = ({target}) => {
    switch (target.name) {
      case 'name':
        setUsername(target.value);
        break;
      case 'email':
        setEmail(target.value);
        break;
      case 'description':
        setDescription(target.value);
        break;
      case 'image':
        setImage(target.value);
        break;
    }
  }
    
  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      name: username,
      email: email,
      image: image,
      description: description,
    };
    updateUser(userInfo);
    history('/profile');
  }

  return (
    <div>
      <Header />
      <main>        
               <section className={styles.userContainer}>
          <form onSubmit={ handleSubmit }>
            <div className={styles.userImageContainer}>
              {image === '' ? <UserCircle size={60} className={styles.userIcon}/> : <img src={ image } alt={ `user's photo`}  className={styles.userImage} />}            
            <input name="image" type="text" placeholder="Defina o link exato da sua foto" onChange={ handleInput }/>
            </div>
            <div className={styles.inputContainer}>
              <h4 className={styles.username}>Nome</h4>
              <p>Sinta-se à vontade para usar seu nome social</p>
              <input type="text"
              name="name" placeholder="Nome" onChange={ handleInput } required />
              <h4 className={styles.email}>Email</h4>
              <input type="text"
              name="email" placeholder="username@email.com" onChange={ handleInput }
              required />
              <p>{errorMsg}</p>
              <h4>Descrição</h4>              
            </div>              
                <textarea
                  type="textarea"
                  name="description"
                  cols="20"
                  wrap="hard"
                  placeholder="Sobre mim"
                  onChange={ handleInput }
                  required
                  className={styles.description}
                />
              <button
                type="submit" 
                className={styles.saveBtn}
                disabled={!isDisabled}
              >
                Salvar
              </button>
          </form>
        </section>
        
      </main>
    </div>
  )
}

export default ProfileEdit;
