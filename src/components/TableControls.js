import React from 'react';
import './TableControls.css';
import { Box, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EmailIcon from '@mui/icons-material/Email';

function TableControls({ onAddRowClick }) {
  return (
    <Box className="table-controls">
      <IconButton><FilterListIcon /></IconButton>
      <IconButton onClick={onAddRowClick}><AddIcon /></IconButton>
      <IconButton><SortIcon /></IconButton>
      <IconButton><ViewModuleIcon /></IconButton>
      <IconButton><CheckBoxIcon /></IconButton>
      <IconButton><EmailIcon /></IconButton>
    </Box>
  );
}

export default TableControls;
