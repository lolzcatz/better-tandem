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

const banner = `
  <div  style="position: fixed;z-index: 99999999;height: 250px;width: 300px;bottom: 50%;right: 50%;">
        <button onclick="TogetherJS(this); return false;">Start TogetherJS</button>
  </div>
`;

injectScript()
injectDiv(banner);
