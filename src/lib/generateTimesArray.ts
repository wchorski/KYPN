export function generateTimesArray() {
  const startTime = "00:00";
  const endTime = "23:59";
  const timeInterval = 15;
  const options = [];

  const startDate = new Date(`2000-01-01T${startTime}:00`);
  const endDate = new Date(`2000-01-01T${endTime}:00`);

  for (
    let time = startDate;
    time <= endDate;
    time.setMinutes(time.getMinutes() + timeInterval)
  ) {
    options.push({
      label: time.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      }),
      value: time.toLocaleTimeString([], { hourCycle: "h23" })
      // value: time.toString()
    });
  }

  return options;
}
