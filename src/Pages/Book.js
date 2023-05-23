import React, { useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import BookTab from '../components/BookTab';

const Book = () => {
  const [tab, setTab] = useState("inv");

  return (
    <div>
      <Header />
      <Navbar />
      <BookTab setTab={setTab} tab={tab}/>
      {tab === "inv" && <>inv</>}
      {tab === "items" && <>items</>}
      {tab === "exp" && <>exp</>}
    </div>
  )
}

export default Book;