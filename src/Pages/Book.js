import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import BookTab from '../components/BookTab';
import Inventory from '../components/Inventory';
import AddInventory from '../components/AddInventory';
import { useDispatch, useSelector } from 'react-redux';
import { setInv } from '../state';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Book = () => {
  const [tab, setTab] = useState("inv");
  const token = useSelector(state => state.token);
  const dispatch = useDispatch();
  
  useEffect(() => {
    fetchInventory()
  }, [])

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
      <BookTab setTab={setTab} tab={tab}/>
      <AddInventory />
      {tab === "inv" && <Inventory /> }
      {tab === "items" && <>items</>}
      {tab === "exp" && <>exp</>}
    </div>
  )
}

export default Book;