
import { placeOfFlight } from "./place_of_flight";


export function weather_departure (origin) {

   let loc = [];

   switch(origin){
      case "WAW":
      loc = [52.13, 21, "Warszawa"];
         break;
      case "GDN":
      loc = [55.20, 18.38, "Gdańsk"];
         break;  
      case "LUZ":
      loc = [51.15, 22.34, "Lublin"];
         break;
            default: 
            loc = [52.13, 21, "Warszawa"];
   }
   

   const baseId = '0cd1536259cd2cd694236421101bfbc5';
   const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${loc[0]}&lon=${loc[1]}&exclude=daily&units=metric&appid=${baseId}`
   
   // url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${local}&APPID=${baseId}`;
   
   
   const dataTime = document.querySelector('.wrap__choice__weather__data');
   const temp = document.querySelector('.wrap__choice__weather__temp');
   const img = document.querySelector('.wrap__choice__weather__img');
   const local = document.querySelector('.wrap__choice__weather__local');
   const info = document.querySelector('.wrap__choice__weather__info');
   
   fetch(url2).then((resp) =>{
      return resp.json();
   })
   .then((data) =>{
      // console.log(data);
      // console.log(data.hourly[0]);

      ///wyświetlenie miasta
         info.innerHTML = "";
         const divInfo = document.createElement('div');
         divInfo.setAttribute('class', 'wrap__choice__weather__info')
         divInfo.innerHTML = loc[2]
         info.appendChild(divInfo)


      ///zrobienie godziny 
         let tab = data.hourly[0]
         const czas = new Date(tab.dt * 1000)
         let time = Intl.DateTimeFormat("pl-PL",{dateStyle: 'full', timeStyle: 'short'}).format(czas)
      
      //Dodanie daty i godziny
         dataTime.innerHTML = ""
         const divData = document.createElement('div');
         divData.setAttribute('class', 'wrap__choice__weather__data')
         divData.innerText = 'Data: ' + ' ' + time;
         dataTime.appendChild(divData)
         
   
   
      ////temperatura   
         const tempr = tab.temp
         temp.innerHTML = ""
         const divTemp = document.createElement('div');
         divTemp.setAttribute('class', 'wrap__choice__weather__temp')
         divTemp.innerText = 'Temperatura: ' + ' ' + tempr;
         temp.appendChild(divTemp);
   
      ////zdjęcie  http://openweathermap.org/img/wn/10d@2x.png
   
      let tab1 = data.hourly[0].weather[0].icon
      img.innerHTML = ""
      const divIMG = document.createElement('img');
      divIMG.setAttribute('class', 'wrap__choice__weather__img')
      divIMG.setAttribute('src', `http://openweathermap.org/img/wn/${data.hourly[0].weather[0].icon}.png`);
      img.appendChild(divIMG);
      
   
      ///odczuwalna pogoda 
      const locals = tab.feels_like
      local.innerHTML = ""
      const divLocal = document.createElement('div');
      divLocal.setAttribute('class', 'wrap__choice__weather__local')
      divLocal.innerText = 'Temperatura odczuwalna: ' + ' ' + locals;
      local.appendChild(divLocal);
   
      

   })
}


