import { Container } from '@mui/material';
import React from 'react';
import TypeSelector from './TypeSelector';

const creativeTypes = {
  'day-hour-min': 'Day-Hour-Min',
  'hour-min-sec': 'Hour-Min-Sec',
};

const App = () => {
  const [type, setType] = React.useState('');
  
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <TypeSelector state={type} handleChange={setType} list={creativeTypes} />
    </Container>
  );
};

export default App;
