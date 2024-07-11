import React from 'react';
import './Header.css';
import { AppBar, Toolbar, Typography, Box, MenuItem, Select, TextField, Avatar } from '@mui/material';

function Header({ onSearch }) {
  return (
    <AppBar position="static" color="default" elevation={1} className="header">
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <img src="Logo.png" alt="Logo" className="logo" />  {/* Replace with actual logo path */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 0, marginRight: 2 }}>
            Carrier
          </Typography>
          <Select defaultValue="" displayEmpty inputProps={{ 'aria-label': 'Without label' }} style={{ marginRight: 16 }}>
            <MenuItem value=""><em>Select Carrier</em></MenuItem>
            <MenuItem value="Hapag Lloyd">Hapag Lloyd</MenuItem>
            {/* Add more options as needed */}
          </Select>
          <TextField
            variant="outlined"
            size="small"
            placeholder="BL Search..."
            InputProps={{ style: { borderRadius: 20 } }}
            onChange={(e) => onSearch(e.target.value)}
          />
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" sx={{ marginRight: 2 }}>
            Credit Balance: USD 600.00
          </Typography>
          <Avatar alt="Test User" src="/static/images/avatar/1.jpg" />
          <Typography variant="body1" sx={{ marginLeft: 1 }}>
            Test User
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
