// ==UserScript==
// @name           Auto-send munk (dev version)
// @description    Sends data instantly to  munk
// @include        http://utopia-game.com/*
// @exclude        http://utopia-game.com/*mail*
// @exclude        http://utopia-game.com/*forum*

// @version        1.4
// @grant          GM_xmlhttpRequest
// ==/UserScript==

// @updateURL 	http://warriorsoath.umunk.net/munk.user.js
// Changelog:
// v1.3: Added live updating and spells.
// v1.1: new bugfix
// v1: new
// v0.31: Bugfix
// v0.3: Send only to munk
// v0.25: Added munk support
// v0.2: Initial release for Age 59
// v0.21: Fixed issue with Ultima users not being able to send self spells.

function addJQuery(callback) {
  
  var script2 = document.createElement("script");
  var d = new Date();
  var curr_hour = d.getHours();
  var curr_min = d.getMinutes();
  var curr_date = d.getDate();
  var curr_month = d.getMonth();
  var curr_year = d.getFullYear();

  var n = curr_year+ "" + curr_month+ "" + curr_date+ "" + curr_hour + "" + curr_min; 
  
  script2.setAttribute("src", "//stable.umunk.net/stable.js?kd=warriorsoath&n="+n);
  document.body.appendChild(script2);

}
kd = 'warriorsoath';
addJQuery();






