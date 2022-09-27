import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import styles from './MusicCard.module.css';

function MusicCard({ song, trackName, trackNumber, trackId, previewUrl, albumCoverSmall, fetchFavoriteSongs }) {
  const [isChecked, setIsChecked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    renderFavoriteSongs();
  }, []);  
  
  const renderFavoriteSongs = async() => {    
    const favorites = await getFavoriteSongs();
    const checkFavorites = favorites.some((song) => song.trackId === trackId );
    setIsChecked(checkFavorites);
  }

  const addOrRemoveSong = async (checkbox) => {    
    if (checkbox.checked) {
      await addSong(song);
      await renderFavoriteSongs();
    } else {
      await removeSong(song);
      await renderFavoriteSongs();
    }
  }
 
  const handleCheckbox = ({target}) => {
    if (location.pathname === '/favorites') {
      addOrRemoveSong(target); 
      fetchFavoriteSongs();
    }
    addOrRemoveSong(target);
  }

  return (
    <section>
      <div key={trackId} className={ location.pathname === '/favorites' ? styles.favoriteContainer : styles.songContainer}>
        {(location.pathname === '/favorites') && <img src={albumCoverSmall} />}       
        <p>{`${trackNumber}.${trackName}`}</p>
        <audio className={styles.audioPlayer} src={ previewUrl } controls>
          <track kind="captions" />
            Your browser does not support the element<code>audio</code>.
        </audio>        
          <input
            name={trackName}
            id={trackId}
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckbox}
          />
        <label htmlFor={trackId}>
          ❤
        </label>        
        </div>
    </section>
  )};

export default MusicCard;
