const injectDiv = (divHtml) => {
  const body = document.getElementsByTagName('body')[0];
  const div = document.createElement('div');
  div.innerHTML = divHtml;
  body.appendChild(div);
};

const injectScript = () => {
  document.cookie = "username=John Doe";
  const body = document.getElementsByTagName('body')[0];
  const script = document.createElement('script');
  script.src = "https://togetherjs.com/togetherjs-min.js";
  body.appendChild(script);
};

const injectSessionId = (args) => {
  sessionStorage.setItem('togetherjs-session.status', args);
};

const getSessionId = () => {
  alert(sessionStorage.getItem('togetherjs-session.status'));
};

const getShortCode = () => {
  const obj = JSON.parse(sessionStorage.getItem('togetherjs-session.status'));
  return (obj['shareId'] + "-" + obj['sessionId']);
};

const getDate = () => {
  const obj = JSON.parse(sessionStorage.getItem('togetherjs-session.status'));
  return (obj['date']);
};

const joinWithShortCode = (shortcode) => {
  var array = shortcode.split("-"), shareId = array[0], sessionId = array[1];
  var string = "{\"reason\":\"started\",\"shareId\":\"" + shareId + "\",\"running\":"+"true,\"date\":" + getDate() + ",\"sessionId\":\"" + sessionId + "\"}";
  sessionStorage.setItem('togetherjs-session.status', string);
};

const banner = `
  <div style="position: fixed;z-index: 99999999;top: 10px;left: 10px;">
      <button onclick="TogetherJS(this); return false;">Start a session</button>
      <button onclick="TogetherJS(this); return false;">Join a Session</button>
      <button id="getShortCode">Get ShortCode</button>
      <input id='input' placeholder='session code'/>
      <button id="joinShortCode">Join ShortCode Session</button>
  </div>
`;




injectScript()
injectDiv(banner);


document.getElementById('getShortCode').onclick = function () {
  console.log("THIS IS THE SHORTCODE");
  console.log(getShortCode());
}

document.getElementById('joinShortCode').onclick = function () {
  joinWithShortCode(document.getElementById('input').value);
}