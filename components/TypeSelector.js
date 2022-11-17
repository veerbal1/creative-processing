import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

const TypeSelector = ({ list, state, handleChange }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Age</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={state}
        label="Age"
        onChange={(e) => handleChange(e.target.value)}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {Object.keys(list).map((key) => (
          <MenuItem key={key} value={key}>
            {list[key]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TypeSelector;
