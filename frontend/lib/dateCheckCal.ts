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