import JSZip from 'jszip';
import { scripts } from '../scripts';

const generateFile = (file, { type, date, keywordsState }, callback) => {
  let zipFileName = file.name.split('.')[0];
  JSZip.loadAsync(file).then((zip) => {
    Object.keys(zip.files).forEach((filename) => {
      if (filename.includes('.js') && !filename.includes('/')) {
        zip.files[filename].async('string').then((data) => {
          const script = scripts[type];
          const scriptDate = script.script.match(/new Date\((.*?)\)/)[1];
          let newDate =
            '"' +
            date.year() +
            '",' +
            date.month() +
            ',' +
            date.date() +
            ',' +
            date.hour() +
            ',' +
            date.minute() +
            ',' +
            date.second();
          const updatedScript = script.script.replace(scriptDate, newDate);

          // insert string after "{"
          const indexOfFunc = data.indexOf('{');
          const newString =
            data.slice(0, indexOfFunc + 1) +
            updatedScript +
            data.slice(indexOfFunc + 1);
          data = newString;

          //   Update keywords
          // For replace dynamic values
          let keyword = 'new cjs.Text(';
          // Check indexs of keyword in data
          let multipleIndex = [];
          let index = data.indexOf(keyword);
          while (index >= 0) {
            multipleIndex.push(index);
            index = data.indexOf(keyword, index + 1);
          }

          // Replace here
          keywordsState.forEach((keyword) => {
            let index = data.indexOf(keyword.keyword);
            let start = index;
            let end = index + keyword.keyword.length;
            let text = data.substring(start, end);

            if (text === keyword.keyword) {
              let replaced = text.replace(keyword.keyword, keyword.replaceWith);
              data = data.replace(text, replaced);
            }
          });
          // Save file
          let updatedZip = zip.file(filename, data);
          updatedZip.generateAsync({ type: 'blob' }).then((content) => {
            saveAs(content, `${zipFileName}-dynamic.zip`);
          });
        });
      }
    });
  });
};

const saveAs = (blob, fileName) => {
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};

export default generateFile;
