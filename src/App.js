import React, { useState } from 'react';
import './App.css';
import { Box, CssBaseline } from '@mui/material';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TableControls from './components/TableControls';
import ShippingTable from './components/ShippingTable';
import AddRowForm from './components/AddRowForm';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('table'); // 'table' or 'add'
  const [data, setData] = useState([
    { blNumber: 'HLCUMEA210402069', consignee: 'Kerry Logistics (USA) GMBH', agent: 'Meest-America, Inc', pol: 'Jebel ali', pod: 'New York', end: 'Philadelphia', instruction: 'Requested', payment: 'Paid', release: 'Released', time: '25-01-16 02:10', payable: 'USD 845.34', due: '' },
    { blNumber: 'HLCUMEA210402056', consignee: 'Sarfo Kwasi', agent: 'Meest-America, Inc', pol: 'Nhava Sheva', pod: 'Houston', end: 'Austin', instruction: 'Overdue', payment: 'Due', release: '', time: '25-01-23 05:40', payable: 'USD 730.02', due: 'USD 730.02' },
    { blNumber: 'HLCUMEA210402035', consignee: 'Sarfo Kwasi', agent: 'Edward J. Zarach & Associates', pol: 'Singapore', pod: 'Long Beach', end: 'Pasadena', instruction: 'Completed', payment: 'Pmt Initiated', release: '', time: '25-01-23 05:20', payable: 'USD 1000', due: 'USD 500' },
    { blNumber: 'HLCUMEA210402080', consignee: 'Rose Opokuah Odame Asante', agent: 'Brauner International', pol: 'Jakarta', pod: 'Los Angeles', end: 'Nevada', instruction: 'Completed', payment: 'Paid', release: 'Released', time: '25-01-23 05:20', payable: 'USD 1000', due: 'USD 500' },
  ]);

  const handleAddRow = (newRow) => {
    setData(prevData => [...prevData, newRow]);
    setView('table');
  };

  return (
    <Box display="flex">
      <CssBaseline />
      <Sidebar />
      <Box flexGrow={1} className="main-content">
        <Header onSearch={(term) => setSearchTerm(term)} />
        {view === 'table' && (
          <>
            <TableControls onAddRowClick={() => setView('add')} />
            <ShippingTable searchTerm={searchTerm} data={data} />
          </>
        )}
        {view === 'add' && (
          <AddRowForm onAddRow={handleAddRow} onCancel={() => setView('table')} />
        )}
      </Box>
    </Box>
  );
}

export default App;
