let tempCelc = document.querySelector('.temp')
let tempDescription = document.querySelector('.description')
let clock = document.querySelector('.clock')
let place = document.querySelector('.place')

const input = document.querySelector(".input")
const button = document.querySelector(".button")
button.addEventListener('click', main)

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     main()
    }
})


function main() {


     city = input.value
    let data = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7132115f480498cabb4cafad0d0f8b1d&units=metric`


    //convert api response to json
    fetch(data)
        .then(response => {
            return response.json()
        })
        .then(data => {
            
            const img = new Image();  
            const container = document.getElementById("container");
            container.appendChild(img);
            console.log(data.main.temp)
            tempCelc.innerHTML = (data.main.temp).toFixed(1) + " \u00B0C"
            tempDescription.innerHTML = data.weather[0].description + " wilgotność: " + data.main.humidity + "%"
            place.innerHTML = city
            let offset = data.timezone / 3600
            setInterval(getLocalTime, 1000)
            
            function getLocalTime() {
                const today = new Date();

                let hour = today.getHours()
                if(hour<10) hour = "0" + hour

                let min = today.getMinutes()
                if(min<10) min = "0" + min

                let sec = today.getSeconds()
                if(sec<10) sec = "0" + sec

                let localTime = (hour-2+offset) + ":" + min + ":" + sec
                clock.innerHTML = localTime
            }
            
        })
}
