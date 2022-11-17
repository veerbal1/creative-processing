import { Button } from '@mui/material';
import React from 'react';
import generateFile from './utils/generateFile';

const GenerateButton = ({ type, date, keywordsState, file }) => {
  const [loading, setLoading] = React.useState(false);
  const handleClick = () => {
    setLoading(true);
    generateFile(file, { type, date, keywordsState }, () => {
      setLoading(false);
    });
  };
  return (
    <Button
      // disabled={loading}
      variant="contained"
      size="small"
      sx={{
        textTransform: 'none',
      }}
      onClick={handleClick}
    >
      {loading ? 'Generating...' : 'Generate'}
    </Button>
  );
};

export default GenerateButton;
