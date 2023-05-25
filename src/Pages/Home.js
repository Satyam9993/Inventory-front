import React, { useEffect } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const token = useSelector(state => state.token);
  const userId = useSelector(state => state.userId);
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!token || !userId) {
      navigate("/login");
    }
  }, [token])


  return (
    <div>
      <Header />
      <Navbar />
    </div>
  )
}

export default Home;