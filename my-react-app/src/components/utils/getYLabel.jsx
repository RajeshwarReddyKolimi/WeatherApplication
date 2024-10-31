export default function getYLabel(category) {
  return category == "Temperature"
    ? "Temperature in C"
    : category == "Wind"
    ? "Max wind in kph"
    : category == "Precipitation"
    ? "Precipitation in mm"
    : category == "Humidity"
    ? "Humidity in %"
    : "UV Index";
}
