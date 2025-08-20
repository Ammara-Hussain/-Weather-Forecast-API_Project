/* Grabbing the UI elemetns and rendering them in JS file*/
/*CREATING THE JS SKELETON*/
//DOM manipulation by reference variables
//#location
//.search-btn
//#city
//#temperature
//#condition
//#humidity
//#wind
//#feeling

const locationSearchField = document.getElementById('location');
const searchBtn =document.getElementById('search-btn');
const cityName = document.getElementById('city');
const tempertureValue = document.getElementById('temperature');
const weatherCondition =document.getElementById('condition');
const humidityValue = document.getElementById('humidity');
const windSpeed = document.getElementById('wind');
const windDirection =document.getElementById('direction');
const weatherFeeling = document.getElementById('feeling');
const checkingStatus=document.getElementById('status');

//set UI status
function setStatus(msg){
   checkingStatus.textContent=msg;
}
function renderLoading(isLoading){
    setStatus(isLoading? "Fetching Weather...": " Weather details will appear here...");
}
function renderError(msg){
    setStatus(msg || "Something went wrong...")
    //reset placeholders
    locationSearchField.value="";
   
    cityName.textContent = "_ _";
    tempertureValue.textContent = "_ _";
    weatherCondition.textContent = "_ _";
    humidityValue.textContent =" _ _";
    windSpeed.textContent = "_ _";
    windDirection.textContent= "_ _";
    weatherFeeling.textContent="_ _";
  
      }

      //deg to compass direction function
      function degToCompass(deg){
        const directions=["North" ,"North-East", "East", "South-East", "South", "South-West", "West","North-West"];
        const index=Math.round(deg/45)%8;
        return directions[index];
      }
     //call OpenWeatherAPI
    const apiKey = "b222176f38b6956f0a8616c6233b3e52";
    async function getWeather(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;
       try{
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200){
            console.log(data);
cityName.textContent=  data.name;
tempertureValue.innerHTML=` ${data.main.temp} &deg;C `;
weatherCondition.textContent=  ` ${data.weather[0].description}`;
humidityValue.textContent=` ${data.main.humidity} %`;
windSpeed.textContent=` ${data.wind.speed} km/hr`;
windDirection.innerHTML=` ${degToCompass(data.wind.deg)} (${data.wind.deg})&deg; `;
weatherFeeling.innerHTML=` ${data.main.feels_like} &deg;C`;


setStatus("Weather data Updated");
        }
else{
    setStatus(data.message || "City not found");
}
        }catch(error){
            renderError("Network error, please try again.")
        }

    }




    


      //Handlers
      function handleSearch(){
const city = (locationSearchField.value || " ").trim();
      
   if(!city){
    renderError("Please enter a city name.");
    return;
   }
    
    renderLoading(true);
  getWeather(city).finally(()=>{
    renderLoading(false);

  });
}
searchBtn.addEventListener('click',handleSearch);
locationSearchField.addEventListener('keydown',(e)=>{
    if(e.key ==="Enter"){
        handleSearch();
    }
});
renderLoading(false);
//step to add a custom color to the mock data / api data*/
/*let apiElements = [ cityName,tempertureValue, weatherCondition, humidityValue,windDistance,weatherFeeling,checkingStatus];
apiElements.forEach(e1=>{
    e1.classList.add('api-data');
})*/
