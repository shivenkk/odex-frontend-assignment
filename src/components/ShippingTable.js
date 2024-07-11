import React, { useState } from 'react';
import './ShippingTable.css';
import {
  Box, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Checkbox, IconButton,
  Pagination, Typography, Tooltip
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DownloadIcon from '@mui/icons-material/GetApp';

function ShippingTable({ searchTerm, data }) {
  const [selected, setSelected] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((item) => item.blNumber);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (blNumber) => {
    const selectedIndex = selected.indexOf(blNumber);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, blNumber);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (blNumber) => selected.indexOf(blNumber) !== -1;

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const filteredData = sortedData.filter(item =>
    item.blNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.consignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.pol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.pod.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.end.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.instruction.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.payment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.release.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.payable.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.due.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className="shipping-table-container">
      <TableContainer component={Paper} className="shipping-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < data.length}
                  checked={data.length > 0 && selected.length === data.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell><EmailIcon /></TableCell>
              {['blNumber', 'consignee', 'agent', 'pol', 'pod', 'end', 'instruction', 'payment', 'release', 'time', 'payable', 'due'].map((key) => (
                <TableCell key={key} onClick={() => handleSort(key)}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}{' '}
                  {sortConfig.key === key ? (
                    sortConfig.direction === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
                  ) : null}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index} selected={isSelected(row.blNumber)}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected(row.blNumber)}
                    onChange={() => handleCheckboxClick(row.blNumber)}
                  />
                </TableCell>
                <TableCell><EmailIcon /></TableCell>
                <TableCell>{row.blNumber}</TableCell>
                <TableCell>{row.consignee}</TableCell>
                <TableCell>{row.agent}</TableCell>
                <TableCell>{row.pol}</TableCell>
                <TableCell>{row.pod}</TableCell>
                <TableCell>{row.end}</TableCell>
                <TableCell className="instruction">{row.instruction}</TableCell>
                <TableCell className="payment">{row.payment}</TableCell>
                <TableCell className="release">{row.release}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.payable}</TableCell>
                <TableCell>{row.due}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography>1 to {filteredData.length} of {filteredData.length} items</Typography>
        <Pagination count={10} />
        <Box>
          <Tooltip title="Download PDF">
            <IconButton>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download CSV">
            <IconButton>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

export default ShippingTable;
