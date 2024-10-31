async function getCurrent(req, res, next) {
  try {
    const { location } = req.query;
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.apiKey}&q=${location}&aqi=no`
    );
    const data = await response.json();
    if (!response?.ok) next(data?.error);
    else res.status(200).send(data);
  } catch (e) {
    next(e);
  }
}

async function getHistory(req, res, next) {
  try {
    const { location, startDate, endDate } = req.query;
    const response = await fetch(
      `http://api.weatherapi.com/v1/history.json?key=${process.env.apiKey}&q=${location}&dt=${startDate}&end_dt=${endDate}&aqi=no`
    );
    const data = await response.json();
    if (!response?.ok) next(data?.error);
    else res.status(200).send(data);
  } catch (e) {
    next(e);
  }
}

async function searchLocation(req, res, next) {
  try {
    const { location } = req.query;
    const response = await fetch(
      `http://api.weatherapi.com/v1/search.json?key=${process.env.apiKey}&q=${location}&aqi=no`
    );
    const data = await response.json();
    if (!response?.ok) next(data?.error);
    else res.status(200).send(data);
  } catch (e) {
    next(e);
  }
}

async function addData(req, res, next) {
  try {
  } catch (e) {
    next(e);
  }
}

module.exports = { getCurrent, getHistory, addData, searchLocation };
