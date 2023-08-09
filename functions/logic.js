const axios = require('axios');
ipInformation = ""

const currentCityName = async (longitude, latitude) => {
    console.log("executing function");
    try {
        const response = await axios.get(`
        http://api.positionstack.com/v1/reverse?access_key=${process.env.CITY_NAME_API_KEY}&limit=1&query=${latitude},${longitude}`);

        const data = response.data;
        let information = {
            street_name: data.data[0].name,
            country: data.data[0].country,
            street: data.data[0].street
        };
        return information;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const userLocationWeatherInfo = async (longitude, latitude) => {
    console.log("executing function");
    try {
        const response = await axios.get(`
        https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`)
        // return response
        const data = response.data
        return data;
    } catch (error) {
        // console.error(error);
        return (error)
        // throw error;
    }
};

const userSearchInfo = async (keyword) => {
    console.log("executing function: performing search");
    try {
        const response = await axios.get(`
        https://api.openweathermap.org/data/2.5/weather?q=${keyword}&appid=${process.env.WEATHER_API_KEY}&units=metric`)
        // return response
        const data = response.data
        return data;
    } catch (error) {
        console.error(error);
        return (error)
        // throw error;
    }
}


async function getIpInfo(ipAddress) {
    console.log("finding ip address location");
    const ip = ipAddress;
    console.log(ip);
    const accessKey = process.env.APIIP_API_KEY;
    try {
        const url = 'http://apiip.net/api/check?ip=' + ip + '&accessKey=' + accessKey;
        // Make a request and store the response
        const response = await axios.get(url);
        const result = await response.data;

        // Output the "code" value inside "currency" object
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
};


async function timeFromCoords(longitude, latitude) {
    let timezoneUrl = `https://timeapi.io/api/Time/current/coordinate?latitude=${latitude}&longitude=${longitude}`

    try {
        const response = await axios.get(timezoneUrl);
        const result = await response.data;

        // Output the "code" value inside "currency" object
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    currentCityName: currentCityName,
    weatherData: userLocationWeatherInfo,
    getIpInfo: getIpInfo,
    citySearch: userSearchInfo,
    timeZoneTime:timeFromCoords
}