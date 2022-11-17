import { Grid, MenuItem, Select, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

const SpottedKeywordsList = ({
  list,
  replaceWithList,
  updateSpottedKeywords,
}) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h6">Spotted Keywords</Typography>
      </Grid>
      {list.map((item, index) => (
        <Item
          key={(item.keyword, index)}
          item={item.keyword}
          itemIndex={index}
          selectedReplacement={item.replaceWith}
          replaceWithList={replaceWithList}
          updateSpottedKeywords={updateSpottedKeywords}
        />
      ))}
    </Grid>
  );
};

const Item = ({
  item,
  replaceWithList,
  selectedReplacement,
  updateSpottedKeywords,
  itemIndex,
}) => {
  return (
    <Grid item xs={12}>
      <Stack direction={'row'} gap={2}>
        <Typography variant="body1">{item}</Typography>
        <Typography variant="caption">Replace With </Typography>
        <Select
          value={selectedReplacement}
          fullWidth
          size="small"
          onChange={(e) => {
            // setValue(e.target.value);
            updateSpottedKeywords(itemIndex, e.target.value);
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {Object.keys(replaceWithList).map((key) => (
            <MenuItem key={replaceWithList[key]} value={replaceWithList[key]}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </Grid>
  );
};

export default SpottedKeywordsList;
