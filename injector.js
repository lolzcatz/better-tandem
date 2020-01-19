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
  console.log("THIS IS THE SHORTCODE");
  console.log(obj['shareId'] + "-" + obj['sessionId']);
};

const banner = `
  <div  style="position: fixed;z-index: 99999999;top: 10px;left: 10px;">
      <button onclick="TogetherJS(this); return false;">Start a session</button>
      <button onclick="TogetherJS(this); return false;">Join a Session</button>
      <button id="getShortCode">Get Session</button>
      <form>
        <input id='input' placeholder='session code'/>
        <button id='submit'>Submit</button>
      </form>
  </div>
`;




injectScript()
injectDiv(banner);


document.getElementById('submit').onclick = function () {
  injectSessionId(document.getElementById('input').value);
}

document.getElementById('getShortCode').onclick = function () {
  getShortCode();
}