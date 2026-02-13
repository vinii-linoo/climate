export default async function handler(req, res) {
  const city = req.query.city;

  const API_KEY = process.env.OPENWEATHER_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`;

  const response = await fetch(url);
  const data = await response.json();

  res.status(200).json(data);
}
