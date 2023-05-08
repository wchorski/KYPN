type BusyDay = {
  id: string,
  start: string,
  end: string,
  durationInHours: string,
}

// export function dateCheckAvail2(start:string, end:string, busyDays:BusyDay[], serviceDays[]){

// }

export function dateCheckAvail(start:string, end:string, busyDays:BusyDay[]) {

  const selectedStart = new Date(start)
  const selectedEnd = new Date(end)
  // const durationMs = Number(durationInHours) * 60 * 60 * 1000
  // const selectedEnd = new Date(selectedStart.getTime() + durationMs)

  for (let i = 0; i < busyDays.length; i++) {

    console.log('busyDays[i].start, ', busyDays[i].start);
    console.log('busyDays[i].end, ', busyDays[i].end);
    
    const busyStart = new Date(busyDays[i].start);
    const busyEnd = new Date(busyDays[i].end)

    if (selectedEnd <= busyStart || selectedStart >= busyEnd) {
      // console.log('the selected date time and the vacation day do not overlap')
      continue;
    } else {
      console.log({
        selectedStart: selectedStart,
        selectedEnd: selectedEnd,
        busyStart: busyStart,
        busyEnd: busyEnd,
      })
      console.log('the selected date time and the vacation day overlap')
      console.log('gig / vacation id: ', busyDays[i].id);
      
      return false;
    }
  }

  console.log('no vacation day overlaps with selected date')
  return true; // no vacation day overlaps with selected date
}

//! with duration
// export function dateCheckAvail(selectedDateTime:string, durationInHours:string, busyDays:BusyDay[]) {

//   const selectedStart = new Date(selectedDateTime)
//   const durationMs = Number(durationInHours) * 60 * 60 * 1000
//   const selectedEnd = new Date(selectedStart.getTime() + durationMs)

//   for (let i = 0; i < busyDays.length; i++) {

//     const busyStart = new Date(busyDays[i].start);
//     const busyEnd = new Date(busyStart.getTime() + Number(busyDays[i].durationInHours) * 60 * 60 * 1000)

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

export function calcEndTime(start:string, duration:string){
  const date = new Date(start);
  date.setTime(date.getTime() + Number(duration) * 60 * 60 * 1000);
  console.log('calcendtime, ', date.toISOString());
  
  return date.toISOString();

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