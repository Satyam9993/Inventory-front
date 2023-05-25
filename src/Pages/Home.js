import React, { useEffect } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setInv } from '../state';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Home = () => {
  const token = useSelector(state => state.token);
  const userId = useSelector(state => state.userId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token || !userId) {
      navigate("/login");
    }
  }, [token])

  useEffect(() => {
    if(token && userId) {
    fetchInventory()
    }
  }, [token])

  const fetchInventory = async () => {
    const data = await fetch(`${BACKEND_URL}/api/inv`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    );
    const InvData = await data.json();
    dispatch(setInv({
      inv : InvData.invs
    }))
  }

  return (
    <div>
      <Header />
      <Navbar />
    </div>
  )
}

export default Home;