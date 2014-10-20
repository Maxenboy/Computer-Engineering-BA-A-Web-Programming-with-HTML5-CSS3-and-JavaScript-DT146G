/*  Max Åberg
mabe1411
aaberg.max@gmail.com   */

//the variable that contains the URI string
var text = "";
//The variable that contains the number of teams provided by the user
var nbrOfTeams = 0;
//the variable that contains which type, provided by the user, of generation should be performed
var choice = "";
//the variable that contains the end result of the generation
var endResult = "";
//the variable that contains the index, which the random function uses
var index = 0;
//the variable that contains the index for a man, which is used in the gender function
var manindex = 0;
//the variable that contains the index for a woman, which is used in the gender function
var womenindex = 0;
//the variable that contains an array where the different names are placed in each element, used by the random function
var names = [];
//the variable that contains an array where the different names are placed in each element, the elements order are changed
var participants = [];
//the variable that contains an array where the different men names are placed in each element
var men = [];
//the variable that contains an array where the different women names are placed in each element
var women = [];
//the variable that acts as a teamindex string representation
var team = 0;

/*The functions that calls the function hide
 * It's called when the start page is loaded
 * Hide, hides the opposite generation textarea(s) */
 function init() {
   hide();
}

/*The function hides the gender or the random variant of div depending on which radiobutton that's checked'*/
function hide() {
	if (document.getElementById("random").checked) {//checks if the radibutton random is checked/clicked
		document.getElementById("genderwrapper").setAttribute("class", "hidden");
		//applies the css class hidden to the gender div
		document.getElementById("randomwrapper").setAttribute("class", "");
		//removes the css class hidden to the random div
	} else {
		document.getElementById("randomwrapper").setAttribute("class", "hidden");
		//applies the css class hidden to the random div
		document.getElementById("genderwrapper").setAttribute("class", "");
		//removes the css class hidden to the gender div
	}
}

/*The function that calls the different functions depending on which radiobutton that is checked*/
function generate() {
	//stores the form part from the URI and replaces all newlines with \n
	text = decodeURIComponent(window.location.search.substring(1)).replace(/\s+/g, '\\n');
	//replaces all the +-signs with white-spaces
	text = text.replace(/\+/g, ' ');
	//searches and stores the part from the URI that states which radiobutto is checked
	choice = text.substr(text.search("radio") + 6, 6);
	//searches and stores the part from the URI that states how many teams the user provided
	nbrOfTeams = text.substr(text.search("nbrOfTeams") + 11, text.search("radio") - 12);
	//stores the number of teams to the local storage
	localStorage.setItem('nbrOfTeams', nbrOfTeams);
	if (choice == "random") {
		//searches and stores the names given in the textarea, split on newline, returning an array with all the names in separate elements
		names = text.substring(text.search("area") + 5, text.length).split("\\n");
		removeWhiteSpace(names);
		random(names);
	} else {
		men = text.substring(text.search("mentext") + 8, text.search("womentext") - 1).split("\\n");
		women = text.substring(text.search("womentext") + 10, text.search("area") - 1).split("\\n");
		removeWhiteSpace(men);
		removeWhiteSpace(women);
		gender(men, women);
	}
    document.getElementById("result").innerHTML = endResult;
}

function random(names) {
	if (names.length !== 0 && names.length > localStorage.getItem('nbrOfTeams')) {
		nbrOfTeams = localStorage.getItem('nbrOfTeams');
		randomConcat(names);
		for ( i = 0; i < participants.length; i++) {
			endResult += participants[i];
		}
	} else {
		endResult += "Sorry, the number of participants must be greater then the number of teams <br> Please close this tab to re-generate";
	}
	
}

function gender(men, women) {
	if (men.length !== 0 && women.length !== 0 && (men.length + women.length) > localStorage.getItem('nbrOfTeams')) {
		nbrOfTeams = localStorage.getItem('nbrOfTeams');
		concat(men, women);
		for ( i = 0; i < participants.length; i++) {
			endResult += participants[i];
		}
	} else {
		endResult += "Sorry, the number of participants must be greater then the number of teams <br> Please close this tab to re-generate";
	}
}

function randomConcat(names) {
	team = 0;
	addHeading(localStorage.getItem('nbrOfTeams'));
	pickCandidate(names,team,nbrOfTeams);
}

function concat(men, women) {
	team = 0;
	addHeading(localStorage.getItem('nbrOfTeams'));
	pickCandidate(men,team,nbrOfTeams);
	pickCandidate(women,team,nbrOfTeams);
}

function pickCandidate(array, team, nbrOfTeams){
	while (array.length > 0) {
		index = Math.floor((Math.random() * array.length));
		participants[team] += (array[index]) + "<br>";
		array.splice(index, 1);
		team++;
		if (team >= nbrOfTeams) {
			team = 0;
		}
	}
}

function addHeading(iterations){
	for ( i = 0; i < iterations; i++) {
		participants.push("<h1><u>Team " + (i + 1) + "</u></h1>");
	}
}

function removeWhiteSpace(array){
    for( i = 0; i < array.length; i++){
        if (array[i].length < 1 ){
            array.splice(i, 1);
        }
    }
    
}

function switchOnRadio() {
   var path = window.location.pathname;
   var page = path.substring(path.lastIndexOf('/') + 1);
   if (page == "index.html") {
      document.getElementById("random").addEventListener("click", hide, false);
      document.getElementById("gender").addEventListener("click", hide, false);
  }
}

function view() {
   var path = window.location.pathname;
   var page = path.substring(path.lastIndexOf('/') + 1);
   if (page == "view.html") {
      generate();
  }
}

function initiate() {
	var path = window.location.pathname;
	var page = path.substring(path.lastIndexOf('/') + 1);
	if (page == "index.html") {
		init();
	}
}

window.addEventListener("load", switchOnRadio, false);
window.addEventListener("load", view, false);
window.addEventListener("load", initiate, false);
