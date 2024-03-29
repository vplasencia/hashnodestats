const WEEK_DAYS_OBJ = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
};

const MONTHS_OBJ = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
};

const HOURS_OBJ = {
  0: "0:00",
  1: "1:00",
  2: "2:00",
  3: "3:00",
  4: "4:00",
  5: "5:00",
  6: "6:00",
  7: "7:00",
  8: "8:00",
  9: "9:00",
  10: "10:00",
  11: "11:00",
  12: "12:00",
  13: "13:00",
  14: "14:00",
  15: "15:00",
  16: "16:00",
  17: "17:00",
  18: "18:00",
  19: "19:00",
  20: "20:00",
  21: "21:00",
  22: "22:00",
  23: "23:00"
};

export const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export function sortArrays(postsTitle, reactionsCount) {
  var list = [];
  for (let i = 0; i < postsTitle.length; i++) {
    list.push({ postTitle: postsTitle[i], reactionsCount: reactionsCount[i] });
  }

  list.sort(function(a, b) {
    return a.reactionsCount > b.reactionsCount
      ? -1
      : a.reactionsCount === b.reactionsCount
      ? 0
      : 1;
  });

  for (var k = 0; k < list.length; k++) {
    postsTitle[k] = list[k].postTitle;
    reactionsCount[k] = list[k].reactionsCount;
  }
}

export function convertFromPXToMM(value) {
  // 1 mm = 3.779528 px
  return value / 3.779528;
}

export function convertFromMMToPX(value) {
  // 1 mm = 3.779528 px
  return value * 3.779528;
}
