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

            let spottedKeywords = [];
            multipleIndex.forEach((index) => {
              let start = index + keyword.length;
              let end = data.indexOf(',', start);
              let text = data.substring(start, end);
              spottedKeywords.push(text);
              console.log(data.substring(start - 5, end + 5));
            });

            console.log('spottedKeywords', spottedKeywords);
            // Replace here
            spottedKeywords.forEach((keyword) => {
              let index = data.indexOf(keyword);
              let start = index;
              let end = index + keyword.length;
              let text = data.substring(start, end);
              let replaced = text.replace(
                keyword,
                'Math.floor(Math.random() * 100)'
              );
              data = data.replace(text, replaced);
            });
            console.log('data', data);
          });
        }
      });
    });
  };
  return <input type="file" onChange={handleSelect} />;
};

export default Creative;
