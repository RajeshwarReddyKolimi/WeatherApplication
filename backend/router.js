async function getCurrent(req, res, next) {
  try {
    const location = "London";
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.apiKey}&q=London&aqi=no`
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
    const { id } = req.params;
    const date = "2024-10-25";
    const response = await fetch(
      `http://api.weatherapi.com/v1/history.json?key=${process.env.apiKey}&q=${id}&dt=${date}&aqi=no`
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

module.exports = { getCurrent, getHistory, addData };
