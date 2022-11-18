export const scripts = {
  'hour-min-sec': {
    script:
      'const stopDateTime=new Date(2022,10,23,20,0,0);function convertTimeZone(e,t){return new Date(("string"==typeof e?new Date(e):e).toLocaleString("en-US",{timeZone:t}))}function getLeftDays(e,t){t=Math.max(t-e,0),e=Math.floor(t/864e5);return{hours:Math.floor(t/36e5%24)+24*e,minutes:Math.floor(t/6e4%60),seconds:Math.floor(t/1e3%60)}}function convertTimeZone(e,t){return new Date(("string"==typeof e?new Date(e):e).toLocaleString("en-US",{timeZone:t}))}console.log(stopDateTime);var currentDateTimeNY=convertTimeZone(new Date,"America/New_York"),leftDays=getLeftDays(currentDateTimeNY,stopDateTime);',
    keywords: {
      hours: 'leftDays.hours',
      minutes: 'leftDays.minutes',
      seconds: 'leftDays.seconds',
    },
  },
  'day-hour-min': {
    script:
      'const stopDateTime=new Date(2022,10,23,20,0,0);function convertTimeZone(e,t){return new Date(("string"==typeof e?new Date(e):e).toLocaleString("en-US",{timeZone:t}))}function getLeftDays(e,t){e=Math.max(t-e,0);return{days:Math.floor(e/864e5),hours:Math.floor(e/36e5%24),minutes:Math.floor(e/6e4%60),seconds:Math.floor(e/1e3%60)}}function convertTimeZone(e,t){return new Date(("string"==typeof e?new Date(e):e).toLocaleString("en-US",{timeZone:t}))}console.log(stopDateTime);var currentDateTimeNY=convertTimeZone(new Date,"America/New_York"),leftDays=getLeftDays(currentDateTimeNY,stopDateTime);',
    keywords: {
      days: 'leftDays.days',
      hours: 'leftDays.hours',
      minutes: 'leftDays.minutes',
    },
  },
};
