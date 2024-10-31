export default function getvalues(data, period, category, date) {
  if (period == "Weekly") {
    if (category == "Temperature")
      return data?.forecast?.forecastday?.map(
        (forecastday) => forecastday?.day?.avgtemp_c
      );
    else if (category == "Wind")
      return data?.forecast?.forecastday?.map(
        (forecastday) => forecastday?.day?.maxwind_kph
      );
    else if (category == "Humidity")
      return data?.forecast?.forecastday?.map(
        (forecastday) => forecastday?.day?.avghumidity
      );
    else if (category == "Precipitation")
      return data?.forecast?.forecastday?.map(
        (forecastday) => forecastday?.day?.totalprecip_mm
      );
    else
      return data?.forecast?.forecastday?.map(
        (forecastday) => forecastday?.day?.uv
      );
  } else {
    if (category == "Temperature")
      return data?.forecast?.forecastday
        ?.filter((day) => `${day?.date}` === `${date}`)
        ?.map((day) => day?.hour?.map((hour) => hour?.temp_c))
        .flat(2);
    else if (category == "Wind")
      return data?.forecast?.forecastday
        ?.filter((day) => `${day?.date}` === `${date}`)
        ?.map((day) => day?.hour?.map((hour) => hour?.wind_kph))
        .flat(2);
    else if (category == "Humidity")
      return data?.forecast?.forecastday
        ?.filter((day) => `${day?.date}` === `${date}`)
        ?.map((day) => day?.hour?.map((hour) => hour?.humidity))
        .flat(2);
    else if (category == "Precipitation")
      return data?.forecast?.forecastday
        ?.filter((day) => `${day?.date}` === `${date}`)
        ?.map((day) => day?.hour?.map((hour) => hour?.precip_mm))
        .flat(2);
    else
      return data?.forecast?.forecastday
        ?.filter((day) => `${day?.date}` === `${date}`)
        ?.map((day) => day?.hour?.map((hour) => hour?.uv))
        .flat(2);
  }
}
