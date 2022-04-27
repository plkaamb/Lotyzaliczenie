import axios from "axios";
import { weather_departure } from "../js/weather_departure";
import { weather_arrival } from "./weather_arrival";
import { btnReservation } from "./tools";
import { TicketChoice } from "./tools";



export function placeOfFlight() {
   const search = document.querySelector('.choice__flights__search')
   const tickets = document.querySelector('.choice__flights__tickets')
   const plane_1 = document.querySelector('#plane_1');
   const plane_2 = document.querySelector('#plane_2');

   function result (){
   
      const origin = document.querySelector(".choice__flights__origin");
      const destination = document.querySelector(".choice__flights__destination");
      const currencyTicket = document.querySelector(".choice__flights__ccy");
      
      
      const options = {
      method: 'GET',
      url: 'https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v2/prices/latest',
      params: {
      destination: destination.value,
      origin: origin.value,
      period_type: 'year',
      one_way: '0',
      trip_class: '0',
      currency: currencyTicket.value,
      page: '1',
      sorting: 'price',
      limit: '10'
      },
      headers: {
         'x-access-token': 'ae2e83cc029240d2047e0a70f4808e22',
         'x-rapidapi-host': 'travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com',
         'x-rapidapi-key': '8f1e946a12msh54c072d30cb1ee6p17d507jsn07627feb2061'
      }
   
      };

      axios.request(options)
      .then(function (response) {
         console.log(response.data);
         return response.data
      })
      .then((data) =>{
         weather_departure(origin.value)
         weather_arrival(destination.value)
         
         
         
            function createElement(tagName, content, attributes){
               const component = document.createElement(tagName);
               
               if(attributes){
                  for(const key in attributes){
                     component.setAttribute(key, attributes[key]);
                  }
               }
               if(content){
                  component.textContent = content;
               }
               return component
            }
   
                  // console.log(`proba ${i}`)
   
                  // const ticket = document.createElement("div");
                  // const price = document.createElement("span")
                  // const departure = document.createElement("span")
                  // const numOfChange = document.createElement("span")
                  // const duration = document.createElement("span")
                  // price.textContent = `cena biletu ${data.data[i].value}`
                  // departure.textContent = `Wylot  ${data.data[i].depart_date}`
                  // numOfChange.textContent = `Liczba przesiadek  ${data.data[i].number_of_changes}`
                  // duration.textContent = `Czas trwania lotu  ${data.data[i].duration} min`
                  
                  // document.body.appendChild(ticket)
                  
                  // ticket.appendChild(price)
                  // ticket.appendChild(departure)
                  // ticket.appendChild(numOfChange)
                  // ticket.appendChild(duration)
                  
                  if(data.data.length === 0){
                     const ticket = createElement("div", 0, {class: "choice__flights__tickets__div"})
                     tickets.appendChild(ticket)

                     const noFlights = createElement("span", "Brak lotów w tym kierunku - wybierz inną opcję. Jedynie możesz zobaczyć po prawej stronie pogodę.",{class: "choice__flights__tickets__div--span"})
                     ticket.appendChild(noFlights)

                     plane_1.style.display = "none"
                     plane_2.style.display = "none"

                     // console.log("brak lotów")
                  }else{
                     btnReservation(destination.value)

                     for(let i=0; i < data.data.length; i++)
                     {
                     const ticket = createElement("div", 0, {class: "choice__flights__tickets__div"}, )
                     
                     const price = createElement("span", `Cena biletu: ${data.data[i].value}`,{class: "choice__flights__tickets__div--span"})
   
                     const departure = createElement("span", `Wylot w dniu:  ${data.data[i].depart_date}`,{class: "choice__flights__tickets__div--span"})

                     const numOfChange = createElement("span", `Liczba przesiadek:  ${data.data[i].number_of_changes}`,{class: "choice__flights__tickets__div--span"})

                     const duration = createElement("span", `Czas trwania lotu:  ${data.data[i].duration} min`,{class: "choice__flights__tickets__div--span"})

                     const reservation = createElement("button", `Rezerwacja`,{class: "choice__flights__tickets__div--btn"})
      
                     ticket.appendChild(price)
                     ticket.appendChild(departure)
                     ticket.appendChild(numOfChange)
                     ticket.appendChild(duration)
                     ticket.appendChild(reservation)
                     tickets.appendChild(ticket)
                     }

                     TicketChoice()
                  }


   
            
   
            })
            .catch(function (error) {
            console.error(error);
            });
      
   
      }
   
      search.addEventListener("click", () => {
         tickets.innerHTML = ''
         result()
      })



}
