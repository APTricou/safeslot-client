

const toTimestamp = (str) => {
  // date requires a date and time. we can't have only time
  // so this is a dummy date
  return new Date('01/01/1970 ' + str).getTime();
}

const addMinutes = (timeInSeconds, minutesToAdd) => {
  let secondsToAdd = (minutesToAdd * 60000);
  return timeInSeconds + secondsToAdd
}

const pairwise = (arr, func) => {
  for (let i = 0; i < arr.length - 1; i++) {
    func(arr[i], arr[i + 1])
  }
}

const formatHoursAndMinutes = (hours, mins) => {
  return ((hours.toString().length === 1) ? '0' + hours : hours) + ':' +
    ((mins.toString().length === 1) ? '0' + mins : mins);
}

const timestampToTime = (timestamp) => {
  let date = new Date(timestamp);
  return formatHoursAndMinutes(date.getHours(), date.getMinutes());
}

const generateTimeSlots = async (startTime, endTime, interval) => {
  const timeslots = [startTime];

  let tempTime = startTime;
  while (tempTime < endTime) {
    tempTime = addMinutes(tempTime, interval);
    if (tempTime >= endTime) {
      timeslots.push(endTime);
    } else {
      timeslots.push(tempTime);
    }
  }

  let result = [];
  pairwise(timeslots, function (slotStartTime, slotEndTime) {
    result.push({ slotStartTime, slotEndTime })
  })

  let slots = result.map((element) => {
    let start = timestampToTime(element.slotStartTime).split(':');
    let end = timestampToTime(element.slotEndTime).split(':');

    return {
      "start_hours": parseInt(start[0]),
      "start_minutes": parseInt(start[1]),
      "end_hours": parseInt(end[0]),
      "end_minutes": parseInt(end[1]),
      "maximun_people_allowed": 0,
    }
  });

  return slots;
}

export {
  toTimestamp,
  addMinutes,
  pairwise,
  formatHoursAndMinutes,
  timestampToTime,
  generateTimeSlots
}
