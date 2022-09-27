import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';
import Album from './pages/Album/Album';
import Favorites from './pages/Favorites/Favorites';
import Profile from './pages/Profile/Profile';
import ProfileEdit from './pages/ProfileEdit/ProfileEdit';
import NotFound from './pages/NotFound/NotFound';
import './global.css'

function App() {
  return (
    <div>    
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/album/:id" element={<Album />} />
        <Route exact path="/favorites" element={<Favorites />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/profile/edit" element={<ProfileEdit />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
