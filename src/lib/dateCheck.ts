type BusyRange = {
  id: string,
  start: string,
  end: string,
  durationInHours: string,
}

type Range = {
  start: string,
  end: string,
}

// export function dateCheckAvail2(start:string, end:string, busyRanges:BusyRange[], serviceDays[]){

// }

export function dateOverlapCount(gig:Range, busyRanges:BusyRange[]){
  const count = busyRanges.reduce((n, busy) => 

    (isRangesOverlap(gig, busy))
      ? n + 1
      : n
    
  , 0)

  return count
}

export function isRangesOverlap(gig:Range, busy:Range) {
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

export function dateCheckAvail(start:string, end:string, busyRanges:BusyRange[]) {

  const selectedStart = new Date(start)
  const selectedEnd = new Date(end)

  for (let i = 0; i < busyRanges.length; i++) {
    
    const busyStart = new Date(busyRanges[i].start);
    const busyEnd = new Date(busyRanges[i].end)

    if (selectedEnd <= busyStart || selectedStart >= busyEnd) {
      // console.log('the selected date time and the vacation day do not overlap')
      continue;
    } else {

      console.log('the selected date time and the vacation day overlap')
      console.log('gig / vacation id: ', busyRanges[i].id);
      
      return false;
    }
  }

  console.log('no vacation day overlaps with selected date')
  return true; // no vacation day overlaps with selected date
}

export function calcEndTime(start:string, duration:string|undefined){
  const date = new Date(start);
  if(!duration) return date.toISOString()
  date.setTime(date.getTime() + Number(duration) * 60 * 60 * 1000);
  // console.log('calcendtime, ', date.toISOString());
  
  return date.toISOString();

}

export function calcDurationInHours(dateString1: string, dateString2: string) {
  const date1 = new Date(dateString1)
  const date2 = new Date(dateString2)
  
  const durationInMilliseconds = Math.abs(date2.getTime() - date1.getTime())
  const durationInHours = durationInMilliseconds / (1000 * 60 * 60)
  
  return durationInHours
}

export function dayOfWeek(num:number){
  switch (num) {
    case 0:
      return 'Sunday'
    case 1:
      return 'Monday'
    case 2:
      return 'Tuesday'
    case 3:
      return 'Wednesday'
    case 4:
      return 'Thursday'
    case 5:
      return 'Friday'
    case 6:
      return 'Saturday'
  
    default:
      return 'day of week error'
  }
}

export function daysOfWeek(numbers:number[]){
 
  const daysOfWeek = numbers.map(num => dayOfWeek(num)) as string[]

  return daysOfWeek
}