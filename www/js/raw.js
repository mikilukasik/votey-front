var preferredLanguage = 'en';
var devMode = false;  //TODO: set this from dev UI 

var apiServer;
if (devMode) {
  apiServer = {
    host: 'http://localhost',//'http://localhost',
    port: 5000
  };
} else {
  apiServer = {
    host: 'http://votey.dokku.jay.li'
  };
}

var setCookie = function(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
var getCookie = function(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}