
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

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.type == "cookies") {
    console.log(request);
    var database = firebase.database()
    database.ref(request.shortCode).set({
      username: "Thayallan Srinathan",
      email: "thayallan.srinathan@gmail.com",
    });
  }
});
