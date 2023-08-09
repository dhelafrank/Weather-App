export async function performSearch(keyword) {
    const response = await fetch(`/api/search/${keyword}`)
    const data = await response.json()
    if (data.status == 404) {
        document.getElementById("searchName").innerHTML = "City not found, try something else"
        return;
    } else {
        getKeywordTime(data.coord.lon, data.coord.lat, data)
    }
}

async function getKeywordTime(longitude, latitude, searchResults) {
    const response = await fetch(`/api/time/${longitude}/${latitude}`)
    const data = await response.json()
    document.getElementById("searchTime").innerHTML = data.time
    document.getElementById("searchWindSpeed").innerHTML = `${searchResults.wind.speed}m/s`
    document.getElementById("searchTemp").innerHTML = `${searchResults.main.feels_like}&deg;c`
    document.getElementById("searchName").innerHTML = `${searchResults.name}`
    let momentDecision = () => {
        if (data.hour > 20) {
            return "Evening";
        } else if (data.hour > 15) {
            return "Sunset";
        } else if (data.hour > 11) {
            return "Afternoon";
        } else if (data.hour > 9) {
            return "Morning";
        } else if (data.hour > 5) {
            return "Sunrise";
        } else if (data.hour > 0) {
            return "Early Morning";
        } else {
            return "Midnight"; 
        }
    };

    document.getElementById("moment").innerHTML = momentDecision()
}