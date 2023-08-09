exports.timeOfDay = (hour, day) => {
    function convertToTwelveHour() {
        if (hour > 12) {
            return hour - 12
        }
        else{
            return hour
        }
    }



    function checkMeridian() {
        if (hour > 12) {
            return "PM"
        }
        else{
            return "AM"
        }
    }

    let greetingText = "Greetings";
    let timeOfDay = hour;
    let info = {};

    if (timeOfDay < 10) {
        greetingText = "Good Morning";
    } else if (timeOfDay < 12) {
        greetingText = "Good Day";
    } else if (timeOfDay < 16) {
        greetingText = "Good Afternoon";
    } else if (timeOfDay < 20) {
        greetingText = "Good Evening";
    } else if (timeOfDay < 23) {
        greetingText = "Good Night";
    } else {
        greetingText = "Hello There";
    }

    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    // Ensure that day is within a valid range (0 to 6)
    if (day >= 0 && day <= 6) {
        info = {
            greeting: greetingText,
            day: daysOfWeek[day],
            meridian: checkMeridian(),
            twelveHour:convertToTwelveHour()
        };
    } else {
        info = {
            greeting: greetingText,
            day: false,
            meridian: checkMeridian(),
            twelveHour:convertToTwelveHour()
        };
    }

    return info;
};