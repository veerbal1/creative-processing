import { Card } from '@mui/material';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSnackbar } from 'notistack';

const DropZone = ({ handleDrop }) => {
  const { enqueueSnackbar } = useSnackbar();
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      handleDrop(acceptedFiles);
    } else {
      enqueueSnackbar('Kindly select .zip file', {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/zip': ['.zip'],
    },
  });

  return (
    <Card
      sx={{
        minHeight: '40vh',
        minWidth: '50vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      variant={isDragActive ? 'outlined' : 'elevation'}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p>Select a file or drag it here</p>
    </Card>
  );
};

export default DropZone;
