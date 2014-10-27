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

/*The function that calls the different generation functions depending on which radiobutton that is checked*/
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
	if (choice == "random") { //if the radiobutton random is checked
		//searches and stores the names given in the textarea, splits on newline, returning an array with all the names in separate elements
		names = text.substring(text.search("area") + 5, text.length).split("\\n");
        //removes, if present, elements that are empty strings
        removeEmptyString(names);
        //performs the random generation
        random(names);
	} else { //if the radiobutton gender is checked
        ////searches and stores the men names given in the textarea, splits on newline, returning an array with all the men names in separate elements
        men = text.substring(text.search("mentext") + 8, text.search("womentext") - 1).split("\\n");
        //searches and stores the women names given in the textarea, splits on newline, returning an array with all the women names in separate elements
        women = text.substring(text.search("womentext") + 10, text.search("area") - 1).split("\\n");
        //removes, if present, elements that are empty strings
        removeEmptyString(men);
        //removes, if present, elements that are empty strings
        removeEmptyString(women);
        //performs the gender generation
        gender(men, women);
    }
    //creates an audio object with given path to music file
    var audio =new Audio('../TeamGenerator/music/flyby.mp3');
    //plays the audio file
    audio.play();
    //writes the end result of the generation to the div "result"
    document.getElementById("result").innerHTML = endResult;
}
//the function that calls the random concatination and produces the end result
function random(names) {
	if (names.length !== 0 && names.length > localStorage.getItem('nbrOfTeams')) { //checks if the amount of participants exceeds zero and the amount of teams
        //gets the number of teams from the local storage
        nbrOfTeams = localStorage.getItem('nbrOfTeams');
        //performs the concatination for the function random
        randomConcat(names);
		for ( i = 0; i < participants.length; i++) { //produces the end result
            //concatinates the different teams to the end result
            endResult += participants[i];
        }
	} else { //gives an error message if the amount of participants not exceeds zero or the amount of teams
		endResult += "Sorry, the number of participants must be greater then the number of teams <br> Please close this tab to re-generate";
	}
	
}
//the function that calls the gender concatination and produces the end result
function gender(men, women) {
	if (men.length !== 0 && women.length !== 0 && (men.length + women.length) > localStorage.getItem('nbrOfTeams')) { //checks if the amount of participants exceeds zero and the amount of teams
        //gets the number of teams from the local storage
        nbrOfTeams = localStorage.getItem('nbrOfTeams');
        //performs the concatination for the function gender
        concat(men, women);
		for ( i = 0; i < participants.length; i++) { //produces the end result
            //concatinates the different teams to the end result
            endResult += participants[i];
        }
	} else { //gives an error message if the amount of participants not exceeds zero or the amount of teams
		endResult += "Sorry, the number of participants must be greater then the number of teams <br> Please close this tab to re-generate";
	}
}
//the function that concatinates the headings with the participants for the random function
function randomConcat(names) {
    //adds the team headings with given iterations
    addHeading(localStorage.getItem('nbrOfTeams'));
    //picks the candicates given the array of participants, an index and the number of teams;
    pickCandidate(names,team,nbrOfTeams);
}
//the function that concatinates the headings with the participants for the gender function
function concat(men, women) { 
    //adds the team headings with given iterations
    addHeading(localStorage.getItem('nbrOfTeams'));
    //picks the candicates given the array of participants, an index and the number of teams;
    pickCandidate(men,team,nbrOfTeams);
    pickCandidate(women,team,nbrOfTeams);
}
//the function that picks the candidates with a random index
function pickCandidate(array, team, nbrOfTeams){
    //resets the team index
    team = 0;
	while (array.length > 0) { //continues until all the names are added to the end result array
        //makes a random number between 0 - array.length
        index = Math.floor((Math.random() * array.length));
        //puts the randomized participant in the end result array 
        participants[team] += (array[index]) + "<br>";
        //removes the participant, that just was added to the end result array, from the original array
        array.splice(index, 1);
        //increases the team index
        team++;
		if (team >= nbrOfTeams) { //resets the team index if it exceeds the number of teams
			team = 0;
		}
	}
}
//the function that adds the team headings
function addHeading(iterations){
	for ( i = 0; i < iterations; i++) { //makes the headings
        //adds the heading to the and array
        participants.push('<h1 contenteditable="true" ><u>Team ' + (i + 1) + '</u></h1>');
    }
}
//the function that removes all the empty strings in a given array
function removeEmptyString(array){
    for( i = 0; i < array.length; i++){
        if (array[i].length < 1 ){ //if the element has a length of 0 (empty) it's removed
            array.splice(i, 1);
    }
}

}
//the function that adds eventlisteners to the html elements
function switchOnRadio() {
    //stores the page name
    var page = pageName();
   if (page == "index.html") { //checks if the page is the home page
    //adds an evenlistener to the div "random" and is initiated with a click
    document.getElementById("random").addEventListener("click", hide, false);
      //adds an evenlistener to the div "gender" and is initiated with a click
      document.getElementById("gender").addEventListener("click", hide, false);
  }
}
//the function that makes the generation and is called upon load of the result page
function view() {
    //stores the page name
    var page = pageName();
   if (page == "view.html") { //checks if the page is the generation result page
    //makes the generation
    generate();
}
}
//the function that hides a div element and is called upon load of the home page
function initiate() {
    //stores the page name
    var page =pageName();
	if (page == "index.html") { // checks if the page is the home page
		init();
	}
}
//the function that returns a page's name
function pageName(){
 return window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);
}
//adds an eventlistener upon load of the page and calls the function switchOnRadio
window.addEventListener("load", switchOnRadio, false);
//adds an eventlistener upon load of the page and calls the function view
window.addEventListener("load", view, false);
//adds an eventlistener upon load of the page and calls the function initiate
window.addEventListener("load", initiate, false);
