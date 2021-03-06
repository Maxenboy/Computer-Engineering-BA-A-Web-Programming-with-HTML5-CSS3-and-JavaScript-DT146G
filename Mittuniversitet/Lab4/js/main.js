/*  Max Åberg
 mabe1411
 aaberg.max@gmail.com   */
var s, sUsrAg = navigator.userAgent, url;

function getBrowser() {
	navigator = window.navigator;

	if (sUsrAg.indexOf("Chrome") > -1) {
		s = "Google Chrome";
	} else if (sUsrAg.indexOf("Safari") > -1) {
		s = "Apple Safari";
	} else if (sUsrAg.indexOf("Opera") > -1) {
		s = "Opera";
	} else if (sUsrAg.indexOf("Firefox") > -1) {
		s = "Mozilla Firefox";
	} else if (sUsrAg.indexOf("MSIE") > -1) {
		s = "Microsoft Internet Explorer";
	} else {
		document.write("Undefined browser");
	}
	return s;
}

function init() {
	var seats = [{
		"nbr" : "1",
		"booked" : "true"
	}, {
		"nbr" : "2",
		"booked" : "false"
	}, {
		"nbr" : "3",
		"booked" : "false"
	}, {
		"nbr" : "4",
		"booked" : "false"
	}, {
		"nbr" : "5",
		"booked" : "false"
	}, {
		"nbr" : "6",
		"booked" : "false"
	}, {
		"nbr" : "7",
		"booked" : "false"
	}, {
		"nbr" : "8",
		"booked" : "false"
	}, {
		"nbr" : "9",
		"booked" : "false"
	}, {
		"nbr" : "10",
		"booked" : "false"
	}, {
		"nbr" : "11",
		"booked" : "false"
	}, {
		"nbr" : "12",
		"booked" : "false"
	}, {
		"nbr" : "13",
		"booked" : "false"
	}, {
		"nbr" : "14",
		"booked" : "false"
	}, {
		"nbr" : "15",
		"booked" : "true"
	}, {
		"nbr" : "16",
		"booked" : "false"
	}, {
		"nbr" : "17",
		"booked" : "false"
	}, {
		"nbr" : "18",
		"booked" : "false"
	}];
	var array = sessionStorage.getItem("places");
	if (!array) {
		sessionStorage.setItem("places", JSON.stringify(seats));
	}
	var sittings = JSON.parse(sessionStorage.getItem("places"));
	checkBooked(sittings);

}

function addEvent() {
	document.getElementById("left").addEventListener("click", enlarge, false);
}

function clickSeats() {
	document.getElementById("first").addEventListener("click", LoadSeat, false);
	document.getElementById("second").addEventListener("click", LoadSeat, false);
}

function book() {
	document.getElementById("sub").addEventListener("click", booking, false);
}

function enlarge(e) {
	document.getElementById("big").src = e.srcElement.src;
	switch(e.srcElement.id) {
	case "global":
		document.getElementById("description").innerHTML = "<strong> Bombardier BD-700 Global Express </strong><br/>	är en ultra long range affärs- och VIP-höghastighetsjet som också har modifierats för militära operationer.";
		break;
	case "challenger":
		document.getElementById("description").innerHTML = "<strong> Bombardier Challenger 600-serien</strong><br/>	är en familj av affärsjetplan designade av Bill Lear och producerade först av Canadair, tills det köptes upp av Bombardier Aerospace under 1986, och sedan av Bombardier.";
		break;
	case "gulf":
		document.getElementById("description").innerHTML = "<strong>Gulfstream</strong><br/>V och G-V SP är affärsjetflygplan tillverkade av General Dynamics' Gulfstream Aerospace i Savannah, Georgia, USA. De används också av den amerikanska militären under beteckningen C-37A.";
		break;
	case "hawk":
		document.getElementById("description").innerHTML = "<strong>Hawker 800 </strong><br/>är ett mellanstort tvåmotorig affärsflygplan. Det är en utveckling av British Aerospace BAe 125, och monteras av Hawker Beechcraft.";
		break;
	case "CEO":
		document.getElementById("description").innerHTML = "<strong> Max Åberg<br/>CEO/Developer/Founder</strong>";
		break;
	case "pilot":
		document.getElementById("description").innerHTML = "<strong>Pilot Sökes</strong><br/> Skicka gärna in din ansökan här: <a href=mailto:aaberg.max@gmail.com>aaberg.max@gmail.com</a>";
		break;
	case "co":
		document.getElementById("description").innerHTML = "<strong> Co-Pilot Sökes</strong><br/> Skicka gärna in din ansökan här: <a href=mailto:aaberg.max@gmail.com>aaberg.max@gmail.com</a>";
		break;
	case "steward":
		document.getElementById("description").innerHTML = "<strong> Flygvärdinna Sökes </strong><br/> Skicka gärna in din ansökan här: <a href=mailto:aaberg.max@gmail.com>aaberg.max@gmail.com</a>";
		break;
	default:
		document.getElementById("description").innerHTML = "<strong> Bombardier BD-700 Global Express </strong><br/>	är en ultra long range affärs- och VIP-höghastighetsjet som också har modifierats för militära operationer.";
		break;
	}
}

function LoadSeat(e) {
	if (document.getElementById(e.srcElement.id).style.backgroundColor != "red") {
		document.getElementById("seat").value = parseInt(document.getElementById(e.srcElement.id).innerHTML, 10);
		if (document.getElementById("seat").value < 7) {
			document.getElementById("business").checked = true;
		} else {
			document.getElementById("business").checked = false;
		}
	}
}

function checkBooked(array) {
	for ( i = 0; i < array.length; i++) {
		if (array[i].booked == "true") {
			document.getElementById(array[i].nbr).style.backgroundColor = "red";
		}
	}
}

function booking() {
	var chairs = JSON.parse(sessionStorage.getItem("places"));
	if (chairs[document.getElementById("seat").value - 1].booked == "true") {
		window.alert("Platsen är redan bokad, välj en annan");
	} else {
		var surname = document.getElementById("surname").value;
		var lastname = document.getElementById("lastname").value;
		var seat = document.getElementById("seat").value;
		var business = document.getElementById("business").checked;
		var plain = document.getElementById("plain").value;
		if ((business && parseInt(seat, 10) < 7) || (!business && parseInt(seat, 10) > 6)) {
			business = ((business) ? "Affärsklass" : "Turistklass");
			chairs[document.getElementById("seat").value - 1].booked = "true";
			sessionStorage.setItem("places", JSON.stringify(chairs));
			checkBooked(chairs);
			var opened = window.open("");
			opened.document.write("<html id=\"boarding\"><head><meta charset=\"utf-8\" /><link type=\"text/css\" rel=\"stylesheet\" href=\"css/main.css\"><title>Boardingkort</title></head><body><header><img src=\"img/logga.png\" alt=\"MaxFlyg logga\"/></header>Boardingkort<hr/><section>" + plain + "<br/>" + surname + "   " + lastname + "<br/>" + "Plats: " + seat + "<br/>" + business + "<br/><img src=\"img/qr.png\" alt=\"QR-kod\"/></section></body></html>");
		} else {
			window.alert("Platsen du försöker boka stämmer inte överens med typ av klass");
		}
	}
}

window.addEventListener("load", init, false);
window.addEventListener("load", addEvent, false);
window.addEventListener("load", clickSeats, false);
window.addEventListener("load", book, false);

