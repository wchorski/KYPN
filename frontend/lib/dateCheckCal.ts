import { generateTimesArray } from "./generateTimesArray";

type DateRange ={
  start: string,
  end: string,
}

function isRangesOverlap(gig:DateRange, busy:DateRange) {
  const gigStart = new Date(gig.start).getTime();
  const gigEnd = new Date(gig.end).getTime();
  const busyStart = new Date(busy.start).getTime();
  const busyEnd = new Date(busy.end).getTime();

  if (gigStart <= busyEnd && gigEnd >= busyStart) {
    return true;
  }

  if (busyStart <= gigEnd && busyEnd >= gigStart) {
    return true;
  }

  return false;
}

export function findOverlapTimes(busyRange:DateRange, currentTimes:string[], date:string){
  // console.log('findoverlaptimes');
  
  // const defaultTimes = generateTimesArray()
  // console.log({defaultTimes});
  
  const datePicked = new Date(date);
  const busyStart = new Date(busyRange.start);
  const busyEnd = new Date(busyRange.end);

  // console.table({
  //   datePicked: date,
  //   busyStart: busyStart.toLocaleDateString('en-CA'),
  //   busyEnd: busyEnd.toLocaleDateString('en-CA'),
  // })

  // const isSameDate = datePicked.getFullYear() === busyStart.getFullYear() && datePicked.getMonth() === busyStart.getMonth() && datePicked.getDate() === busyStart.getDate();
  if(date !== busyStart.toLocaleDateString('en-CA') && date !== busyEnd.toLocaleDateString('en-CA')  ){
    console.log('date picked !== busyStart, !== busyEnd.... have i done anything here?')
    
    return []
  }
  if(date === busyStart.toLocaleDateString('en-CA') && date === busyEnd.toLocaleDateString('en-CA')  ){
    const filteredTimes = currentTimes.filter(time => {
      const [hours, minutes, seconds] = time.split(":").map(Number)
      const specificTime = new Date(busyStart.getFullYear(), busyStart.getMonth(), busyStart.getDate(), hours, minutes, seconds); 


      if(specificTime < busyStart || specificTime > busyEnd){
        return true
      }

      // console.log('!!!!!!! this overlapped: ');
      // console.table({
      //   specificTime,
      //   busyStart,
      //   busyEnd,
      //   timeValue: time,
      // });
      return false

    })
    
    return filteredTimes
  }

  if(date === busyStart.toLocaleDateString('en-CA')  ){
    // console.log('date picked === busyStart, !== busyEnd')
    const filteredTimes = currentTimes.filter(time => {
      const [hours, minutes, seconds] = time.split(":").map(Number)
      const specificTime = new Date(busyStart.getFullYear(), busyStart.getMonth(), busyStart.getDate(), hours, minutes, seconds); 

      if(specificTime < busyStart){
        return true
      }

      return false

    })
    
    return filteredTimes
  }

  if(date === busyEnd.toLocaleDateString('en-CA')  ){
    // console.log('date picked === busyStart, !== busyEnd')
    const filteredTimes = currentTimes.filter(time => {
      const [hours, minutes, seconds] = time.split(":").map(Number)
      const specificTime = new Date(busyEnd.getFullYear(), busyEnd.getMonth(), busyEnd.getDate(), hours, minutes, seconds); 

      if(specificTime > busyEnd){
        return true
      }

      return false

    })
      
    return filteredTimes
  }


  // //todo use a filter instead 
  // const busyTimes = defaultTimes.map(time => {
    
  //   const [hours, minutes, seconds] = time.value.split(":").map(Number); // split the string into its components
  //   datePicked.setHours(hours, minutes, seconds); // set the time on the date object


  //   if (datePicked >= busyStart && datePicked <= busyEnd) {
  //     console.log(`${time.label]} falls inside the range ${busyStart}-${busyEnd}`);
  //   } else {
  //     console.log(`${time.label} does not fall inside the range ${busyStart}-${busyEnd}`);
  //   }
  // })

  // const overlap = busyRanges.map(range => {
  //   // const [hours, minutes, seconds] = timeString.split(":"); // split the string into its components
  //   // date.setHours(hours, minutes, seconds); // set the time on the date object
  // })
}

export function filterOutOverlapSlots(rangeBusy:DateRange, timeSlots:DateRange[], date:string){

  const slotDateTimes = timeSlots.map(slot => {
    return {
      start: new Date(`${date}T${slot.start}`).toISOString(),
      end: new Date(`${date}T${slot.end}`).toISOString(),
    }
  })
  console.log({slotDateTimes});
  

  const filteredSlots = slotDateTimes.filter(slot => {
    if(!isRangesOverlap(rangeBusy, slot)) {
      return true
    }

    return false
  })
  
  const justTimes = filteredSlots.map((slot:DateRange) => {
    return {
      start: time24(new Date(slot.start)),
      end: time24(new Date(slot.end)),
    }
  })
  console.log({justTimes});

  return justTimes
  
  // const filteredSlots = timeSlots.map(slot => {
  //   const slotIso = {
  //     start: new Date(`${date}T${slot.start}`).toISOString(),
  //     end: new Date(`${date}T${slot.end}`).toISOString(),
  //   }

  //   if(isRangesOverlap(slotIso, slot)){
  //     return {
  //       start: slotStart.getHours().toString().padStart(2, '0') + ':' + slotStart.getMinutes().toString().padStart(2, '0'),
  //       end: slotEnd.getHours().toString().padStart(2, '0') + ':' + slotEnd.getMinutes().toString().padStart(2, '0'),
  //     }
  //   } else {
  //     return {
  //       start: slotStart.getHours().toString().padStart(2, '0') + ':' + slotStart.getMinutes().toString().padStart(2, '0'),
  //       end: slotEnd.getHours().toString().padStart(2, '0') + ':' + slotEnd.getMinutes().toString().padStart(2, '0'),
  //     }
      
  //   }

  //   // const busyStart = new Date(rangeBusy.start)
  //   // const busyEnd = new Date(rangeBusy.end)
  //   // const slotStart = new Date(slotIso.start)
  //   // const slotEnd = new Date(slotIso.end)

  //   // // Check if the date ranges overlap
  //   // if (busyStart <= slotEnd && busyEnd >= slotStart) {
  //   //   console.log('----- these overlap ----')
  //   //   console.table({
  //   //     slotStart,
  //   //     slotEnd,
  //   //     busyStart,
  //   //     busyEnd,
  //   //   })
      
  //   //   return null
  //   // } else {
  //   //   // No overlap, return null
  //   //   return {
  //   //     start: slotStart.getHours().toString().padStart(2, '0') + ':' + slotStart.getMinutes().toString().padStart(2, '0'),
  //   //     end: slotEnd.getHours().toString().padStart(2, '0') + ':' + slotEnd.getMinutes().toString().padStart(2, '0'),
  //   //   }
  //   // }
  // })

  // return filteredSlots.filter((val) => { return val !== null })

}

function time24(date:Date){
  return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0')
}
// export function filterOutOverlapSlots(rangeBusy:DateRange, rangeSlots:DateRange){
//   // Convert input date strings to Date objects
//   const busyStart = new Date(rangeBusy.start)
//   const busyEnd = new Date(rangeBusy.end)
//   const slotStart = new Date(rangeSlots.start)
//   const slotEnd = new Date(rangeSlots.end)

  
//   let clearedSlot = {}
//   // Check if the date ranges overlap
//   if (busyStart <= slotEnd && busyEnd >= slotStart) {

//     console.log('slot conflict');
    

//   } else {
//     // No overlap, return null
//     clearedSlot = {
//       start: 'clear: ' + slotStart.getHours().toString().padStart(2, '0') + ':' + slotStart.getMinutes().toString().padStart(2, '0'),
//       end: slotEnd.getHours().toString().padStart(2, '0') + ':' + slotEnd.getMinutes().toString().padStart(2, '0'),
//     }
//   }

//   return clearedSlot

// }

// ! filter out employees vacation days by time slots
export function filterTimeAvail(date:string, times:string[], range:DateRange, duration:string){
  // console.log({range});
  // console.log({times})
  
  // const dateChosen = new Date(date)
  // const d = date.split('-')
  // const n = d.map(Number)
  // console.log({n});
  
  // const dateChosen = new Date(Date.UTC(n[0], n[1], n[2]))
  // console.log({dateChosen});
  
  
  const rangeStart = new Date(range.start)
  const rangeEnd = new Date(range.end)
  // console.log('rangeStart: ' ,  rangeStart.toLocaleDateString('en-CA'));
  // console.log('rangeEnd: ' ,    rangeEnd.toLocaleDateString('en-CA'));
  
  
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
    // console.log('these days match range.start')
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
    // console.log({filteredTimes});
    
    return filteredTimes
    
  } else {
    
    // console.log({times});
    return times
  }

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