import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import { Loading } from '../../components/Loading/Loading';
import MusicCard from '../../components/MusicCard/MusicCard';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import styles from './Favorites.module.css';

export function Favorites() {
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetchFavoriteSongs()
  }, []);

  const fetchFavoriteSongs = async () => {
    setLoading(true);
    const data = await getFavoriteSongs();
    setFavoriteSongs(data);
    setLoading(false);
  }

  return (
    <div>
      <Header />
      {loading ? <Loading /> : (
        <main className={styles.favoritesContainer}>
        <section className={styles.favoritedSong}>
        {favoriteSongs.map((song) => (
          <MusicCard
            key={song.trackId}
            albumCoverSmall={ song.artworkUrl60}
            albumCover={ song.artworkUrl100 }
            trackName={ song.trackName }
            previewUrl={ song.previewUrl }
            trackId={ song.trackId }
            trackNumber={ song.trackNumber }
            song={ song }
            fetchFavoriteSongs={ fetchFavoriteSongs }
          />
        ))}
        </section>
      </main>
      )}
      
    </div>
  )
}

export default Favorites;
