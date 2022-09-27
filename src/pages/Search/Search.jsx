import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { Loading } from '../../components/Loading/Loading';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import styles from './Search.module.css';

export function Search() {
  const [searchInput, setSearch] = useState('');
  const [searchedArtist, setSearchedArtist] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInput = ({target}) => {
    setSearch(target.value);
    setSearchedArtist(target.value);
  };

  const handleSearchButton = async (event) => {
    event.preventDefault();
    setSearch('');
    setLoading(true);
    const response = await searchAlbumsAPI(searchedArtist);
    setResults(response);
    setLoading(false);
  }

  const isInputEmpty = searchInput.length < 1;

  return (
    <div>
      <Header />
      {loading ? <Loading /> :
        <main>
          <div className={styles.container}>
            <div className={styles.inputContainer}>
              <form>
                <label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Qual é o seu artista favorito?"
                    onChange={handleInput}
                    value={searchInput}
                    required
                  />
                </label>
                <button
                  name="searchBtn"
                  type="submit"
                  onClick={handleSearchButton}
                  disabled={isInputEmpty}
                >
                  Procurar
                </button>
              </form>
            </div>
          </div>
          <div className={styles.artistName}>
            
            {(results.length > 0) ? <p> Resultados para <span>{`${searchedArtist}`}</span></p>
              : <span>{`${searchedArtist}`}</span>
            }            
          </div>
            {results.length === 0 && 
              <div className={styles.notFoundAlbum}>
                <p>Nenhum artista foi encontrado</p>
              </div>}
          <section className={styles.albumContainer}>
            {results.map(({artistName, artworkUrl100, collectionName, collectionId}) =>
              <div key={collectionId}> 
                <NavLink to={`/album/${collectionId}`} id={collectionId}>
                  <div  className={styles.album}>
                      <img src={artworkUrl100} alt={`${artistName} album`} className={styles.cover}></img>
                      <div className={styles.artistInfo}>
                        <h4>{collectionName}</h4>
                        <p>{artistName}</p>
                      </div>
                  </div>
                </NavLink>
              </div>
            )}
          </section>
        </main>
      }
    </div>
  )
}

export default Search;
