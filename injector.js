const injectDiv = (divHtml) => {
  const body = document.getElementsByTagName('body')[0];
  const div = document.createElement('div');
  div.innerHTML = divHtml;
  body.appendChild(div);
};

const injectScript = () => {
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

const showStart = () => {
  alert("hi");
  return false;
};


const copyToClipboard = (str) => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

const banner = `
  <div class="better-tandem">
    <div class="fab">
      <span class="fab-action-button" id="fab-button">
            <i class="fab-action-button__icon"></i>
        </span>
      <ul class="fab-buttons">
        <li class="fab-buttons__item" id="stop" style="display:none;" onclick="TogetherJS(this); document.getElementById('fab-button').style.backgroundColor = 'red'; document.getElementById('stop').style.display = 'none'; document.getElementById('host').style.display = 'block'; document.getElementById('join').style.display = 'none'; document.getElementById('shortcode').style.display = 'none';" >
          <div class="fab-buttons__link" data-tooltip="Stop Session">
            <i class="icon-material icon-material_stop"></i>
          </div>
        </li>
        <li class="fab-buttons__item" id="host" onclick="TogetherJS(this); document.getElementById('fab-button').style.backgroundColor = 'green'; document.getElementById('stop').style.display = 'block'; document.getElementById('host').style.display = 'none'; document.getElementById('join').style.display = 'block'; document.getElementById('shortcode').style.display = 'block';">
          <div class="fab-buttons__link" data-tooltip="Host a session" >
            <i class="icon-material icon-material_start"></i>
          </div>
        </li>
        <li class="fab-buttons__item" id="join" style="display:none;" >
          <div class="fab-buttons__link" data-tooltip="Join a Session">
            <i class="icon-material icon-material_add"></i>
          </div>
        </li>
        <li class="fab-buttons__item" id="shortcode" style="display:none;" >
        <div class="fab-buttons__link" data-tooltip="Copy Shortcode to Clipboard">
          <i class="icon-material icon-material_paste"></i>
        </div>
      </li>
      </ul>
    </div>
  </div>
`;

injectScript()
injectDiv(banner);


document.getElementById('join').onclick = function () {
  let code = prompt("Enter your shortcode");
  joinWithShortCode(code);
}

document.getElementById('shortcode').onclick = function () {
  let code = getShortCode();
  copyToClipboard(code);
}