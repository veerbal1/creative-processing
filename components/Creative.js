import React from 'react';
import JSZip from 'jszip';
import { scripts } from './scripts';

const Creative = () => {
  const handleSelect = (e) => {
    const file = e.target.files[0];
    JSZip.loadAsync(file).then((zip) => {
      Object.keys(zip.files).forEach((filename) => {
        if (filename === 'Pro_Fight_League_Dynamic_v02_.js') {
          zip.files[filename].async('string').then((data) => {
            // Update script Date
            const script = scripts['day-hour-min'];
            const scriptDate = script.match(/new Date\((.*?)\)/)[1];
            // it is in 2022,10,23,20,0,0 format
            let date = new Date('2022-11-30T11:13:06.145Z');
            // convert to 2022,10,23,20,0,0 format
            date = dateFormat(date);
            console.log(date);
            const updatedScript = script.replace(scriptDate, date);
            // For adding countdown function code
            // insert string after "{"
            const indexOfFunc = data.indexOf('{');
            const newString =
              data.slice(0, indexOfFunc + 1) +
              updatedScript +
              data.slice(indexOfFunc + 1);
            data = newString;
            // console.log(newString);
            // For replace dynamic values
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
            });
            // Replace here
            spottedKeywords.forEach((keyword) => {
              let index = data.indexOf(keyword);
              let start = index;
              let end = index + keyword.length;
              let text = data.substring(start, end);
              console.log(text);

              if (text === '"24"') {
                let replaced = text.replace(keyword, 'leftDays.seconds');
                data = data.replace(text, replaced);
              } else if (text === '"16"') {
                let replaced = text.replace(keyword, 'leftDays.minutes');
                data = data.replace(text, replaced);
              } else if (text === '"8"') {
                let replaced = text.replace(keyword, 'leftDays.hours');
                data = data.replace(text, replaced);
              }
            });
            // Save file
            let updatedZip = zip.file(filename, data);
            updatedZip.generateAsync({ type: 'blob' }).then((content) => {
              saveAs(content, 'updated.zip');
            });
          });
        }
      });
    });
  };
  return <input type="file" onChange={handleSelect} />;
};

const saveAs = (blob, fileName) => {
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};

const dateFormat = (date) => {
  // convert to 2022,10,23,20,0,0 format
  return (
    date.getFullYear() +
    ',' +
    (date.getMonth() <= 9 ? '0' + date.getMonth() : date.getMonth()) +
    ',' +
    (date.getDate() <= 9 ? '0' + date.getDate() : date.getDate()) +
    ',' +
    (date.getHours() <= 9 ? '0' + date.getHours() : date.getHours()) +
    ',' +
    (date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes()) +
    ',' +
    (date.getSeconds() <= 9 ? '0' + date.getSeconds() : date.getSeconds())
  );
};
export default Creative;
