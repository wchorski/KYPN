import type  { DateRange, StringRange } from '../keystone/types'
import { isSameCalendarDay } from "./dateCheckCal"

type TimeOpt = {
  value: string,
  label: string,
}


export function findBlackoutDates(busyRanges:DateRange[], buisnessHours:StringRange, serviceDurationHours:number){
  // const busyDays1 = findEmployeeBusyDays(employee, buisnessHours, serviceDurationHours)
  // const busyRanges = findEmployeeBusyRanges(employee)
  const busyDays = busyRanges.flatMap(range => calcPartialDays(range, buisnessHours, serviceDurationHours))

  console.log({busyDays});
  
  return busyDays
}

// function* scanByDayRange(startDate:Date, endDate:Date) {
//   let currentDate = new Date(startDate);

//   while (currentDate <= endDate) {
//     yield new Date(currentDate);
//     currentDate.setDate(currentDate.getDate() + 1);
//   }
// }


// export const getUniqueDays = (startDate:Date, endDate:Date) => {
//   const uniqueDays = new Set();

//   for (const date of scanByDayRange(startDate, endDate)) {
//     date.setHours(0, 0, 0)
//     uniqueDays.add(date.toLocaleDateString())
//   }
//   console.log(Array.from(uniqueDays));
  
//   // const uniqueDays = Array.from(uniqueStrings).map(s => new Date(s+'T00:00:00'))
//   // console.log({uniqueDays});
//   return Array.from(uniqueDays)
// };

export function findUniqueDays(dateRanges:StringRange[]) {
  const uniqueDays:string[] = [];


  dateRanges.forEach(range => {
    const startDate = new Date(range.start)
    const endDate = new Date(range.end)
    startDate.setHours(0,0,0)
    endDate.setHours(0,0,0)

    for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
      const formattedDate = day.toISOString().split('T')[0];
      if (!uniqueDays.includes(formattedDate)) {
        // day.setHours(0,0,0)
        uniqueDays.push(formattedDate);
      }
    }
  })

  return uniqueDays.map(d => new Date(d+"T00:00:00"));
}


// function findEmployeeBusyRanges(employee:User){

//   const busyRanges:Range[] = []

//   employee.gigs.map((gig:Booking) => {
    
//     const gigRange = {
//       start: gig.start,
//       end: gig.end,
//     }
//     busyRanges.push(gigRange)
//   })

//   employee.availability.map((avail:Availability) => {
//     if(avail.type === 'AVAILABLE') return console.log('date is of type AVAILABLE')
    
//     const availRange = {
//       start: avail.start,
//       end: avail.end,
//     }
//     busyRanges.push(availRange)
//   })
  
//   return busyRanges
// }

// function findEmployeeBusyDays(employee:User, buisnessHours:Range, serviceDurationHours:number) {

//   const blackoutArray:string[] = []

//   employee.gigs.map((gig:Booking) => {
    
//     const gigRange = {
//       start: gig.start,
//       end: gig.end,
//     }
    
//     const newDates = calcPartialDays(gigRange, buisnessHours, serviceDurationHours)
//     blackoutArray.push(...newDates)

//   })

//   employee.availability.map((avail:Availability) => {
//     if(avail.type === 'AVAILABLE') return console.log('date is of type AVAILABLE')
    
//     const availRange = {
//       start: avail.start,
//       end: avail.end,
//     }

//     const newDates = calcPartialDays(availRange, buisnessHours, serviceDurationHours)
//     blackoutArray.push(...newDates)

//   })
  
//   return blackoutArray
// }

// Function to check if a date range can fit around other busy ranges
export function isDateRangeAvailable(testStart:Date, testEnd:Date, busyRanges: StringRange[]) {
  return !busyRanges.some(busy => {
    // console.log({busy});

    // const testStart = new Date(test.start)
    // const testEnd = new Date(test.end)
    const busyStart = new Date(busy.start)
    const busyEnd = new Date(busy.end)
    
    // if((testStart >= busyStart && testStart < busyEnd) || (testEnd > busyStart && testEnd <= busyEnd)){
    //   console.log('!*!*!*!*!!* date overlaps');
    //   console.log('!*!*!*!*!!* date overlaps');
    //   console.log('!*!*!*!*!!* date overlaps');
    //   console.table(
    //     {
    //       testStart,
    //       testEnd ,
    //       busyStart,
    //       busyEnd,
    //     }
    //   )
      
    // } else {
    //   // console.log(' + date is cleared');
    //   // console.table(
    //   //   {
    //   //     testStart: test.start.toLocaleString(),
    //   //     testEnd: test.end.toLocaleString(),
    //   //     busyStart: busy.start.toLocaleString(),
    //   //     busyEnd: busy.end.toLocaleString(),
    //   //   }
    //   // )
    // }
    // todo might want to use .getTime()
    return (testStart >= busyStart && testStart < busyEnd) || (testEnd > busyStart && testEnd <= busyEnd)
  })
}

export function filterBuisnessTimes(inputTimes:string[], buisnessTimes:StringRange) {
  const filteredTimes = inputTimes.filter((time) => {
    const currentTime = new Date(`2000-01-01T${time}`)
    const start = new Date(`2000-01-01T${buisnessTimes.start}`)
    const end = new Date(`2000-01-01T${buisnessTimes.end}`)
    // todo might have to use .getTime()
    return currentTime >= start && currentTime <= end
  })

  return filteredTimes
}

function calcPartialDays(range:DateRange, buisnessHours:StringRange, serviceDurationHours:number){

  const newDates:string[] = []
  const startBusy = range.start
  const endBusy   = range.end


  const startBusyTime = new Date(startBusy.getTime())
  const startBusyMin  = (startBusyTime.getHours() * 60) + startBusyTime.getMinutes()
  const endBusyTime   = new Date(endBusy.getTime())
  const endBusyMin    = (endBusyTime.getHours() * 60) + endBusyTime.getMinutes()
  
  if(isSameCalendarDay(startBusy, endBusy)) {
    console.log('busy start end on same day');
  }
  
  // todo doesn't really work if there is a mix of partial days
  if(!isSameCalendarDay(startBusy, endBusy)) {
    console.log('partials are on different cal days');
    
  
    if(startBusyMin > 0){
      // todo, blocks out whole day if there is 
      if(isFitAnotherServiceBefore(startBusy, buisnessHours, serviceDurationHours)){
        startBusy.setDate(startBusy.getDate() + 1) // do not include partial vacation day, move to next day, zero time
      } 

      startBusy.setHours(0); startBusy.setMinutes(0); startBusy.setSeconds(0); startBusy.setMilliseconds(0);
    } 

    if(endBusyMin < 1439){
      // TODO  could reverse. have buisnessHours.end, reverse time by serviceDuration, check to see if another gig can be added
      endBusy.setDate(endBusy.getDate() - 1) // do not include partial vacation day, move to previous day, zero time
      endBusy.setHours(59); endBusy.setMinutes(59); endBusy.setSeconds(0); endBusy.setMilliseconds(0);
    }
  }
  
  let currentDate = startBusy;
  while (currentDate <= endBusy) {
    // todo carries start time with it to the other dates
    newDates.push(new Date(currentDate).toString());
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return newDates
}

// fit another service on day BEFORE employee is busy
function isFitAnotherServiceBefore(startBusy:Date, buisnessHours:StringRange, serviceDurationHours:number) {

  const busyDay = new Date(startBusy)
  const [hours, minutes, seconds] = buisnessHours.start.split(":").map(Number)
  const buisnessOpen = new Date(busyDay.getFullYear(), busyDay.getMonth(), busyDay.getDate(), hours, minutes, seconds); 
  const firstServiceEnd = buisnessOpen.setMinutes(buisnessOpen.getMinutes() + (serviceDurationHours * 60))
  const gigStart = startBusy.getTime();
  
  
  if (gigStart <= firstServiceEnd) {
    // console.warn('first service slot overlaps with busy day');
    // console.table({
    //   buisnessOpen,
    //   firstServiceEnd,
    //   gigStart,
    // })
    return false;
  }


  return true;
}

export function calcEndTime(dateString:string, serviceDuration:number){

  const date = new Date(dateString)
  date.setMinutes(date.getMinutes() + (serviceDuration * 60))

  return date.toISOString()
}