export const timesArray = () => {
  const startTime = "00:00";
  const endTime = "23:59";

  // Define the time interval in minutes
  const timeInterval = 15;

  // Create an empty array to hold the times
  const options = [];

  // Convert the start and end time to Date objects
  const startDate = new Date(`2000-01-01T${startTime}:00`);
  const endDate = new Date(`2000-01-01T${endTime}:00`);

  // Loop through the time range and add each time to the array
  for (let time = startDate; time <= endDate; time.setMinutes(time.getMinutes() + timeInterval)) {

    options.push({ 
      label: time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true} ), 
      value: time.toLocaleTimeString("en-US", { hour12: false } ),
    })
  }

  // console.log({options});

  return options
}