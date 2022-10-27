
const geolocation = navigator.geolocation;
const KEY = "e165aba5a10eec3f9cbb854d10e366aa";
const currentGeo = document.getElementById('geoBtn');
const climaHoy = document.getElementById('climaToday')
const imgHero = document.getElementById('imgHero');
const mainTxt = document.getElementById('mainTxt');
const infoClima = document.getElementById('infoClima');
const prediccion = navigator.geolocation;
const preCards = document.getElementById('predictionCards')
const mainDateTxt = document.getElementById('mainDateTxt')
const btnGeoLocation = document.getElementById('aSvg')

let fechaHoy = new Date();
console.log(fechaHoy);
let diaSemana = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
let mesAnio = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dic'];

let currentTime = new Date();


function positionToday() { geolocation.getCurrentPosition((position) =>{
    const {latitude, longitude} = position.coords;
    const units = "metric";
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&main&appid=${KEY}&units=${units}&icons`

    fetch(URL)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        climaHoyCard(data);
        infoClimaCards(data);
    } )
    
    
});
}

positionToday();

btnGeoLocation.addEventListener('click', positionToday);

const climaHoyCard = (data) => {
        climaHoy.innerHTML = `
        <div id="imgHero"><img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="open eeather icon"></div>
        <div class="temp">
            <h1 class="mainTxt">${parseInt(data.main.temp)}</h1>
            <h3 class="mainTxt_h3">ºC</h3>
        </div>

        <h2 id="climaMainTxt">${data.weather[0].description}</h2>

        <h4 id="mainDateTxt">Today - ${diaSemana [fechaHoy.getDay()]}, ${fechaHoy.getDate()} ${mesAnio [fechaHoy.getMonth()]}</h4>
           

        <div id="geoCity">
                <svg id="positionVector" xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 23.5q1.45 0 2.475-1.025Q27.5 21.45 27.5 20q0-1.45-1.025-2.475Q25.45 16.5 24 16.5q-1.45 0-2.475 1.025Q20.5 18.55 20.5 20q0 1.45 1.025 2.475Q22.55 23.5 24 23.5Zm0 16.55q6.65-6.05 9.825-10.975Q37 24.15 37 20.4q0-5.9-3.775-9.65T24 7q-5.45 0-9.225 3.75Q11 14.5 11 20.4q0 3.75 3.25 8.675Q17.5 34 24 40.05ZM24 44q-8.05-6.85-12.025-12.725Q8 25.4 8 20.4q0-7.5 4.825-11.95Q17.65 4 24 4q6.35 0 11.175 4.45Q40 12.9 40 20.4q0 5-3.975 10.875T24 44Zm0-23.6Z"/></svg>
                <h5>${data.name}</h5>
         </div>
    `;
     
};
const infoClimaCards = (data) => {
    infoClima.innerHTML = `
        <div id=mainInfoClimaCards>
            <p id="tittleToday">Today's Hightlights</p>
            <div id="climaCardStatus">
                <h5>Wind Status</h5>
                <div id="windData">${data.wind.speed}<p> Km/h</p></div>
            </div>

            <div id="climaCardStatus">
                <h5>Humidity</h5>
                <div id="humidityData">${data.main.humidity}
                <p> %</p></div>
                <div class="progress">
                <div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="60"
                aria-valuemin="0" aria-valuemax="100" style="width: ${data.main.humidity}%;">
                </div>
                </div>
            </div>

            <div id="climaCardStatusV2">
                <h5>Visibility</h5>
                <div id="humidityData">${parseInt(data.visibility)/1000} 
                <p> Km</p></div>
            </div>

            <div id="climaCardStatusV2">
                <h5>Air Pressure</h5>
                <div id="humidityData">${data.main.pressure}
                <p> hpa</p></div>
            </div>
        </div>  
        <br>

        <h6>Created by Kolob Tlapale - GitHub</h6> 
        <br> 

    `;
}

prediccion.getCurrentPosition((position) =>{
    const {latitude, longitude} = position.coords;
    const units = "metric";
    const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&main&appid=${KEY}&units=${units}` 

    fetch(URL)
    .then(response => response.json())
    .then(datap => {
            console.log(datap);

            let fecha = fechaHoy.getDate();
            let filteredList = datap.list.filter( (clima) => {
                console.log(clima.dt_txt.substr(8, 2));
                if(parseInt(clima.dt_txt.substr(8, 2)) != fecha){
                    fecha++
                    return clima
                }
            });
            console.log(filteredList);
            pCards(filteredList);
        });
        

})

const pCards = (filteredList) => {
    
    preCards.innerHTML=`
    <div class="preDivCards">
        <div class="climaDay">
            <h5>Tomorrow</h5>
            <div class="imgPreCard"><img src="https://openweathermap.org/img/w/${filteredList[0].weather[0].icon}.png" alt="open eeather icon"></div>

            <div class="temps">
            <h1 class="temp_max">${parseInt(filteredList[0].main.temp_max)} ºC</h1>
    
            <h1 class="temp_min">${parseInt(filteredList[0].main.temp_min)} ºC</h1>
            </div>
        </div>
        <div class="climaDay">
            <h5>${fechasCards(2)}</h5>
            <div class="imgPreCard"><img src="https://openweathermap.org/img/w/${filteredList[3].weather[0].icon}.png" alt="open eeather icon"></div>
            <div class="temps">
            <h1 class="temp_max">${parseInt(filteredList[1].main.temp_max)} ºC</h1>
    
            <h1 class="temp_min">${parseInt(filteredList[1].main.temp_min)} ºC</h1>
            </div>
        </div>

        <div class="climaDay">
            <h5>${fechasCards(3)}</h5>
            <div class="imgPreCard"><img src="https://openweathermap.org/img/w/${filteredList[2].weather[0].icon}.png" alt="open eeather icon"></div>
            <div class="temps">
            <h1 class="temp_max">${parseInt(filteredList[2].main.temp_max)} ºC</h1>
    
            <h1 class="temp_min">${parseInt(filteredList[2].main.temp_min)} ºC</h1>
            </div>
         </div>

         <div class="climaDay">
            <h5>${fechasCards(4)}</h5>
            <div class="imgPreCard"><img src="https://openweathermap.org/img/w/${filteredList[3].weather[0].icon}.png" alt="open eeather icon"></div>
            <div class="temps">
            <h1 class="temp_max">${parseInt(filteredList[3].main.temp_max)} ºC</h1>
    
            <h1 class="temp_min">${parseInt(filteredList[3].main.temp_min)} ºC</h1>
            </div>
         </div>

         <div class="climaDay">
            <h5>${fechasCards(5)}</h5>
            <div class="imgPreCard"><img src="https://openweathermap.org/img/w/${filteredList[4].weather[0].icon}.png" alt="open eeather icon"></div>
            <div class="temps">
            <h1 class="temp_max">${parseInt(filteredList[4].main.temp_max)} ºC</h1>
    
            <h1 class="temp_min">${parseInt(filteredList[4].main.temp_min)} ºC</h1>
            </div>
         </div>
    </div>
   

    `; 
}

function formatDate(date) {
    
    let diaN = date.getDate();
  
    let mesindex = date.getMonth();
    let meses = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic"
    ];
    let mes = meses[mesindex];
    let dayIndex = date.getDay();
    let days = [
      "Dom",
      "Lun",
      "Mar",
      "Mier",
      "Jue",
      "Vie",
      "Sab"
    ];
    let day = days[dayIndex];
  
    return `${day} ${diaN} ${mes}`;
  }

  function fechasCards(sum){
    
    let nuevoDia = "";
  
  // ciclo para la escritura en el dom de los siguientes 4 dias en el forecast 
    
      let tomorrow =  new Date(); //26 10 2022
      tomorrow.setDate(currentTime.getDate() + sum) //29 10 2022
        nuevoDia = (formatDate(tomorrow)); // solo di el formato de fecha de java
        return nuevoDia
      
    }
    
  
