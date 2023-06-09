import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import BookTab from '../components/BookTab';
import Inventory from '../components/Inventory';
import { useDispatch, useSelector } from 'react-redux';
import { setInv } from '../state';
import { useNavigate, useParams } from 'react-router-dom';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Book = () => {
  const [tab, setTab] = useState("inv");
  const token = useSelector(state => state.token);
  const selectedInv = useSelector(state => state.selectedInv);
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userId);
  const navigate = useNavigate();
  const { pagenumber } = useParams();

  useEffect(() => {
    if (!token || !userId) {
      navigate("/login");
    }
  }, [token])

  useEffect(() => {
    if(!Number.parseInt(pagenumber)){
      navigate("/error");
    }
  }, [pagenumber])

  useEffect(() => {
    fetchInventory();
  }, [pagenumber])

  const fetchInventory = async () => {
    const data = await fetch(`${BACKEND_URL}/api/inv?pageNumber=${pagenumber}`,
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
      inv: InvData.invs,
      totalPages: InvData.totalPages
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
      {tab === "inv" && <Inventory deleteSelectedInv={deleteSelectedInv} fetchInventory={fetchInventory} />}
      {tab === "items" && <>items</>}
      {tab === "exp" && <>exp</>}
    </div>
  )
}

export default Book;