import React from 'react';
import Header from './components/Header';
import { Tab } from 'bootstrap';
import Table from './components/Table';
import Calendar from './components/Calendar';


function App() {
  return (
    <>
      <Header />
      <div className='py-4'>
      <Table />
      <Calendar />
      </div>
    </>
  );
}

export default App;
