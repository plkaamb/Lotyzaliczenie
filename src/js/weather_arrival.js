import { placeOfFlight } from "./place_of_flight";

export function weather_arrival (destination) {

   let loc = [];

   switch(destination){
      case "JFK":
      loc = [40.73, -74, "Nowy Jork"];
         break;
      case "CDG":
      loc = [48.86, 2.34, "Paryż"];
         break;  
      case "HND":
      loc = [35.65, 139.83, "Tokyo"];
         break;
      case "CPT":
      loc = [-33.91, 18.42, "Cape down"];
         break;
         default: 
         loc = [40.73, -74, "Nowy Jork"];
   }

   const baseId = '0cd1536259cd2cd694236421101bfbc5';
   const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${loc[0]}&lon=${loc[1]}&exclude=daily&units=metric&appid=${baseId}`
   
   // url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${local}&APPID=${baseId}`;
   
   
   const dataTime = document.querySelector('.wrap__choice__weather2__data');
   const temp = document.querySelector('.wrap__choice__weather2__temp');
   const img = document.querySelector('.wrap__choice__weather2__img');
   const local = document.querySelector('.wrap__choice__weather2__local');
   const info = document.querySelector('.wrap__choice__weather2__info');
   
   fetch(url2).then((resp) =>{
      return resp.json();
   })
   .then((data) =>{
      // console.log(data)
      // console.log(data.hourly[0]);
      
      ///wyświetlenie miasta
         info.innerText = ""
         const divInfo = document.createElement('div');
         divInfo.setAttribute('class', 'wrap__choice__weather2__info');
         divInfo.innerText = loc[2]
         info.appendChild(divInfo)
      

      ///zrobienie godziny 
         let tab = data.hourly[0]
         const czas = new Date(tab.dt * 1000)
         // console.log(czas)
         let time = Intl.DateTimeFormat("pl-PL",{dateStyle: 'full', timeStyle: 'short'}).format(czas)
   
      ///Dodanie daty i godziny
         dataTime.innerHTML = ""
         const divData = document.createElement('div');
         divData.setAttribute('class', 'wrap__choice__weather2__data')
         divData.innerText = 'Data: ' + ' ' + time;
         dataTime.appendChild(divData)
   
   
      ////temperatura   
         const tempr = tab.temp
         temp.innerHTML = ""
         const divTemp = document.createElement('div');
         divTemp.setAttribute('class', 'wrap__choice__weather2__temp')
         divTemp.innerText = 'Temperatura: ' + ' ' + tempr;
         temp.appendChild(divTemp);
   
      ////zdjęcie  http://openweathermap.org/img/wn/10d@2x.png
   
      let tab1 = data.hourly[0].weather[0].icon
   
      img.innerHTML = ""
      const divIMG = document.createElement('img');
      divIMG.setAttribute('class', 'wrap__choice__weather2__img')
      divIMG.setAttribute('src', `http://openweathermap.org/img/wn/${data.hourly[0].weather[0].icon}.png`);
      img.appendChild(divIMG);
      
   
      ///odczuwalna pogoda 
      const locals = tab.feels_like
   
      local.innerHTML = ""
      const divLocal = document.createElement('div');
      divLocal.setAttribute('class', 'wrap__choice__weather2__local')
      divLocal.innerText = 'Temperatura odczuwalna: ' + ' ' + locals ;
      local.appendChild(divLocal);
   
   })
}


