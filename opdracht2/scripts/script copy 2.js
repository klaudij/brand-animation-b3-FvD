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

let pokemonHTML = '';


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
    
    //.....
    const filteredPokemons = allPokemon.filter(aPokemon => {
      return aPokemon.name.toLowerCase().includes(searchString);
    });
    pokemonHTML = '';
    filteredPokemons.forEach(pokemon => {
      pokemonHTML += `
        <li draggable="true"> 
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
          <h2> ${pokemon.name}</h2>									
        </li>
      `;
    });
    list.innerHTML = pokemonHTML;
    console.log(filteredPokemons);
});


////////////////////////////////////////////////////
//POKEMON API DOCUMENTATIE https://pokeapi.co
////////////////////////////////////////////////////
//API URL https://pokeapi.co/api/v2/pokemon?limit=200&offset=0
const URL = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";
//haalt lijst uit 2e section in HTML
const list = document.querySelector("section:nth-of-type(2) ul");

//functie
async function getPokemon() {

  const pokemons = await getData(URL);
  const pokemonCollection = pokemons.results.map(async pokemonObject => {
    const pokemon = await getData(pokemonObject.url);
    return pokemon;
  });

  pokemonCollection.forEach(pokemon => {
    pokemon.then((pokemon) => {
    
      //array uit de data opslaan in een var
      allPokemon.push(pokemon);
      let pokemonHTML = `
        <li draggable="true"> 
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
          <h2> ${pokemon.name}</h2>									
        </li>
      `;
      list.insertAdjacentHTML("beforeend", pokemonHTML);
    })
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