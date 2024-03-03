import React from 'react';
import Header from './components/Header';
import { Tab } from 'bootstrap';
import Table from './components/Table';

function App() {
  return (
    <>
      <Header />
      <div className='py-4'>
      <Table />
      </div>
    </>
  );
}

export default App;
