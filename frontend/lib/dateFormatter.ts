import { format } from 'date-fns'

export function datePretty(date: string) {

  // console.log(date);
  if (!date) return 'NO DATE'
  
  // const options = {
  //   year: 'numeric', 
  //   month: 'long', 
  //   day: 'numeric', 
  //   timeZone: 'America/Chicago', 
  //   timeZoneName: 'short', 
  //   // hour: 'numeric',
  //   // minute: 'numeric',
  //   // hour12: true,
  // }

  // const dateObj = new Date(date)
  // return dateObj.toLocaleTimeString('en-US', options);

  const unixDate = Date.parse(date)
  console.log({unixDate});
  

  // console.log()
  const prettyDate = format(unixDate, 'MMM Lo, yyyy')
  return prettyDate
}

function datePrettyLocalFull(date:string) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
    timeZoneName: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  };

  const newDate = new Date(date);

  // @ts-ignore
  return newDate.toLocaleTimeString("en-US", options);
}

export function datePrettyLocalDay(date:string) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: 'UTC', 
    // timeZone: "America/Chicago",
    // timeZoneName: "short",
    // hour: "numeric",
    // minute: "numeric",
    // hour12: true
  };

  const newDate = new Date(date);

  // @ts-ignore
  return newDate.toLocaleDateString("en-US", options);
}

export function timePretty(time: string) {
  const newDate = new Date()
  const hours = time.split(':')[0]
  const mins = time.split(':')[1]

  newDate.setHours(Number(hours), Number(mins))

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

  // @ts-ignore
  const timeString = newDate.toLocaleTimeString('en-US', options);
  const lowCaps = timeString.replace('AM', 'am').replace('PM', 'pm')

  return lowCaps
}