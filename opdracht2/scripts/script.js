// JavaScript Document
console.log("welcome ;)");

////////////////////////////////////////////////////
//VOOR DE SEARCH BAR
////////////////////////////////////////////////////

//haalt search bar uit 2e section in HTML
const searchBar = document.getElementById('searchBar');
//Een reference naar alle pokemons 
let allPokemon = [];

//functie   
//bron code ---> https://www.youtube.com/watch?v=wxz5vJ1BWrc&t=584s


// WAAR IK ZELF AAN ZAT TE KLOOEIEN
////////////////////////////////////////////////////
// searchBar.addEventListener('keyup', searchResults);
// function searchResults(e) {
//   //wat je in de searchbar intypt in een const plaatsen
//   const searchString = e.target.value.toLowerCase();
//   // console.log(e.target.value);

//   //vanuit alle pokemons (allPokemon) filteren van wat er in de searchbar staat
//   const filteredPokemons = allPokemon.filter(aPokemon => {
//         return aPokemon.name.toLowerCase().includes(searchString);
//     });

//     console.log(filteredPokemons);

// }



////////////////////////////////////////////////////
//POKEMON API DOCUMENTATIE https://pokeapi.co
////////////////////////////////////////////////////

//API URL https://pokeapi.co/api/v2/pokemon?limit=200&offset=0

const URL = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";
//haalt lijst uit 2e section in HTML
const pokedexList = document.querySelector("section:nth-of-type(2) ul");

//functie voor informatie halen uit de API en dit in de html vastleggen + li oproepen uit pokedex & event voor add/delete functie + list.js library
function getPokemon() {
  //vragen van de data uit de API
   getData(URL).then((data) => {
     console.log(data.results);
 
   
     //array uit de data opslaan in een var
     allPokemon = data.results;
     //loop over elke pokemon in de lijst
     allPokemon.forEach((aPokemon) => {
       getData(aPokemon.url).then((data) => {
         //De statische html voor een pokemon
         var pokemonHTML = 
               `<li draggable="true" class="${data.types[0].type.name}"> 
                 <img src="${data.sprites.front_default}" alt="${data.name}">
                 <h3 class="name"> ${data.id}. ${data.name}</h3>
                 <button id="deleteP">X</button>										
               </li>`;
         //Voegen van de HTML in een lijst
         pokedexList.insertAdjacentHTML("beforeend", pokemonHTML);
         // console.log(data);


        //ADD/DELETE POKEMON TO TEAM WITH CLICK
        //functie staat op regel 112
        //roept uit de 'POKEDEX' de li's
        var lastPokemon = pokedexList.querySelector('li:last-of-type');
        lastPokemon.addEventListener('click', addToTeam);
 

         ////////////////////////////////////////////////////
         //VOOR DE SEARCH BAR
         ////////////////////////////////////////////////////
         // MET DE LIBRARY LIST.JS
         var options = {
           valueNames: [ 'name' ]
         };
       
         var pokemonList = new List('pokedex', options);
       });
     });
   });
 };

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
//ADD/DELETE POKEMON TO TEAM WITH CLICK FUNCTION
////////////////////////////////////////////////////
function addToTeam(e){
  //Roept de gehele 'li' van de pokemon aan als je op de 'li' klikt
  var thePokemon = this;
  //roept de dichtbijzijnde 'ul' list van de aangeklikte pokemon(thePokemon)
  var theList = thePokemon.closest('ul');

  //if statement in een if statment
  // als theList de id dexList heeft dan kan je de pokemons van POKEDEX naar MY TEAM toevoegen
  if(theList.id == 'dexList'){
    //roept alle pokemons aan die in de 'MY TEAM' zitten
    var currentTeamMembers = teamList.querySelectorAll('li');

    //als 'MY TEAM' minder dan 6 pokemons bevat kan je een pokemon toevoegen, anders niet
    if(currentTeamMembers.length<6){
    teamList.appendChild(thePokemon);

    // 'team is full' niet van toepassing
    messageNotice.style.display = 'none'; 
    // console.log(thePokemon);
    }else{
      // 'team is full' messge weergeven
      messageNotice.style.display = 'block'; 
    }

  } else{
    //zet pokemon van 'MY TEAM' achterin terug in de 'POKEDEX'
    dexList.appendChild(thePokemon);
  }

}

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
  animation: 0,
  sort: true,
});

Sortable.create(pokedexList, {
  group: {
    name: 'dexList',
    put: 'teamList'
  },
  animation: 0,
  sort: false,
});



