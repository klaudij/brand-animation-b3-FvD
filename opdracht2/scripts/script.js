// JavaScript Document
console.log("welcome ;)");

////////////////////////////////////////////////////
//POKEMON API DOCUMENTATIE https://pokeapi.co
////////////////////////////////////////////////////

//API URL https://pokeapi.co/api/v2/pokemon?limit=200&offset=0
const URL = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";

//selecteert lijst uit 2e section in HTML
const pokedexList = document.querySelector("section:nth-of-type(2) ul");


//functie voor informatie halen uit de API en dit in de html vastleggen + li oproepen uit pokedex ul & event voor add/delete functie + list.js library
function getPokemon() {
  //vragen van de data uit de API
   getData(URL).then((data) => {
     console.log(data.results);
 
     //array uit de data opslaan in een var
     var allPokemon = data.results;
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
         //Voegen van de li achteraan de ul in de HTML
         pokedexList.insertAdjacentHTML("beforeend", pokemonHTML);
         // console.log(data);


        //ADD/DELETE POKEMON TO TEAM WITH CLICK
        //functie staat op regel 87
        //roept uit de 'POKEDEX' de li's op
        var lastPokemon = pokedexList.querySelector('li:last-of-type');
        //event functie
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
  // 8. de 'getData' functie geeft de 'jsonData' weer terug aan de 'getPokemon' functie
	return (fetch(URL) //1. een verzoek aan de API om data op te halen
		.then ( //2. gaat verder als API antwoord geeft
      //3. je krijgt 'response'-object met data terug(kan nog niet mee aan de slag)
      response  => response.json() // 4.'response'-object zet je om naar JSON (met jSON kan je hier in js aan de slag)
       )

		.then ( //5. als de response is omgezet naar JSON kun je verder
      //6. de naam van de naar JSON omgezette info is 'jsonData'(naam ag zelf verzinnen)
      jsonData  => {return jsonData} // 7. de JSON ('jsonData') geef je terug aan de 'getData' functie
      )
	);
}

// start de functie --> hiermee worden de funtie 'getPokemon' in de html geladen
window.addEventListener('DOMContentLoaded', getPokemon);


////////////////////////////////////////////////////
//ADD/DELETE POKEMON TO TEAM WITH CLICK FUNCTION
////////////////////////////////////////////////////

function addToTeam(e){
  //Roept de gehele 'li' (img en h2 erin) van de pokemon aan als je op de 'li' klikt
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
    //appendchild--> is used to insert a new node or reposition an existing node as the last child of a particular parent node
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
// selecteren van de Team section
var myTeamSection = document.querySelector('#team');
// selecteren van de Team heading
var myTeamHeading = document.querySelector('section#team h2');
// selecteren van de pokedex section
var pokedexSection = document.querySelector('#pokedex');
// selecteren van de pokedex heading
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
  // bepalen van welke toets is ingedrukt
	switch(e.key) {
    // als right arrow is dan dit allemaal doen. 
		case "ArrowRight":
			toThePokedex(); // ---> functie toThePokedex wordt opgeroepen
      // console.log('right')
			break;// break zorgt ervoor dat toetsen niet onnodig gecheckt worden.

     // als left arrow is dan dit allemaal doen. 
		case "ArrowLeft":
      // console.log('left')
			toMyTeam();// ---> functie toMyTeam wordt opgeroepen
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
// selecteren van de ul's
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
      }else{
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




