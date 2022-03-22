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

let pokemonHTML = '';
//keyup functie, wanneer user in searchbar typt
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    
    // Pokemons filteren met de user input
    const filteredPokemons = allPokemon.filter(aPokemon => {
      return aPokemon.name.toLowerCase().includes(searchString);
    });

	// Lijst legen
	list.innerHTML = '';

	// Loopen over de gefilterde pokemons 
    filteredPokemons.forEach(pokemon => {

		// List item per pokemon maken 
      	let html = `
        	<li draggable="true"> 
         		 <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
          		<h3> ${pokemon.name}</h3>									
			</li>
      	`;

		// List item toevoegen aan de list
		list.insertAdjacentHTML("beforeend", html);
    });
});


////////////////////////////////////////////////////
//POKEMON API DOCUMENTATIE https://pokeapi.co
////////////////////////////////////////////////////
//API URL https://pokeapi.co/api/v2/pokemon?limit=200&offset=0
const URL = "https://pokeapi.co/api/v2/pokemon?limit=700&offset=0";
//haalt lijst uit 2e section in HTML
const list = document.querySelector("section:nth-of-type(2) ul");

//functie
async function getPokemon() {

  // Pokemon data ophalen uit de API
  const pokemons = await getData(URL);

  // loopen over elke pokemon in de lijst en in een collection opslaan met de goede data
  const pokemonCollection = pokemons.results.map(async pokemonObject => {
    const pokemon = await getData(pokemonObject.url);
    return pokemon;
  });

  //loop over elke pokemon in de collection
  pokemonCollection.forEach(pokemon => {

    pokemon.then((pokemon) => {
      
      // De pokemon toeveogen aan de allPokemon list
      allPokemon.push(pokemon);

      // Voor elke pokemon een list item maken
      let html = `
        <li draggable="true"> 
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
          <h3> ${pokemon.name}</h3>									
        </li>
      `;

      // De html van de pokemon toevoegen aan de ul
      list.insertAdjacentHTML("beforeend", html);
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
//SWITCHEN VAN TABS TUSSEN TEAM EN POKEDEX
////////////////////////////////////////////////////
var myTeamSection = document.querySelector('#team');
var myTeamHeading = document.querySelector('section#team h2');
var pokedexSection = document.querySelector('#pokedex');
var pokedexHeading = document.querySelector('section#pokedex h2');

///////////////////
/* EVENTS: CLICK AND TAP */
///////////////////
// click/tap op My Team tabje --> to My Team
myTeamHeading.addEventListener("click", toMyTeam);

// click/tap op The Pokedex tabje --> to The Pokedex
pokedexHeading.addEventListener("click", toThePokedex);


///////////////////
/* EVENTS: PIJLTJES LINK EN RECHTS */
///////////////////
// klik op rechter/linker pijlte op de toetsenbord
document.addEventListener("keydown", (e) => {
	switch(e.code) {
		case "ArrowRight":
			toThePokedex();
			break;
		case "ArrowLeft":
			toMyTeam();
			break;
	}
});


///////////////////
/* EVENTS: SWIPE */
///////////////////
// Met de HAMMER.js library ----> https://hammerjs.github.io

// swipe naar links op My Team panel --> to The Pokedex
var teamHammer = new Hammer(myTeamSection);
teamHammer.on("swipeleft", toThePokedex);

// swipe right on Pokedex panel --> to My Team
var pokedexHammer = new Hammer(pokedexSection);
pokedexHammer.on("swiperight", toMyTeam);


///////////////////
/* EVENT FUNCTIES */
///////////////////
function toThePokedex() { 
	// active op de POKEDEX zetten
	myTeamSection.classList.remove("tabActive");
	pokedexSection.classList.add("tabActive");
};
	
function toMyTeam() {
	// active op de MY TEAM zetten
	myTeamSection.classList.add("tabActive");
	pokedexSection.classList.remove("tabActive");
};





////////////////////////////////////////////////////
//DRAG AND DROP IN "YOUR TEAM"
////////////////////////////////////////////////////
//library: https://sortablejs.github.io/Sortable/

var options = {
  animation: 1000
}


var deLijst = document.getElementById('list');
var sortable = sortable.create(deLijst, options);











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