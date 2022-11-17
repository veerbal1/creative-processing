import JSZip from 'jszip';

const extractKeywords = (file) => {
  return new Promise((resolve, reject) => {
    JSZip.loadAsync(file).then((zip) => {
      Object.keys(zip.files).forEach((filename) => {
        // if filename contains .js without '/'
        if (filename.includes('.js') && !filename.includes('/')) {
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
            });
            resolve(spottedKeywords);
          });
        }
      });
    });
  });
};

export default extractKeywords;
