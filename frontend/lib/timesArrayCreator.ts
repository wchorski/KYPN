export const filterServiceTime = (start:string, end:string, duration:string) => {
  // console.table({
  //   start: start,
  //   end: end,
  //   duration: Number(duration) * 60,
  // })
  const startTime = start;
  const endTime = end;

  // Define the time interval in minutes
  const timeInterval = Number(duration) * 60;
  // const timeInterval = 15;

  // Create an empty array to hold the times
  const times = [];

  // Convert the start and end time to Date objects
  const startDate = new Date(`2000-01-01T${startTime}`);
  const endDate = new Date(`2000-01-01T${endTime}`);

  // Loop through the time range and add each time to the array
  for (let time = startDate; time <= endDate; time.setMinutes(time.getMinutes() + timeInterval)) {
    times.push(time.toLocaleTimeString("en-US", { hour12: false }));
  }

  // Print the resulting array of times
  // console.log(times);

  return times
}

export const filterServiceSlots = (start:string, end:string, duration:string) => {
  // console.table({
  //   start: start,
  //   end: end,
  //   duration: Number(duration) * 60,
  // })
  const startTime = start;
  const endTime = end;
  

  // Define the time interval in minutes
  const timeInterval = Number(duration) * 60;
  // const timeInterval = 15;

  // Create an empty array to hold the times
  const slots = [];

  // Convert the start and end time to Date objects
  const startDate = new Date(`2000-01-01T${startTime}`);
  const endDate = new Date(`2000-01-01T${endTime}`);

  // Loop through the time range and add each time to the array
  for (let time = startDate; time <= endDate; time.setMinutes(time.getMinutes() + timeInterval)) {
    slots.push({
      start: time.toLocaleTimeString("en-US", { hour12: false }),
      end: addHoursToTime(time, Number(duration)),
    });
  }

  // Print the resulting array of times
  // console.log(times);

  return slots
}

function addHoursToTime(inputDate:Date, hoursToAdd:number) {
  const options = {
    hour12: false, 
    hour: 'numeric', 
    minute: 'numeric', 
    second: 'numeric'
  }
  // @ts-ignore
  const time = inputDate.toLocaleTimeString('en-US', options)

  const [hours, minutes, seconds] = time.split(':').map(Number)
  const date:any = new Date()
  
  date.setHours(hours)
  date.setMinutes(minutes + hoursToAdd * 60)
  date.setSeconds(seconds)
  
  // @ts-ignore
  return date.toLocaleTimeString('en-US', options);
}

export const filterEmployeeTimes = (serviceTimes:string[], employeeTimeOpen:string, employeeTimeClose:string) => {
  // console.log({serviceTimes})
  
  const timeRangeStart =  new Date(`2000-01-01T${employeeTimeOpen}.000Z`);
  const timeRangeEnd =    new Date(`2000-01-01T${employeeTimeClose}.000Z`);


  const filteredArray = serviceTimes.filter(timeString => {
    const time = new Date(`2000-01-01T${timeString}.000Z`);
    return time >= timeRangeStart && time <= timeRangeEnd;
  });

  // console.log({filteredArray})
  return filteredArray 
}
