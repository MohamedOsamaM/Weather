$(function () {
  $('#loading').slideUp(1000);
  let day;
let daylist = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
async function weatherapi(loc) {
  let respone = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=6eded7e399fd481faed02155243103&q=${loc}&days=3`
  );
  let finaldata = await respone.json();
  day = finaldata.forecast.forecastday[0].date.split().join();
  date = new Date(day).getDay();
  date1 = new Date(day).getDate();
  date2 = new Date(day).getMonth();
  date3 = new Date(finaldata.forecast.forecastday[1].date).getMonth();
  date4 = new Date(finaldata.forecast.forecastday[1].date).getDate();
  date5 = new Date(finaldata.forecast.forecastday[1].date).getDay();
  date6 = new Date(finaldata.forecast.forecastday[2].date).getMonth();
  date7 = new Date(finaldata.forecast.forecastday[2].date).getDate();
  date8 = new Date(finaldata.forecast.forecastday[2].date).getDay();
  document.getElementById("monthname").innerHTML = monthList[date2];
  document.getElementById("monthname1").innerHTML = monthList[date3];
  document.getElementById("monthname2").innerHTML = monthList[date6];
  document.getElementById("daymonth").innerHTML = date1;
  document.getElementById("daymonth1").innerHTML = date4;
  document.getElementById("daymonth2").innerHTML = date7;
  document.getElementById("dayname").innerHTML = daylist[date];
  document.getElementById("dayname1").innerHTML = daylist[date5];
  document.getElementById("dayname2").innerHTML = daylist[date8];
  document
    .getElementById("weatherIcon")
    .setAttribute(
      "src",
      `https:${finaldata.forecast.forecastday[0].day.condition.icon
        .split()
        .join()}`
    );
  document
    .getElementById("weatherIcon1")
    .setAttribute(
      "src",
      `https:${finaldata.forecast.forecastday[1].day.condition.icon
        .split()
        .join()}`
    );
  document
    .getElementById("weatherIcon2")
    .setAttribute(
      "src",
      `https:${finaldata.forecast.forecastday[2].day.condition.icon
        .split()
        .join()}`
    );
  document.getElementById("daycond").innerHTML =
    finaldata.forecast.forecastday[0].day.condition.text.split().join();
  document.getElementById("daycond1").innerHTML =
    finaldata.forecast.forecastday[1].day.condition.text.split().join();
  document.getElementById("daycond2").innerHTML =
    finaldata.forecast.forecastday[2].day.condition.text.split().join();
  document.getElementById("tempdeg").innerHTML =
    finaldata.forecast.forecastday[0].day.maxtemp_c;
  document.getElementById("tempdegm").innerHTML =
    finaldata.forecast.forecastday[1].day.mintemp_c + "°C";
  document.getElementById("tempdegm2").innerHTML =
    finaldata.forecast.forecastday[2].day.mintemp_c + "°C";
  document.getElementById("tempdegm1").innerHTML =
    finaldata.forecast.forecastday[0].day.mintemp_c + "°C";
  document.getElementById("tempdeg1").innerHTML =
    finaldata.forecast.forecastday[1].day.maxtemp_c;
  document.getElementById("tempdeg").style.cssText='color:aqua';
  document.getElementById("tempdeg2").innerHTML =
    finaldata.forecast.forecastday[2].day.maxtemp_c;
  document.getElementById("city").innerHTML = finaldata.location.name;
  document.getElementById("city1").innerHTML = finaldata.location.name;
  document.getElementById("city2").innerHTML = finaldata.location.name;
}
function searchLocation(e) {
  weatherapi(e.value);
}
let searchinput = document.querySelector("#search");
let searchbutton = document.querySelector("#btn-search");
searchbutton.addEventListener("click", function () {
  searchLocation(searchinput);
});
searchinput.addEventListener("input", function () {
  searchLocation(searchinput);
});
searchinput.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    searchLocation(searchinput);
  }
});

async function getlocation(lat, lon) {
  let response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
  );
  let finaldata = await response.json();
  console.log(finaldata);
  weatherapi(finaldata.address.country);
}
navigator.geolocation.getCurrentPosition(function (p) {
  let lat = p.coords.latitude;
  let lon = p.coords.longitude;
  getlocation(lat, lon);
});
});
