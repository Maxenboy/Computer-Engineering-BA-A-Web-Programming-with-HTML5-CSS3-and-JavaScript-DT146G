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

function LoadImage(name) {
	document.getElementById("big").src = document.getElementById(name).src;
	switch(name) {
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

