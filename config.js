require('dotenv').config();

module.exports = {
    base_url_maps: process.env.BASE_URL_MAPS,
    base_url_weather: process.env.BASE_URL_WEATHER,
    access_token: process.env.TOKEN_ACCESS_MAPS,
    api_token_weather: process.env.TOKEN_ACCESS_WEATHER,

} 