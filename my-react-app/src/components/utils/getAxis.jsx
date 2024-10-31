export default function getAxis(data, period, date) {
  if (period == "Weekly") {
    return data?.forecast?.forecastday?.map((forecastday) => forecastday?.date);
  } else {
    return data?.forecast?.forecastday
      ?.filter((day) => `${day?.date}` === `${date}`)
      ?.map((day) => day?.hour?.map((hour) => hour?.time?.substring(11, 13)))
      .flat(2);
  }
}
