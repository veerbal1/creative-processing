import { Card } from '@mui/material';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const DropZone = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Card
      sx={{
        minHeight: '40vh',
        width: '50%',
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
