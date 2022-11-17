import { Collapse, Container, Grid } from '@mui/material';
import React, { useCallback } from 'react';
import DateTimeSelector from './DateTimeSelector';
import DropZone from './DropZone';
import TypeSelector from './TypeSelector';
import { SnackbarProvider } from 'notistack';
import extractKeywords from './utils/extractKeywords';
import SpottedKeywordsList from './SpottedKeywordsList';
import { scripts } from './scripts';
import dayjs from 'dayjs';
import GenerateButton from './GenerateButton';

const creativeTypes = {
  'day-hour-min': 'Day-Hour-Min',
  // 'hour-min-sec': 'Hour-Min-Sec',
};

const App = () => {
  const [type, setType] = React.useState('');
  const [spottedKeywords, setSpottedKeywords] = React.useState([]);
  const [endDate, setEndDate] = React.useState(dayjs(new Date()));
  const [droppedFile, setDroppedFile] = React.useState(null);

  const updateSpottedKeywords = useCallback((index, value) => {
    setSpottedKeywords((prev) => {
      const newList = [...prev];
      newList[index].replaceWith = value;
      return newList;
    });
  }, []);
  console.log('date', endDate);

  const handleDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    setDroppedFile(acceptedFiles[0]);
    extractKeywords(acceptedFiles[0]).then((keywords) => {
      let array = keywords.map((keyword) => {
        return {
          keyword,
          replaceWith: '',
        };
      });
      setSpottedKeywords(array);
    });
  };

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
      <SnackbarProvider>
        <Grid container spacing={2}>
          <Grid item xs={6}>
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
                  <DateTimeSelector date={endDate} setDate={setEndDate} />
                </Collapse>
              </Grid>
              <Grid item xs={12}>
                <Collapse in={type !== ''}>
                  <DropZone handleDrop={handleDrop} />
                </Collapse>
              </Grid>
            </Grid>
          </Grid>
          {/* Right section */}
          <Grid item xs={6}>
            <Collapse in={spottedKeywords.length > 0}>
              <Grid container spacing={2}>
                {type !== '' ? (
                  <Grid item xs={12}>
                    <SpottedKeywordsList
                      list={spottedKeywords}
                      replaceWithList={scripts[type].keywords}
                      updateSpottedKeywords={updateSpottedKeywords}
                    />
                  </Grid>
                ) : null}
                <Grid item xs={12}>
                  <GenerateButton
                    type={type}
                    date={endDate}
                    file={droppedFile}
                    keywordsState={spottedKeywords}
                  />
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Grid>
      </SnackbarProvider>
    </Container>
  );
};

export default App;
