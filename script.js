const BASE_URL =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
  const dropdowns = document.querySelectorAll(".dropdown select");
  const btn = document.querySelector("form button");
  const fromcurr = document.querySelector(".from select");
  const tocurr = document.querySelector(".to select");
  const msg = document.querySelector(".msg");

   

for(let select of dropdowns) {
  for(currcode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currcode;
    newoption.value=currcode;
      if(select.name === "from" && currcode==="USD"){
        newoption.selected=select;
      }
      else if (select.name === "to" && currcode==="INR"){
        newoption.selected=select;
      }
      
    select.append(newoption);
  }
  select.addEventListener("change", (evt) =>{
    updateflag(evt.target);
  });






};
const updateflag = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img  = element.parentElement.querySelector("img");
  img.src = newsrc;


};
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector("form input");
  let amtval = amount.value;
  if(amtval ==="" || amtval<1){
    amtval = 1;
    amount.value = "1";
  }

let apiURL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
  
console.log(apiURL);
let response = await fetch(apiURL);
console.log(response);
let data = await response.json();
console.log(data);
let from = fromcurr.value.toLowerCase();
let to = tocurr.value.toLowerCase();

let rate = data[from][to];

console.log(rate);
let finalamount = amtval*rate;
msg.innerText = `${amtval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;

});