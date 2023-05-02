type VacayDay = {
  dateTime: string,
  durationInHours: string,
}

export function dateCheckAvail(selectedDateTime:string, durationInHours:string, vacationDays:VacayDay[]) {

  const selectedStart = new Date(selectedDateTime)
  const durationMs = Number(durationInHours) * 60 * 60 * 1000
  const selectedEnd = new Date(selectedStart.getTime() + durationMs)

  for (let i = 0; i < vacationDays.length; i++) {

    const vacationStart = new Date(vacationDays[i].dateTime);
    const vacationEnd = new Date(vacationStart.getTime() + Number(vacationDays[i].durationInHours) * 60 * 60 * 1000)

    if (selectedEnd <= vacationStart || selectedStart >= vacationEnd) {
      console.log('the selected date time and the vacation day do not overlap')
      continue;
    } else {
      
      console.log('the selected date time and the vacation day overlap')
      return false;
    }
  }

  console.log('no vacation day overlaps with selected date')
  return true; // no vacation day overlaps with selected date
}
