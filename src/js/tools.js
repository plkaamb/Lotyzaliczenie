import { placeOfFlight } from "./place_of_flight";
import jpg from '../../public/flay.jpg'


const plane_1 = document.querySelector('#plane_1');
const plane_2 = document.querySelector('#plane_2');
const icon_link1 = document.querySelector('.header__settings__icon-link--1');
const icon_link2 = document.querySelector('.header__settings__icon-link--2');
const header__luggage = document.querySelector('.header__luggage');

const costLuggage1 = document.querySelector('#cost_1')
const costLuggage2 = document.querySelector('#cost_2')
const costLuggage3 = document.querySelector('#cost_3')
const costbtn = document.querySelector('.header__luggage__btn--btn')
const summaryBtn = document.querySelector('.choice__flights__summary')
const exitBtn = document.querySelector(".summaryTicket__exit")
const confirmationBtn = document.querySelector(".summaryTicket__confirmation")
const summaryTicket = document.querySelector(".summaryTicket")
const summaryTicketBox = document.querySelector(".summaryTicket__box")
const ccy = document.querySelector(".choice__flights__ccy")
const summaryTicketInput = document.querySelector('.summaryTicket__input')
const inputName = document.querySelector(".summaryTicket__input__name")
const inputSurname = document.querySelector(".summaryTicket__input__surname")

const logoBtn = document.querySelector(".logoBtn")
const logTicket = document.querySelector(".logTicket")
const logBoxTicket = document.querySelector(".logTicket__boxTicket")
const logConfirm = document.querySelector(".logTicket__confirmation")
const logExit = document.querySelector(".logTicket__exit")
const inputLogin = document.querySelector(".logTicket__input__login")
const inputHaslo = document.querySelector(".logTicket__input__haslo")


///funkcja do wyświetlania samolotów
export function btnReservation(destination) {

   let loc = ""

   switch(destination){
      case "JFK":
         loc = "JFK";
            break;
      case "CDG":
         loc = "CDG"
            break;
      case "HND":
         loc = "HND";
         break;
      case "CPT":
            loc = "CPT";
         break;       
         default: 
         loc = "coś nie tak ";
   }
   // console.log(loc)

   if(loc === "HND" || loc === "JFK" || loc === "CPT")
   {
      plane_1.style.display = 'block'
      plane_2.style.display = "none"
   }
   else if(loc === "CDG")
   {
      plane_2.style.display = 'block'
      plane_1.style.display = "none"
   }


}

//funkcja do wyświetlania bagaży i jakich
export function luggage (){

   if(header__luggage.style.display === "none"){
      header__luggage.style.display = "block"
      
   }else {
      header__luggage.style.display = "none"
   }
}

icon_link1.addEventListener('click', luggage)
icon_link2.addEventListener('click', luggage)

///funkcja która zwaraca wartość po wybraniu jaki bagaż EUR=4,6 USD=4,2

export function costLuggage (){

   if(ccy.value === "PLN"){
      const valueLuggage = (+costLuggage1.value) + (+costLuggage2.value) + (+costLuggage3.value)
      return valueLuggage
   }else if (ccy.value === "EUR"){
      const valueLuggage = ((+costLuggage1.value) + (+costLuggage2.value) + (+costLuggage3.value) ) / 4.6
      return valueLuggage.toFixed(2)
   }else if(ccy.value === "USD"){
      const valueLuggage = ((+costLuggage1.value) + (+costLuggage2.value) + (+costLuggage3.value) )/ 4.2
      return valueLuggage.toFixed(2)
   }
   

   // const valueLuggage = (+costLuggage1.value) + (+costLuggage2.value) + (+costLuggage3.value)

   // return valueLuggage

}
costbtn.addEventListener('click', costLuggage)


/// dostaje dane w postaci ceny biletu dzien wylotu itp
let valueTickets = []
let valueTicketcost = ''
export function TicketChoice () {
   const choiceTickets1 = document.querySelectorAll('.choice__flights__tickets__div')
   // console.log(choiceTickets1)
   
   choiceTickets1.forEach(el => {
      el.addEventListener("click",(e) => {
      // const numbers = /[0-9]+$/;

         const dateDepartures = e.path[1].childNodes[1].innerText
         const numberOfChange = e.path[1].childNodes[2].innerText
         const flighttime = e.path[1].childNodes[3].innerText

         const result = e.path[1].childNodes[0].innerText
         valueTicketcost = +result.match(/[0-9]+/g)
         
         valueTickets.push(result,dateDepartures,numberOfChange,flighttime)
      
      })
   
   });
}

// pobiera id z siedzeń samolotów - oraz push do dwóch tablić siedzenia zajęte i usunięte
let numberSeatsDelete =[]
let numberOfSeats = []
export function seatsSvg_1(){

   const seats = document.querySelectorAll('#ico_main, #ico_preferred, #ico_premium, #ico_man, #First');

   seats.forEach(elem => {
      elem.addEventListener('click', (event) =>{
         console.log(event)
         if(event.path[0].style.fill == "red"){
            event.path[0].style.fill = "green"
            const valueSeat = elem.dataset.seatnumv
            numberSeatsDelete.push(valueSeat)

         }else{
            event.path[0].style.fill = "red"
            const valueSeat = elem.dataset.seatnumv
            numberOfSeats.push(valueSeat)
         }

      })
   })

}


///FUNKCJA PODSUMOWYUJĄCA
export function summary(){

   //// pokazanie okna 
   if(summaryTicket.style.display === "none"){
      summaryTicket.style.display = "block"  
   }


   /// filter na wybor siedzien
const tablica_A = numberOfSeats
const tablica_B = numberSeatsDelete

Array.prototype.diff = function(a){
   return this.filter(function(i) {return a.indexOf(i) < 0});
}
tablica_A.diff(tablica_B)
let newTabel = tablica_A.diff(tablica_B)


/// cena za bilety 
let valueLuggage = costLuggage()
// console.log(valueLuggage)
// console.log(valueTickets[0])
// console.log(newTabel)

   ///Dane odnośnie wyboru biletu + wyświetlenie
   let valueTicket = valueTickets
   
   if(valueTicket.length == 0 ){
      const announcement = document.createElement("div")
      announcement.classList.add("summaryTicket__box__announcement") 
      announcement.textContent = `Proszę pierw wybrać lot i dokonać rezerwacji.`
      summaryTicketBox.appendChild(announcement)
      summaryTicketInput.style.display = 'none'
   }else if(valueLuggage == 0){
      const announcement = document.createElement("div")
      announcement.classList.add("summaryTicket__box__announcement") 
      announcement.textContent = `Proszę pierw określić jaki będzie bagaż "na górze po prawej stronie.`
      summaryTicketBox.appendChild(announcement)
      summaryTicketInput.style.display = 'none'
   }else if(newTabel.length == 0){
      const announcement = document.createElement("div")
      announcement.classList.add("summaryTicket__box__announcement") 
      announcement.textContent = `Proszę wybrać miejsca w samolocie.`
      summaryTicketBox.appendChild(announcement)
      summaryTicketInput.style.display = 'none'
   }else{
      const price = document.createElement("div")
      price.classList.add("summaryTicket__box__price") 
      const departure = document.createElement("div")
      departure.classList.add("summaryTicket__box__departure") 
      const numOfChange = document.createElement("div")
      numOfChange.classList.add("summaryTicket__box__numOfChange") 
      const duration = document.createElement("div")
      duration.classList.add("summaryTicket__box__duration") 
   
      price.textContent = `${valueTicket[0]} ${ccy.value}`
      departure.textContent = `${valueTicket[1]}`
      numOfChange.textContent = `${valueTicket[2]}`
      duration.textContent = `${valueTicket[3]}`
   
      summaryTicketBox.appendChild(price)
      summaryTicketBox.appendChild(departure)
      summaryTicketBox.appendChild(numOfChange)
      summaryTicketBox.appendChild(duration)

   //stworzenie boxDiva pod wyświetlenie siedzień
   const boxNumbSeats = document.createElement("div")
   boxNumbSeats.classList.add("summaryTicket__box__num")

      ///stworzenie div pod infromacje 
   summaryTicketBox.appendChild(boxNumbSeats)
   const boxNumbSeatsInfo = document.createElement("div")
   boxNumbSeatsInfo.classList.add('summaryTicket__box__num__information')
   boxNumbSeatsInfo.textContent = "Twoje miejsca w samolocie to: "
   boxNumbSeats.appendChild(boxNumbSeatsInfo)

   ///wyświetlenie ceny biletu
   const luggage = document.createElement("div")
   luggage.classList.add("summaryTicket__box__luggage")
   luggage.textContent = `Cena za bagaż: ${valueLuggage} ${ccy.value}.`
   summaryTicketBox.appendChild(luggage)
   

      /// wyświetlenie siedzeń na stronie w pętli
   newTabel.forEach(function(item) {
      const numberSeats = document.createElement('div')
      numberSeats.classList.add('summaryTicket__box__num__numSeats')
      numberSeats.textContent = `${item},`
      boxNumbSeats.appendChild(numberSeats)

      

   });

         ///łączny koszt =  ilość siedzeń x cena biletu
         const summaryCost = newTabel.length * valueTicketcost + (+valueLuggage)
         const totalCostPrice = document.createElement("div")
         totalCostPrice.classList.add("summaryTicket__box__totalCostPrice")
         totalCostPrice.textContent = `Łączna wartość do zapłaty ${summaryCost} ${ccy.value}`
         summaryTicketBox.appendChild(totalCostPrice)

            summaryTicketInput.style.display = 'block'
            inputName.value = '';
            inputSurname.value = '';
   }


}
summaryBtn.addEventListener('click', summary)


//wyjście z okna podsumowywującego
function exitSummary(){
   if(summaryTicket.style.display === "block"){
      summaryTicket.style.display = "none"  
      summaryTicketBox.innerHTML = ""
      valueTickets = []
      // numberSeatsDelete =[]
      // numberOfSeats = []

      // const seats = document.querySelectorAll('#ico_main, #ico_preferred, #ico_premium, #ico_man, #First');

      // seats.forEach(function(item) {
      //    console.log(item)
      //       item.style.fill = "green"
      //    })     
   }
}
exitBtn.addEventListener('click', exitSummary)


confirmationBtn.addEventListener("click", () =>{

   if(summaryTicketInput.style.display === 'none'){
      alert("Nie możesz potwierdzić")
   }else if((inputName.value && inputSurname.value) == 0){
      alert("Prosze podać imię i nazwisko")
   }else{
      if(summaryTicket.style.display === "block"){
         summaryTicket.style.display = "none"  
         summaryTicketBox.innerHTML = ""
         numberSeatsDelete =[]
         numberOfSeats = []
   
         const tabelReservationOb = {
            Name: inputName.value,
            Surname: inputSurname.value,
         }
   
         tabelReservation.push(tabelReservationOb)
         console.log(tabelReservation)

   }
   }
})

logoBtn.addEventListener("click", () =>{

   const login_1 = {
      login: 'kamil',
      haslo: 'kamil',
      totalCostPrice: 2550,
      departure: '2022-06-12',
      numberOfChange: 1,
      flightDuration: 1300,
      placeOnThePlane: ['C20', 'B20'],
      fromWhere: 'Gdańsk',
      toWhere: 'Paryż'
   }

   const login_2 = {
      login: 'dawid',
      haslo: 'dawid',
      totalCostPrice: 1550,
      departure: '2022-06-12',
      numberOfChange: 1,
      flightDuration: 1300,
      placeOnThePlane: ['C17', 'B17'],
      fromWhere: 'Gdańsk',
      toWhere: 'Paryż'
   }

   if(logTicket.style.display === "none"){
      logTicket.style.display = "block"

      logConfirm.addEventListener("click", () =>{
         
         if(login_1.login === inputLogin.value && login_1.haslo === inputHaslo.value ){
            logBoxTicket.innerHTML = ""

            const fromWhere = document.createElement("div")
            fromWhere.classList.add("logTicket__boxTicket__fromWhere")
            fromWhere.textContent = `Wylot z: ${login_1.fromWhere}`

            const toWhere = document.createElement("div")
            toWhere.classList.add("logTicket__boxTicket__toWhere")
            toWhere.textContent = `Przylot do: ${login_1.toWhere}`         

            const price = document.createElement("div")
            price.classList.add("logTicket__boxTicket__price")
            price.textContent = `Łączna cena: ${login_1.totalCostPrice}`

            const departure = document.createElement("div")
            departure.classList.add("logTicket__boxTicket__departure")
            departure.textContent = `Czas trwania lotu: ${login_1.departure}`

            const numberOfChange = document.createElement("div")
            numberOfChange.classList.add("logTicket__boxTicket__numberOfChange")
            numberOfChange.textContent = `Ilość przesiadek: ${login_1.numberOfChange}`

            const flightDuration = document.createElement("div")
            flightDuration.classList.add("logTicket__boxTicket__flightDuration")
            flightDuration.textContent = `Długość lotu: ${login_1.flightDuration} min`

            const placeOnThePlane = document.createElement("div")
            placeOnThePlane.classList.add("logTicket__boxTicket__placeOnThePlane")
            placeOnThePlane.textContent = `Ilość przesiadek: ${login_1.placeOnThePlane}`

            logBoxTicket.appendChild(fromWhere)
            logBoxTicket.appendChild(toWhere)
            logBoxTicket.appendChild(price)
            logBoxTicket.appendChild(departure)
            logBoxTicket.appendChild(numberOfChange)
            logBoxTicket.appendChild(flightDuration)
            logBoxTicket.appendChild(placeOnThePlane)
            
         }else if((login_2.login === inputLogin.value && login_2.haslo === inputHaslo.value )){
            logBoxTicket.innerHTML = ""
            const fromWhere = document.createElement("div")
            fromWhere.classList.add("logTicket__boxTicket__fromWhere")
            fromWhere.textContent = `Wylot z: ${login_2.fromWhere}`

            const toWhere = document.createElement("div")
            toWhere.classList.add("logTicket__boxTicket__toWhere")
            toWhere.textContent = `Przylot do: ${login_2.toWhere}`         

            const price = document.createElement("div")
            price.classList.add("logTicket__boxTicket__price")
            price.textContent = `Łączna cena: ${login_2.totalCostPrice}`

            const departure = document.createElement("div")
            departure.classList.add("logTicket__boxTicket__departure")
            departure.textContent = `Czas trwania lotu: ${login_2.departure}`

            const numberOfChange = document.createElement("div")
            numberOfChange.classList.add("logTicket__boxTicket__numberOfChange")
            numberOfChange.textContent = `Ilość przesiadek: ${login_2.numberOfChange}`

            const flightDuration = document.createElement("div")
            flightDuration.classList.add("logTicket__boxTicket__flightDuration")
            flightDuration.textContent = `Długość lotu: ${login_2.flightDuration} min`

            const placeOnThePlane = document.createElement("div")
            placeOnThePlane.classList.add("logTicket__boxTicket__placeOnThePlane")
            placeOnThePlane.textContent = `Ilość przesiadek: ${login_2.placeOnThePlane}`

            logBoxTicket.appendChild(fromWhere)
            logBoxTicket.appendChild(toWhere)
            logBoxTicket.appendChild(price)
            logBoxTicket.appendChild(departure)
            logBoxTicket.appendChild(numberOfChange)
            logBoxTicket.appendChild(flightDuration)
            logBoxTicket.appendChild(placeOnThePlane)
         }else{
            alert('podaj dobry login i hasło')
         }

         
      })


   }

   
})

logExit.addEventListener("click", () =>{
   if(logTicket.style.display === "block"){
      logTicket.style.display = "none"
      logBoxTicket.innerHTML = ""
      inputLogin.value = ""
      inputHaslo.value = ""
   }


})