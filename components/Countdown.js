import { Typography } from '@mui/material';
import React, { memo, useEffect, useMemo } from 'react';

function convertTimeZone(e, t) {
  return new Date(
    ('string' == typeof e ? new Date(e) : e).toLocaleString('en-US', {
      timeZone: t,
    })
  );
}
function getLeftDays(e, t) {
  e = Math.max(t - e, 0);
  return {
    days: Math.floor(e / 864e5),
    hours: Math.floor((e / 36e5) % 24),
    minutes: Math.floor((e / 6e4) % 60),
    seconds: Math.floor((e / 1e3) % 60),
    totalHours: Math.floor((e / 36e5) % 24) + 24 * Math.floor(e / 864e5),
  };
}
//   leftDays = getLeftDays(currentDateTimeNY, stopDateTime);

const Countdown = memo(function CountDown({ date, type }) {
  console.log('type', type);
  const stopDateTime = useMemo(() => {
    return date;
  }, [date]);

  const [leftDays, setLeftDays] = React.useState(
    getLeftDays(new Date(), stopDateTime)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newYorkTime = convertTimeZone(new Date(), 'America/New_York');
      setLeftDays(getLeftDays(newYorkTime, stopDateTime));
    }, 1e3);
    return () => clearInterval(interval);
  }, [stopDateTime]);
  return (
    <Typography
      variant="h4"
      component="h1"
      gutterBottom
      align="center"
      color="textSecondary"
    >
      Duration Left:{' '}
      {type === 'day-hour-min'
        ? `${leftDays.days} days ${leftDays.hours} hours ${leftDays.minutes} minutes`
        : `${leftDays.totalHours} hours ${leftDays.minutes} minutes ${leftDays.seconds} seconds`}
    </Typography>
  );
});

export default Countdown;
