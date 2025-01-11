let cities = [
    {
        arabicName: "القاهرة",
        name: "Al Qāhirah"
    },
    {
        arabicName: "الإسكندرية",
        name: "Al Iskandarīyah"
    },
    {
        arabicName: "قنا",
        name: "Qinā"
    },
    {
        arabicName: "البحيرة",
        name: "Al Buḩayrah"
    },
    {
        arabicName: "الغربية",
        name: "Al Gharbīyah"
    },
    {
        arabicName: "شمال سيناء",
        name: "Shamāl Sīnā'"
    }
]
let theCities = document.getElementById("the-cities")
for (city of cities) {
    theCities.innerHTML += `
    <option>${city.arabicName}</option>
    `
}
theCities.addEventListener("change", function(){
    cities;
    document.querySelector(".my-city").innerHTML= this.value
    let isoCity = "";
    for (city of cities) {
        if (this.value === city.arabicName) {
            isoCity = city.name;
        }
    }
    prayerTimings(`${isoCity}`)
})
function prayerTimings(isoCity) {
    let params = {
        country: "EG",
        city: isoCity
    }
    axios.get('https://api.aladhan.com/v1/timingsByCity/user', {
    params: params
    })
    .then(function (response) {
        const timings = response.data.data.timings;
        fillTime(".fajr-time", timings.Fajr);
        fillTime(".sunrise-time", timings.Sunrise);
        fillTime(".dhuhr-time", timings.Dhuhr);
        fillTime(".asr-time", timings.Asr);
        fillTime(".maghrib-time", timings.Maghrib);
        fillTime(".isha-time", timings.Isha);
        let date = response.data.data.date.gregorian;
        document.querySelector(".date-now").innerHTML = `${date.year}/${date.month.number}/${date.day}`
    })
    .catch(function (error) {
    console.log(error);
    });  
}
function fillTime(prayer, time) {
    document.querySelector(prayer).innerHTML = time
}
prayerTimings("Al Qāhirah")