
export function formatTimeslot(startTime: Date | string, endTime: Date | string, timezone: string) {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: timezone,
  };

  const start = new Date(startTime).toLocaleTimeString("en-GB", options); 
  const end = new Date(endTime).toLocaleTimeString("en-GB", options);

  return `${start} - ${end}`;
}

