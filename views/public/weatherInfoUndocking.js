//Get Current User Position and Feed it in a variable
let geoLon;
let geoLat;
let userRegion;

function requestLocation() {
    alert("This app uses your location to improve its performance")
    const successCallback = (position) => {
        console.log(position);
        geoLon = position.coords.longitude
        geoLat = position.coords.latitude
        console.log(`This is your current positional longitude ${geoLon} and current positional latitude ${geoLat}`)
        // getlocation()
    };
    const errorCallback = (error) => {
        console.log(error)
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
}

// requestLocation()
export async function getIpAddress() {
    try {
        const response = await fetch(`https://api.ipify.org?format=json`)
        const data = await response.json()
        let ipAddress = data.ip
        getCoords(ipAddress)
    } catch (error) {
        console.error("Error fetching IP:", error);
    }
}
getIpAddress()

export async function getCoords(ipAddress) {
    try {
        const response = await fetch(`/api/me/${ipAddress}`)
        const data = await response.json()
        geoLon = data.longitude
        geoLat = data.latitude
        userRegion = data.region
        getWeatherDetails()
    } catch (error) {
        console.error(error)
    }
}



export async function getWeatherDetails() {
    try {
        const response = await fetch(`/api/me/${geoLat}/${geoLon}`)
        const data = await response.json()
        setDetails(data)
    } catch (error) {
        console.error(error)
    }
}

function setDetails(data) {
    document.querySelectorAll(".location").forEach(element => {
        // element.innerHTML = data.street || data.street_name || data.country
        element.innerHTML = data.name
    })
    document.getElementById("featuredTemperature").innerHTML = `${data.main.feels_like}&deg;c`
    document.querySelector(".preloader").remove()
}