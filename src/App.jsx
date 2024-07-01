import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authservice from './appwrite/auth';
import { login, logout } from './store/authSlice';
import './CSS/Loader.css'
import { Footer, Header } from './components/Index';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authservice.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        }
        else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false))
  }, [])
  if (loading) {

    return (
      <div className="my-loader">
        <div className="rubiks-cube">
          <div className="face front">
            <div style={{ background: '#ff3d00' }} className="cube"></div>
            <div style={{ background: '#ffeb3b' }} className="cube"></div>
            <div style={{ background: '#4caf50' }} className="cube"></div>
            <div style={{ background: '#2196f3' }} className="cube"></div>
            <div style={{ background: '#ffffff' }} className="cube"></div>
            <div style={{ background: '#ffeb3b' }} className="cube"></div>
            <div style={{ background: '#4caf50' }} className="cube"></div>
            <div style={{ background: '#2196f3' }} className="cube"></div>
            <div style={{ background: '#ff3d00' }} className="cube"></div>
          </div>
          <div className="face back">
            <div style={{ background: '#4caf50' }} className="cube"></div>
            <div style={{ background: '#ff3d00' }} className="cube"></div>
            <div style={{ background: '#ffeb3b' }} className="cube"></div>
            <div style={{ background: '#2196f3' }} className="cube"></div>
            <div style={{ background: '#ffffff' }} className="cube"></div>
            <div style={{ background: '#ff3d00' }} className="cube"></div>
            <div style={{ background: '#ffeb3b' }} className="cube"></div>
            <div style={{ background: '#4caf50' }} className="cube"></div>
            <div style={{ background: '#2196f3' }} className="cube"></div>
          </div>
          <div className="face left">
            <div style={{ background: '#ffeb3b' }} className="cube"></div>
            <div style={{ background: '#4caf50' }} className="cube"></div>
            <div style={{ background: '#2196f3' }} className="cube"></div>
            <div style={{ background: '#ff3d00' }} className="cube"></div>
            <div style={{ background: '#ffffff' }} className="cube"></div>
            <div style={{ background: '#4caf50' }} className="cube"></div>
            <div style={{ background: '#2196f3' }} className="cube"></div>
            <div style={{ background: '#ffeb3b' }} className="cube"></div>
            <div style={{ background: '#ff3d00' }} className="cube"></div>
          </div>
          <div className="face right">
            <div style={{ background: '#4caf50' }} className="cube"></div>
            <div style={{ background: '#ff3d00' }} className="cube"></div>
            <div style={{ background: '#ffeb3b' }} className="cube"></div>
            <div style={{ background: '#2196f3' }} className="cube"></div>
            <div style={{ background: '#ffffff' }} className="cube"></div>
            <div style={{ background: '#ff3d00' }} className="cube"></div>
            <div style={{ background: '#ffeb3b' }} className="cube"></div>
            <div style={{ background: '#4caf50' }} className="cube"></div>
            <div style={{ background: '#2196f3' }} className="cube"></div>
          </div>
          <div className="face top">
            <div style={{ background: '#2196f3' }} className="cube"></div>
            <div style={{ background: '#ffeb3b' }} className="cube"></div>
            <div style={{ background: '#ff3d00' }} className="cube"></div>
            <div style={{ background: '#4caf50' }} className="cube"></div>
            <div style={{ background: '#ffffff' }} className="cube"></div>
            <div style={{ background: '#ffeb3b' }} className="cube"></div>
            <div style={{ background: '#ff3d00' }} className="cube"></div>
            <div style={{ background: '#4caf50' }} className="cube"></div>
            <div style={{ background: '#2196f3' }} className="cube"></div>
          </div>
          <div className="face bottom">
            <div style={{ background: '#ffffff' }} className="cube"></div>
            <div style={{ background: '#4caf50' }} className="cube"></div>
            <div style={{ background: '#2196f3' }} className="cube"></div>
            <div style={{ background: '#ff3d00' }} className="cube"></div>
            <div style={{ background: '#ffeb3b' }} className="cube"></div>
            <div style={{ background: '#4caf50' }} className="cube"></div>
            <div style={{ background: '#2196f3' }} className="cube"></div>
            <div style={{ background: '#ffffff' }} className="cube"></div>
            <div style={{ background: '#ff3d00' }} className="cube"></div>
          </div>
        </div>
      </div>
    );

  }
  else
    return (
      <div className=' min-h-screen  flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
    )
}

export default App
