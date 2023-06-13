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
  // console.log({unixDate});
  

  // console.log()
  const prettyDate = format(unixDate, 'MMM Lo, yyyy')
  return prettyDate
}

export function formatHours(time:string){
  return time.replace('.00', '')
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

export enum DATE_OPTION {
  DAY = 'day',
  TIME = 'time',
  FULL = 'full',
}

export function datePrettyLocal(date:string, option:DATE_OPTION) {
  // console.log('pretty date input, ', date);
  
  let options = {}
  switch (option) {
    case DATE_OPTION.FULL:
      options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        // timeZone: 'UTC', 
        // timeZone: "America/Chicago",
        timeZoneName: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: true
      };
      break;
  
    default:
      break;
  }

  const newDate = new Date(date);

  // @ts-ignore
  return newDate.toLocaleString("en-US", options);
}

export function dateLocaleFileName(dateString:string){
  const date = new Date(dateString)
  // console.log(date.toLocaleString('en-CA', {hour12:false}));
  
  return date.toLocaleString('en-CA', {hour12:false})
}

export function datePrettyLocalDay(date:string) {
  const options = {
    year: "numeric",
    month: "short",
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

export function datePrettyLocalDayShort(date:string) {
  const options = {
    // year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: 'UTC', 
  };

  const newDate = new Date(date);

  // @ts-ignore
  return newDate.toLocaleDateString("en-US", options);
}

export function datePrettyLocalTime(date:string) {
  const options = {
    // year: "numeric",
    // month: "long",
    // day: "numeric",
    // timeZone: 'UTC', 
    // timeZone: "America/Chicago",
    // timeZoneName: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  };

  const newDate = new Date(date);

  // @ts-ignore
  return newDate.toLocaleTimeString("en-US", options);
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

export function calcDurationHuman(decimal:string){
  const inputHours = Number(decimal)
  let hours = Math.floor(inputHours)
  let minutes = Math.round((inputHours - hours) * 60)

  let humanHours    = `${hours} hour${hours !== 1 ? 's' : ''}`
  let humanMinutes  = `${minutes} minute${minutes !== 1 ? 's' : ''}`

  if(hours > 0    && minutes === 0) return humanHours
  if(hours === 0  && minutes   > 0) return humanMinutes
  if(hours > 0  && minutes   > 0) return humanHours + ' ' + humanMinutes

  if(!hours && !minutes) return undefined
  return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
}