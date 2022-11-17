import { Grid, MenuItem, Select, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

const SpottedKeywordsList = ({ list }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h6">Spotted Keywords</Typography>
      </Grid>
      {list.map((item, index) => (
        <Item key={(item, index)} item={item} />
      ))}
    </Grid>
  );
};

const Item = ({ item }) => {
  return (
    <Grid item xs={12}>
      <Stack direction={'row'} gap={2}>
        <Typography variant="body1">{item}</Typography>
        <Select value="1" fullWidth size="small">
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
        </Select>
      </Stack>
    </Grid>
  );
};

export default SpottedKeywordsList;
