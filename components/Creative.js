import React from 'react';
import JSZip from 'jszip';

const Creative = () => {
  const handleSelect = (e) => {
    const file = e.target.files[0];
    JSZip.loadAsync(file).then((zip) => {
      Object.keys(zip.files).forEach((filename) => {
        if (filename === 'Pro_Fight_League_Dynamic_v02_.js') {
          zip.files[filename].async('string').then((data) => {
            let keyword = 'new cjs.Text(';
            // Check indexs of keyword in data
            let multipleIndex = [];
            let index = data.indexOf(keyword);
            while (index >= 0) {
              multipleIndex.push(index);
              index = data.indexOf(keyword, index + 1);
            }
            // console.log(multipleIndex);
            multipleIndex.forEach((index) => {
              let start = index + keyword.length;
              let end = data.indexOf(',', start);
              let text = data.substring(start, end);
              console.log(start, end, text);
            });
          });
        }
      });
    });
  };
  return <input type="file" onChange={handleSelect} />;
};

export default Creative;
