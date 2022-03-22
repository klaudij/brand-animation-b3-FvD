// JavaScript Document
console.log("howdy");

////////////////////////////////////////////////////
// SWIPE TUSSEN DE 'YOUR TEAM' & 'POKEDEX' OP MOBIEL
////////////////////////////////////////////////////
var touchstartX = 0;
var touchendX = 0;

var youTeam = document.querySelector("body section#team");
var pokedex = document.querySelector("body section#pokedex");

var gesturedZone = youTeam;




////////////////////////////////////////////////////
//VOOR DE SEARCH BAR
////////////////////////////////////////////////////

//haalt search bar uit 2e section in HTML
const searchBar = document.getElementById('searchBar');
//Een reference naar alle pokemons 
let allPokemon = [];


//keyup functie, wanneer user in searchbar typt
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    console.log(allPokemon);
    //.....
    const filteredPokemons = allPokemon.filter(aPokemon => {
        return aPokemon.name.toLowerCase().includes(searchString);
    });
    console.log(filteredPokemons);
});


////////////////////////////////////////////////////
//POKEMON API DOCUMENTATIE https://pokeapi.co
////////////////////////////////////////////////////
//API URL https://pokeapi.co/api/v2/pokemon?limit=200&offset=0
const URL = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";
//haalt lijst uit 2e section in HTML
const list = document.querySelector("section:nth-of-type(2) ul");
console.log(list);

let pokemonHTML = '';
//functie
async function getPokemon() {
 //vragen van de data uit de API
  getData(URL).then(async(data) => {
    console.log(data.results);

    //array uit de data opslaan in een var
    allPokemon = data.results;
    //loop over elke pokemon in de lijst
    let listItems = '';
    await allPokemon.forEach(async(aPokemon) => {
      let pokemon = '';
      getData(aPokemon.url).then((data) => {
        pokemon = data;
        //De statische html voor een pokemon
        pokemonHTML += `
          <li draggable="true"> 
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <h2> ${data.name}</h2>									
          </li>
        `;
      });
      listItems += pokemonHTML;
    });


    console.log(listItems);
    // console.log(listItems);
    //Voegen van de HTML in een lijst
    // list.innerHTML += listItems;
  });
}


/****************/
/* FETCH DATA   */
/* RETURNS JSON */
/****************/
async function getData(URL) {
  return fetch(URL)
    .then((response) => response.json())
    .then((jsonData) => jsonData);
}

// start de functie
// getPokemon();
window.addEventListener('DOMContentLoaded', getPokemon);




////////////////////////////////////////////////////
//DRAG AND DROP IN "YOUR TEAM"
////////////////////////////////////////////////////
//library: https://sortablejs.github.io/Sortable/
// var options = {
//   // de tijd van swappen in ms
//   animation: 1000
// }

// var deLijst = document.getElementById('list');
// var sortable = Sortable.create(deLijst, options);




////////////////////////////////////////////////////
//DRAG AND DROP SHARED LIST
////////////////////////////////////////////////////
const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');


// draggables.forEach(draggable => {
//   draggable.addEventListener('dragstart', () => {

//     draggable.classList.add('dragging');
//     console.log('drag start')
//   })

//   draggable.addEventListener('dragend', () => {

//     draggable.classList.remove('dragging');
//     console.log('drag end')
//   })
// })


// containers.forEach(container => {
//   container.addEventListener('dragover', e => {
//     e.preventDefault()
//     console.log('drag over');
//     const draggable = document.querySelectorl('.dragging');
//     container.appendChild(draggable);
//   })
// })