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

function icon() {
	switch(s) {
	case "Google Chrome":
		url = "\t<img src =\"img/chrome.png\" />";
		break;
	case "Apple Safari":
		url = "\t<img src =\"img/safari.png\" />";
		break;
	case "Opera":
		url = "\t<img src =\"img/opera.png\" />";
		break;
	case "Mozilla Firefox":
		url = "\t<img src =\"img/firefox.png\" />";
		break;
	case "Microsoft Internet Explorer":
		url = "\t<img src =\"img/explorer.png\" />";
		break;
	default:
		url = "";
		break;
	}
	return url;
}
