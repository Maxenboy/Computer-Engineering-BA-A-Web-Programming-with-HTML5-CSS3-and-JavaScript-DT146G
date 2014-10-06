/*  Max Åberg
 mabe1411
 aaberg.max@gmail.com   */
var ok;

function init() {
	while (!ok) {
		hide();
		var nbrOfTeams = prompt("Please specify the number of teams that will participate:");
		var pattern = /^[2-9]+$|[1-9][0-9]+$/;
		if (!pattern.test(nbrOfTeams)) {
			window.alert("Sorry, the input can only be numbers and at least 2");
		} else {
			ok = true;
			localStorage.setItem('nbrOfTeams', nbrOfTeams);
		}
	}
}

function hide() {
	if (document.getElementById("random").checked) {
		document.getElementById("wrapper").setAttribute("class", "hidden");
		document.getElementById("wrapper1").setAttribute("class", "");
	} else {
		document.getElementById("wrapper1").setAttribute("class", "hidden");
		document.getElementById("wrapper").setAttribute("class", "");
	}
}

function generate() {
	var text = decodeURIComponent(window.location.search.substring(1)).replace(/\s+/g, '\\n');
	text = text.replace(/\+/g, ' ');
	var choise = text.substr(text.search("radio") + 6, 6);
	if (choise == "random") {
		var names = text.substring(text.search("area") + 5, text.length).split("\\n");
		var test = new String();
		names = names.filter(function(e) {/*Removes white-space elements*/
			return /\S+/.test(e);
		});
		random(names);
	} else {
		var men = text.substring(text.search("mentext") + 8, text.search("womentext") - 1).split("\\n");
		var women = text.substring(text.search("womentext") + 10, text.search("area") - 1).split("\\n");
		men = men.filter(function(e) {/*Removes white-space elements*/
			return /\S+/.test(e);
		});
		women = women.filter(function(e) {/*Removes white-space elements*/
			return /\S+/.test(e);
		});
		gender(men, women);
	}
}

function random(names) {
	var nbrOfTeams = localStorage.getItem('nbrOfTeams');
	var rest = names.length % nbrOfTeams;
	var minimumParticipants = Math.floor(names.length / nbrOfTeams);
	document.getElementById("result").innerHTML = names.length;
	var distribution = "";
	var index = 0;
	switch(true) {
	case (rest==1):
		for ( i = 0; i < nbrOfTeams; i++) {
			distribution += ("Team" + (i + 1) + "<br>");
			for ( j = 0; j < rest + minimumParticipants; j++) {
				index = Math.random((Math.floor * names.length));
				/*wrong*/
				distribution += names[index] + "<br>";
				names.splice(index, 1);
			}
			distribution += "<br><br>";
			rest = 0;
		}
		break;
	case (rest>1):
		distribution += rest;
		break;
	default:
		distribution += "normal";
	}
	/*document.getElementById("result").innerHTML = distribution;*/
}

function gender(men, women) {

}
