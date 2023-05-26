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
  const selectedInv = useSelector(state => state.selectedInv);
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
      inv: InvData.invs
    }))
  }

  const deleteSelectedInv = async () => {
    if (selectedInv.length !== 0) {
      if(window.confirm('Are you sure you want to delete')){

        const body = {
          ids : selectedInv
        };
        const data = await fetch(`${BACKEND_URL}/api/inv`,
          {
            method: 'DELETE',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
          }
        );
        const InvData = await data.json();
        if(InvData){
          fetchInventory();
        }
      }
    }
  };

  return (
    <div>
      <Header />
      <Navbar />
      <BookTab setTab={setTab} tab={tab} />
      <div className='flex justify-end'>
        <div className='mx-2'>
          <button className='p-2 border border-gray-300 rounded-md text-sm hover:text-blue-500 hover:bg-gray-100' onClick={deleteSelectedInv} >Delete</button>
        </div>
        <div className='mx-2 mr-4'>
          <AddInventory />
        </div>
      </div>
      {tab === "inv" && <Inventory />}
      {tab === "items" && <>items</>}
      {tab === "exp" && <>exp</>}
    </div>
  )
}

export default Book;