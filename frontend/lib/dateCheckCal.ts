

type DateRange ={
  start: string,
  end: string,
}

export function calcTimeOverlap(range1:DateRange, range2:DateRange){
  // Convert input date strings to Date objects
  const start1 = new Date(range1.start)
  const end1 = new Date(range1.end)
  const start2 = new Date(range2.start)
  const end2 = new Date(range2.end)

  // Check if the date ranges overlap
  if (start1 <= end2 && end1 >= start2) {
    // Calculate the start and end times of the overlapping range
    const overlapStart  = start1 < start2 ? start2 : start1
    const overlapEnd    = end1 < end2 ? end1 : end2

    // Return the time of day as a string in HH:MM format
    return {
      start: overlapStart.getHours().toString().padStart(2, '0') + ':' + overlapStart.getMinutes().toString().padStart(2, '0'),
      end: overlapEnd.getHours().toString().padStart(2, '0') + ':' + overlapEnd.getMinutes().toString().padStart(2, '0'),
    }
  } else {
    // No overlap, return null
    return null;
  }
}

// ! filter out employees vacation days by time slots
export function filterTimeAvail(date:string, times:string[], range:DateRange, duration:string){
  // console.log({range});
  console.log({times});
  
  // const dateChosen = new Date(date)
  // const d = date.split('-')
  // const n = d.map(Number)
  // console.log({n});
  
  // const dateChosen = new Date(Date.UTC(n[0], n[1], n[2]))
  // console.log({dateChosen});
  
  
  const rangeStart = new Date(range.start)
  const rangeEnd = new Date(range.end)
  
  // console.table({
  //   chosen: new Date(date),
  //   rangeStart
  // })
  // console.table({
  //   chosen: new Date(date),
  //   rangeEnd: new Date(range.end)
  // })
  let filteredTimes = []
  if(date === rangeStart.toLocaleDateString('en-CA')){
    // console.table({
    //   date,
    //   rangeStart: rangeStart.toLocaleDateString('en-CA'),
    // })

    const newTimes = times.filter(time => {
      const [hours, minutes, seconds] = time.split(":")
      const timeDate = new Date(range.start)
      timeDate.setHours(Number(hours))
      timeDate.setMinutes(Number(minutes))
      timeDate.setSeconds(Number(seconds))
      
      return timeDate < rangeStart
      // return timeDate < rangeStart || timeDate > endOfDay(range.start)
    })

    // console.log({times})
    // console.log({filteredTimes})
    
  
    filteredTimes.push(...newTimes)
    
    // const overlapSlots = filterServiceTimeSlots(range.start, endOfDay(range.start), duration)
    // console.log({overlapSlots});
    // return times.filter(el => overlapSlots.includes(el));
  }

  // todo haven't set up end date avail
  if(date === rangeEnd.toLocaleDateString('en-CA')){
    // console.log('these days match range.end')
    // console.table({
    //   date,
    //   rangeEnd: rangeEnd.toLocaleDateString('en-CA'),
    // })

    const newTimes = times.filter(time => {
      const [hours, minutes, seconds] = time.split(":")
      const timeDate = new Date(range.end)
      timeDate.setHours(Number(hours))
      timeDate.setMinutes(Number(minutes))
      timeDate.setSeconds(Number(seconds))
      
      return timeDate > rangeEnd
      // return timeDate < rangeStart || timeDate > endOfDay(range.start)
    })

    filteredTimes.push(...newTimes)
  }

  if(filteredTimes.length > 0){
    console.log({filteredTimes})
    return filteredTimes
    
  } else {
    console.log({times})
    return times
  }

  // // console.log({times});
  // const timeInterval = Number(duration) * 60;

  // // find time blocks that land inside of vacation times

  // const startDate = new Date(range.start);
  // const endDate = new Date(range.end);
  // const startLocal = new Date(startDate.getTime())
  // const startLocalMin = (startLocal.getHours() * 60) + startLocal.getMinutes()
  // const endLocal = new Date(endDate.getTime())
  // const endLocalMin = (endLocal.getHours() * 60) + endLocal.getMinutes()
  
  // // const startTimeUTC  =  startUTC.getUTCHours() * 3600000 + startUTC.getUTCMinutes() * 60000 
  // // // const endTimeUTC    =  endUTC.getUTCHours() * 3600000 + endUTC.getUTCMinutes() * 60000 + startUTC.getUTCSeconds() * 1000 + endUTC.getUTCMilliseconds();
  // // const endTimeUTC    =  endUTC.getUTCHours() * 3600000 + endUTC.getUTCMinutes() * 60000

  // // if start is > 00:00:00.000Z -- dont blackout date, configure times
  // if(startLocalMin > 0){
  //   // todo set startDate one day later and 00:00
  //   startDate.setDate(startDate.getDate() + 1) // do not include partial vacation day, move to next day, zero time
  //   startDate.setHours(0); startDate.setMinutes(0); startDate.setSeconds(0); startDate.setMilliseconds(0);
  //   // console.table({
  //   //   startDate,
  //   //   startLocal,
  //   //   startLocalMin,
  //   //   message: 'begins later than midnight on this day'
  //   // })

  // } else {
  //   // console.table({
  //   //   startDate,
  //   //   startLocal,
  //   //   startLocalMin,
  //   //   message: 'starts at the top of the day'
  //   // })
  // }

  // if(endLocalMin > 1439){
  //   // console.table({
  //   //   endDate,
  //   //   endLocal,
  //   //   endLocalMin,
  //   //   message: 'rolls into the next day a 24 hour day'
  //   // })

  // } else {
  //   // console.table({
  //   //   endDate,
  //   //   endLocal,
  //   //   endLocalMin,
  //   //   message: 'ends on or before 23:59 of this day'
  //   // })

  // }
  
  // // console.log({serviceTimes})
  // const dateStart = new Date(range.start)
  // // console.log({dateStart});
  
  // const localTime = dateStart.toLocaleTimeString("en-US", { hour12: false });
  // // console.log({localTime});
  
  // // const hours = localTime.substr(0, 2); // get the hours from the local time string
  // // const minutes = localTime.substr(3, 2); // get the minutes from the local time string
  // // return `${hours}:${minutes}`; // format the local time string as 'HH:MM'
  
  // // const timeRangeStart =  new Date(`2000-01-01T${employeeTimeOpen}.000Z`);
  // // const timeRangeEnd =    new Date(`2000-01-01T${employeeTimeClose}.000Z`);


  // // const filteredArray = times.filter(t => {
  // //   const time = new Date(`2000-01-01T${t}.000Z`);
  // //   return time >= timeRangeStart && time <= timeRangeEnd;
  // // });

  // // console.log({times})
  

  // // // console.log({filteredArray})
  // // return filteredArray 
  // return times
}


export function calcDateTimeRange(startDate:string, startTime:string, duration:string){
  console.table({
    startDate,
    startTime
  });
  
  const dateStart = new Date(startDate+'T'+startTime)
  console.log({dateStart});
  

  const dateEnd = new Date(dateStart.setTime(dateStart.getTime() + Number(duration) * 60 * 60 * 1000))

  console.log('datecheckCal, ', dateStart.toISOString())
  console.log('dateEnd, ', dateEnd)
  
  // return date.toISOString();

  return {
    start: dateStart.toISOString(),
    end: dateEnd.toISOString(),
  }
}

export const filterServiceTimeSlots = (start:string, end:string, duration:string) => {
  // console.table({
  //   start: start,
  //   end: end,
  //   duration: Number(duration) * 60,
  // })


  // Define the time interval in minutes
  const timeInterval = Number(duration) * 60;
  // const timeInterval = 15;

  // Create an empty array to hold the times
  const times = [];

  // Convert the start and end time to Date objects
  const startDate = new Date(start);
  const endDate = new Date(end);

  // Loop through the time range and add each time to the array
  for (let time = startDate; time <= endDate; time.setMinutes(time.getMinutes() + timeInterval)) {
    times.push(time.toLocaleTimeString("en-US", { hour12: false }));
  }

  // Print the resulting array of times
  // console.log(times);

  return times
}


export function calcDateTimeUTC(date:string){

}

function endOfDay(date:string){
  const dayObj = new Date(date)
  const lastMinuteOfDay = new Date(dayObj.getFullYear(), dayObj.getMonth(), dayObj.getDate());

  // Set the time to the last minute of the day (23:59:59.999)
  lastMinuteOfDay.setHours(23)
  lastMinuteOfDay.setMinutes(59)
  lastMinuteOfDay.setSeconds(0)
  lastMinuteOfDay.setMilliseconds(0)

  return lastMinuteOfDay
}

// type BusyDay = {
//   id: string,
//   start: string,
//   end: string,
//   durationInHours: string,
// }

// export function dateCheckAvail(start:string, end:string, busyDays:BusyDay[]) {

//   const selectedStart = new Date(start)
//   const selectedEnd = new Date(end)
//   // const durationMs = Number(durationInHours) * 60 * 60 * 1000
//   // const selectedEnd = new Date(selectedStart.getTime() + durationMs)

//   for (let i = 0; i < busyDays.length; i++) {

//     console.log('busyDays[i].start, ', busyDays[i].start);
//     console.log('busyDays[i].end, ', busyDays[i].end);
    
//     const busyStart = new Date(busyDays[i].start);
//     const busyEnd = new Date(busyDays[i].end)

//     if (selectedEnd <= busyStart || selectedStart >= busyEnd) {
//       // console.log('the selected date time and the vacation day do not overlap')
//       continue;
//     } else {
//       console.log({
//         selectedStart: selectedStart,
//         selectedEnd: selectedEnd,
//         busyStart: busyStart,
//         busyEnd: busyEnd,
//       })
//       console.log('the selected date time and the vacation day overlap')
//       console.log('gig / vacation id: ', busyDays[i].id);
      
//       return false;
//     }
//   }

//   console.log('no vacation day overlaps with selected date')
//   return true; // no vacation day overlaps with selected date
// }