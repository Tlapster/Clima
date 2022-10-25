const prediccion = navigator.geolocation;
const KEY = "e165aba5a10eec3f9cbb854d10e366aa";
const predictionCards = document.getElementById('predictionCards')

prediccion.getCurrentPosition((position) =>{
    const {latitude, longitude} = position.coords;
    const units = "metric";
    const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&main&appid=${KEY}&units=${units}` 

    fetch(URL)
        .then(response => response.json())
        .then(response => {
            console.log(response);

            let fecha =22;
            let filteredList = response.list.filter( (clima) => {
                console.log(clima.dt_txt.substr(8, 2));
                if(parseInt(clima.dt_txt.substr(8, 2)) != fecha){
                    fecha++
                    return clima
                }
            });
            console.log(filteredList);

        })


});

const cardD1 = (filteredList) => {
    let predictionCards = document.createElement('div');
    
    predictionCards.innerHTML = `
    <p>"Height: Dia 1"</p>
    `;
    return (predictionCards)
}