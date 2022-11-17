import React from 'react';
import JSZip from 'jszip';

const Creative = () => {
  const handleSelect = (e) => {
    const file = e.target.files[0];
    JSZip.loadAsync(file).then((zip) => {
      Object.keys(zip.files).forEach((filename) => {
        let content = zip.files[filename];
        console.log(filename, content);
      });
    });
  };
  return <input type="file" onChange={handleSelect} />;
};

export default Creative;
