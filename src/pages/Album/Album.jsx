import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { Loading } from '../../components/Loading/Loading';
import MusicCard from '../../components/MusicCard/MusicCard';
import getMusics from '../../services/musicsAPI';
import styles from './Album.module.css';

export function Album() {
  const [artistInfo, setArtistInfo] = useState({});
  const [albumInfo, setAlbumInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  
  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    setLoading(true);
    const response = await getMusics(id);
    setArtistInfo(response[0]);
    setAlbumInfo(response);
    setLoading(false);
  };
  
  return (
    <div>
      <Header />
      {loading && <Loading />}
      <main className={styles.albumContainer}>
        <section className={styles.container}>
          <div className={styles.artistInfo}>
            <img src={artistInfo.artworkUrl100}></img>
            <h4>{artistInfo.collectionName}</h4>
          </div>
          <section className={styles.mainContainer}>            
            {albumInfo.filter((song) => song.kind === 'song').map((song) => (
              <MusicCard
              key={ song.trackId }
              albumCover={ song.artworkUrl100 }
              trackName={ song.trackName }
              previewUrl={ song.previewUrl }
              trackId={ song.trackId }
              trackNumber={ song.trackNumber }
              song={ song }
            />
            ))}
          </section>
        </section>
      </main>
    </div>
  )
}

export default Album;
