setInterval(() => {
    // location.reload()
}, 1000);

import {
    getCoords
} from "/weatherInfoUndocking.js";
import {
    getGreetings
}
from "/js/greetings.js"
import {
    performSearch
}
from "/js/search.js"

let preloader = `
<div class="preloader">
<img src="/preloader.svg" alt="">
</div>`
document.querySelector(".container").insertAdjacentHTML("afterbegin", preloader)
let time = new Date()
let moment = (time.getHours());
let day = (time.getDay());
let minuteGotten = (time.getMinutes())
let minute;
if (minuteGotten.length < 2) {
    minute = `0${minute}`
} else {
    minute = minuteGotten
}
// let moment = (time.getHours());

document.querySelector(".section-icon").addEventListener("click", () => {
    if (document.querySelector(".section1").classList.contains("open") == true) {
        document.querySelector(".section1").classList.remove("open")
    } else {
        document.querySelector(".section1").classList.add("open")
    }
})

// undockInfo()
document.querySelector(".greetings").innerHTML = (await getGreetings(moment, day)).greeting
document.querySelector(".day").innerHTML = (await getGreetings(moment, day)).day + ","
document.querySelector(".meridian-el").innerHTML = (await getGreetings(moment, day)).meridian
document.querySelector(".time-in-twelve").innerHTML = `${(await getGreetings(moment, day)).twelveHour}: ${minute}`

//function for performing city searches
document.querySelector(".fa-magnifying-glass").addEventListener("click", (e) => {
    e.target.style.color = "#0000aa"
    let searchQuery = document.getElementById("location-search").value
    document.getElementById("searchName").innerHTML = "Loading..."
    performSearch(searchQuery);
    document.getElementById("location-search").value = ""
})