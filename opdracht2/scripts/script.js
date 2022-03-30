// JavaScript Document
console.log("howdy");



////////////////////////////////////////////////////
//VOOR DE SEARCH BAR
////////////////////////////////////////////////////

//haalt search bar uit 2e section in HTML
const searchBar = document.getElementById('searchBar');
//Een reference naar alle pokemons 
let allPokemon = [];
console.log(allPokemon);


//keyup functie, wanneer user in searchbar typt
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    
    // Pokemons filteren met de user input
    const filteredPokemons = allPokemon.filter(aPokemon => {
    return aPokemon.name.toLowerCase().includes(searchString);
    });

	// Lijst legen
  pokedexList.innerHTML = '';

	// Loopen over de gefilterde pokemons 
    filteredPokemons.forEach(pokemon => {

		// List item per pokemon maken 
      	let html = `
        	<li draggable="true" class="${pokemon.types[0].type.name}"> 
         		 <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
              <h3> ${pokemon.id}. ${pokemon.name}</h3>
              <button id="deleteP">X</button>		
			</li>
      	`;

		// List item toevoegen aan de list
    pokedexList.insertAdjacentHTML("beforeend", html);
    });
});




////////////////////////////////////////////////////
//VOOR HET FILTEREN OP TYPE
////////////////////////////////////////////////////
//Selecteren van de select
var filter = document.querySelector('select');

//functie voor het selecteren
function filteren(e){
console.log(e.target.value);

pokedexList.dataset.filter = e.target.value;
}

//EVENT voor het filteren van de types met de select
filter.addEventListener('change', filteren);




////////////////////////////////////////////////////
//POKEMON API DOCUMENTATIE https://pokeapi.co
////////////////////////////////////////////////////
//API URL https://pokeapi.co/api/v2/pokemon?limit=200&offset=0
const URL = "https://pokeapi.co/api/v2/pokemon?limit=700&offset=0";
//haalt lijst uit 2e section in HTML
const pokedexList = document.querySelector("section:nth-of-type(2) ul");

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
        <li draggable="true" class="${pokemon.types[0].type.name}" > 
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
          <h3> ${pokemon.id}. ${pokemon.name}</h3>
          <button id="deleteP">X</button>		
        </li>
      `;       
      // console.log(pokemon.types[0].type.name);
      // De html van de pokemon toevoegen aan de ul
      pokedexList.insertAdjacentHTML("beforeend", html);
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
window.addEventListener('DOMContentLoaded', getPokemon);







////////////////////////////////////////////////////
//RANDOMIZE TEAM
////////////////////////////////////////////////////





////////////////////////////////////////////////////
//SWITCHEN VAN TABS TUSSEN TEAM EN POKEDEX
////////////////////////////////////////////////////
var myTeamSection = document.querySelector('#team');
var myTeamHeading = document.querySelector('section#team h2');
var pokedexSection = document.querySelector('#pokedex');
var pokedexHeading = document.querySelector('section#pokedex h2');


///////////////////
/* EVENTS: CLICK/TAP */
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
//ADD/DELET POKEMON TO TEAM WITH CLICK FUNCTION
////////////////////////////////////////////////////
var deleteP = document.getElementById('deleteP');















////////////////////////////////////////////////////
//DRAG AND DROP SHARED LIST TUSSEN 'MY TEAM' EN 'POKEDEX'
////////////////////////////////////////////////////
//library: https://sortablejs.github.io/Sortable/

var teamList = document.getElementById('teamList');
var dexList = document.getElementById('dexList');

var messageNotice = document.getElementById('notice');

Sortable.create(teamList, {
  group: {
    name: 'teamList',
    // functie voor limit pokemons in 'MY TEAM'
    put: function message(e){
      // wanneer je meer dan 6 pokemons in 'YOU TEAM' wilt plaatsen krijg je een message
      if(e.el.children.length >=6){
        messageNotice.style.display = 'block';      
      }else if(e.el.children.length <= 6){
        messageNotice.style.display = 'none'
      }
      return e.el.children.length <=5;
    }
  },
  animation: 100,
  sort: true,
});

Sortable.create(dexList, {
  group: {
    name: 'dexList',
    put: 'teamList',
  },
  animation: 100,
  sort: false
});



// code from: https://stackoverflow.com/questions/55738619/click-to-swap-elements-between-two-lists
// $("#teamList").on("click",function() {
//   $("#dexList").append($(this));

// });

// $("#dexList").on("click",function() {
//   $("#teamList").append($(this));
// });