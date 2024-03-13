import React from 'react';
import Header from './components/Header';
import { Tab } from 'bootstrap';
import Table from './components/Table';
import Calendar from './components/Calendar';
import { lastWeekday } from './utils/dateHelpers';


function App() {
  const [selectedDateISO, setSelectedDateISO] = React.useState(lastWeekday);
  return (
    <>
      <Header />
      <div className="py-4">
      <Table selectedDateISO={selectedDateISO}/>
      <Calendar setSelectedDateISO={setSelectedDateISO}/>
      </div>
    </>
  );
}

export default App;
