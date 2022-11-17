import { Card, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSnackbar } from 'notistack';

const DropZone = ({ handleDrop }) => {
  const { enqueueSnackbar } = useSnackbar();
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      handleDrop(acceptedFiles);
      enqueueSnackbar('File dropped successfully', {
        variant: 'success',
        autoHideDuration: 2000,
      });
    } else {
      enqueueSnackbar('Kindly select .zip file', {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      'application/zip': ['.zip'],
    },
  });

  return (
    <Card
      sx={{
        minHeight: '30vh',
        // minWidth: '50vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      variant={isDragActive ? 'outlined' : 'elevation'}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Typography
        variant="body1"
        sx={{
          textAlign: 'center',
          color: isDragReject
            ? 'error.main'
            : isDragAccept
            ? 'success.main'
            : 'text.primary',
        }}
      >
        {isDragReject
          ? 'File type not supported'
          : isDragAccept
          ? 'Drop the file here'
          : 'Drag and drop .zip file here, or click to select file'}
      </Typography>
    </Card>
  );
};

export default DropZone;
