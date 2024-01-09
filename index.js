var container = document.querySelector('.containers');
var search = document.querySelector('.search-box button');
var weatherBox = document.querySelector('.weather-box');
var weatherDetails = document.querySelector('.weather-details');
var error404 = document.querySelector('.not-found');
const wrapper = document.querySelector('.wrapper');

// console.log(search)


search.addEventListener('click', async function () {

    const APIkey = '45d67a908c00c7fcd4494eba72884fe8'
    const city = document.querySelector('.search-box input').value;

    if (city == '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIkey}`).then(response => response.json())
        .then(data => {
            console.log(data.cod)
            if (data.cod == '404') {
                // container.style.height = '400px';
                // weatherBox.classList.remove('active');
                // weatherDetails.classList.remove('active');
                // error404.classList.add('active');
                city.value = '';
                wrapper.innerHTML = '';
                
                wrapper.insertAdjacentHTML('beforeend', `<div class="containers"><div class="not-found active">
                                                        <div class="box">
                                                            <img src="images/404.png" alt="">
                                                            <p>Ops! Location not found!</p>
                                                        </div>
                                                    </div></div>`);
                container.style.height = '400px';
                
                console.log(container)
                return;
            }

            const forcastDays = [];
            const threeDaysForcast = data.list.filter(forcast => {
                const forcastDate = new Date(forcast.dt_txt).getDate();
                if (!forcastDays.includes(forcastDate)) {
                    return forcastDays.push(forcastDate);
                }
            })


            const createWeatherCard = (weatherItem) => {
                switch (weatherItem.weather[0].main) {
                    case 'Clear':
                        img = 'images/clear.png';
                        break;
                    case 'Rain':
                        img = 'images/rain.png';
                        break;
                    case 'Snow':
                        img = 'images/snow.png';
                        break;
                    case 'Clouds':
                        img = 'images/cloud.png';
                        break;
                    case 'Mist':
                        img = 'images/mist.png';
                        break;
                    case 'Haze':
                        img = 'images/mist.png';
                        break;
                    default:
                        img = 'images/clear.png';
                }

                return `<div class="containers">
                        <h2 class="active">Day: ${weatherItem.dt_txt.split(" ")[0]}</h2>
                        <div class="weather-box active">
                            <div class="box">
                                <div class="info-weather">
                                    <div class="weather">
                                        <img src=${img} alt="">
                                        <p class="temp">${weatherItem.main.temp}<span>°C</span></p>
                                        <p class="description">${weatherItem.weather[0].description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="weather-details active">
                            <div class="humidity">
                                <i class="fa-solid fa-water"></i>
                                <div class="text">
                                    <div class="info-humidity">
                                        <span>${weatherItem.main.humidity}%</span>
                                    </div>
                                    <p>Humidity</p>
                                </div>
                            </div>
                            <div class="wind">
                                <i class="fa-solid fa-wind"></i>
                                <div class="text">
                                    <div class="info-wind">
                                        <span>${weatherItem.wind.speed}Km/h</span>
                                    </div>
                                    <p>Wind Speed</p>
                                </div>
                            </div>
                        </div>
                    </div>`


                
            }


            city.value = '';
            wrapper.innerHTML = '';

            console.log(threeDaysForcast)
            threeDaysForcast.splice(2,3).forEach(weatherItem => {
                wrapper.insertAdjacentHTML('beforeend', createWeatherCard(weatherItem));

            });


            // container.style.height = '555px';
            // weatherBox.classList.add('active');
            // weatherDetails.classList.add('active');
            // error404.classList.remove('active');





            /////////////////////////////////

            // const image = document.querySelector('.weather-box img');
            // const temperature = document.querySelector('.weather-box .temp');
            // const description = document.querySelector('.weather-box .description');
            // const humidity = document.querySelector('.weather-details .humidity span');
            // const wind = document.querySelector('.weather-details .wind span');


            ///////////////////////////////////////



            // switch (threeDaysForcast[0].weather[0].main) {
            //     case 'Clear':
            //         image.src = 'images/clear.png';
            //         break;
            //     case 'Rain':
            //         image.src = 'images/rain.png';
            //         break;
            //     case 'Snow':
            //         image.src = 'images/snow.png';
            //         break;
            //     case 'Clouds':
            //         image.src = 'images/cloud.png';
            //         break;
            //     case 'Mist':
            //         image.src = 'images/mist.png';
            //         break;
            //     case 'Haze':
            //         image.src = 'images/mist.png';
            //         break;
            //     default:
            //         image.src = 'images/clear.png';
            // }

            // temperature.innerHTML = `${parseInt(data.list[0].main.temp)}<span>°C</span>`
            // description.innerHTML = `${data.list[0].weather[0].description}`
            // humidity.innerHTML = `${data.list[0].main.humidity}%`
            // wind.innerHTML = `${parseInt(data.list[0].wind.speed)}Km/h`


        })


})



let currentDate = new Date().toJSON().slice(0, 10);
