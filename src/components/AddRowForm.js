import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

function AddRowForm({ onAddRow, onCancel }) {
  const [formData, setFormData] = useState({
    blNumber: '',
    consignee: '',
    agent: '',
    pol: '',
    pod: '',
    end: '',
    instruction: '',
    payment: '',
    release: '',
    time: '',
    payable: '',
    due: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddRow(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {Object.keys(formData).map((key) => (
        <TextField
          key={key}
          name={key}
          label={key.charAt(0).toUpperCase() + key.slice(1)}
          value={formData[key]}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      ))}
      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">Add Row</Button>
        <Button variant="contained" color="secondary" onClick={onCancel} style={{ marginLeft: '10px' }}>Cancel</Button>
      </Box>
    </Box>
  );
}

export default AddRowForm;
