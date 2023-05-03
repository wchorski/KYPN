type BusyDay = {
  id: string,
  dateTime: string,
  durationInHours: string,
}

export function dateCheckAvail(selectedDateTime:string, durationInHours:string, busyDays:BusyDay[]) {

  const selectedStart = new Date(selectedDateTime)
  const durationMs = Number(durationInHours) * 60 * 60 * 1000
  const selectedEnd = new Date(selectedStart.getTime() + durationMs)

  for (let i = 0; i < busyDays.length; i++) {

    const busyStart = new Date(busyDays[i].dateTime);
    const busyEnd = new Date(busyStart.getTime() + Number(busyDays[i].durationInHours) * 60 * 60 * 1000)

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
