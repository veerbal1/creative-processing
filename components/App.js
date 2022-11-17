import { Collapse, Container, Grid } from '@mui/material';
import React from 'react';
import DateTimeSelector from './DateTimeSelector';
import DropZone from './DropZone';
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TypeSelector
            state={type}
            handleChange={setType}
            list={creativeTypes}
          />
        </Grid>
        <Grid item xs={12}>
          <Collapse in={type !== ''}>
            <DateTimeSelector />
          </Collapse>
        </Grid>
        <Grid item xs={12}>
          <Collapse in={type !== ''}>
            <DropZone handleDrop={() => null} />
          </Collapse>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
