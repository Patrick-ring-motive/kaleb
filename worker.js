
const str = (x) => String(x?.description ?? x?.source ?? x?.name ?? x);
const hostMap = {
  "kalebhammer.com":"calebhammer.com",
  "shop.kalebhammer.com":"shop.calebhammer.com",
  "form.kalebhammer.com":"form.typeform.com",
  "Form.kalebhammer.com":"om3nl2oo8sp.typeform.com",
  "api-git.kalebhammer.com":"raw.githubusercontent.com"
};
function replaceRequestHosts(s){
  s = str(s);
  for(const key in hostMap){
    s = s.replaceAll(key,hostMap[key]);
    s = s.replace(RegExp(key,"gi"),hostMap[key]);
  }
  return s;
}
function replaceResponseHosts(s){
  s = str(s);
  for(const key in hostMap){
    s = s.replaceAll(hostMap[key],key);
    s = s.replace(RegExp(hostMap[key],"gi"),key);
  }
  return s;
}
const defaultHost = "calebhammer.com";
async function onRequest(request,env,ctx) {
  const url = new URL(request.url);
  url.pathname = str(url.pathname).replace(/kaleb/gi,x=>x.replace(/k/g,'c').replace(/K/g,'C'));
  const hostProxy = url.hostname;
  url.hostname = hostMap[url.hostname] ??= defaultHost;
  const modifiedRequest = new Request(url, Object.defineProperty(request,'headers',{
      value:new Headers(request.headers)
  }));
  modifiedRequest.headers.forEach((value, key) => {
      modifiedRequest.headers.set(key,replaceRequestHosts(String(value)));
  });
  modifiedRequest.headers.delete('Referer')
  let res =  await fetch(modifiedRequest);
  res = new Response(res.body,Object.defineProperty(res,'headers',{
      value:new Headers(res.headers)
  }));
  res.headers.forEach((value, key) => {
      res.headers.set(key,replaceResponseHosts(String(value)));
  });
  if(/html|script/i.test(res.headers.get('content-type'))){
    let resBody = await res.text();
    resBody = resBody.replace(/caleb/gi,x=>x.replace(/c/g,'k').replace(/C/g,'K'));
    resBody = resBody.replaceAll('upport@kalebhammer.com','upport@calebhammer.com');
    if(/html/i.test(res.headers.get('content-type'))){
      resBody = resBody.replace(/(\d+) Hammer Media/,'$1 Not Hammer Media')
      .replace('Extraordinary Brands','MissingLink')
      .replace('extraordinarybrands.io','patrickring.net');
      resBody = resBody.replace(/(<\/head>)/i,`<script>
      setInterval(()=>document.querySelectorAll('iframe,[src*="google"i]').forEach(x=>x.remove()),100);
      setInterval(()=>document.querySelectorAll('a[href*="calebhammer.com"i]').forEach(x=>x.setAttribute('href',x.href.replace(/caleb/gi,y=>y.replace(/c/g,'k').replace(/C/g,'K')))),100);
      setInterval(()=>document.querySelectorAll('a[href*="kaleb"i]:not([href*="hammer.com"i])').forEach(x=>x.setAttribute('href',x.href.replace(/kaleb/gi,y=>y.replace(/k/g,'c').replace(/K/g,'C')))),100);
      setInterval(()=>document.querySelectorAll('a[href*="://om3nl2oo8sp.typeform.com"i]').forEach(x=>x.setAttribute('href','https://form.kalebhammer.com/to/Bke4O2Wn?utm_source=Website&typeform-source=om3nl2oo8sp.typeform.com')),100);
      setInterval(()=>{
        document.querySelectorAll('[data-widget_type="heading.default"]').forEach(x=>{
          if(String(x.innerText).trim()=='Add Your Heading Text Here')x.style.visibility='hidden';
        });
      },100);
      for(const _ of Array(5)){
        const taq = document.createElement('span');
        taq.innerText = '🌯';
        taq.setAttribute('taco-rain','taco-rain');
        taq.style.position = 'fixed';
        taq.style.top =  Math.random()*100+'vh';
        taq.style.left = Math.random()*90+'vw';
        taq.style.zIndex = 99999;
        taq.style.transform = Math.random() > 0.5 ? 'scaleX(1)' : 'scaleX(-1)';
        taq.style.transitionDuration = '1000ms';
        taq.style.transitionTimingFunction = 'linear';
        taq.interval = setInterval(()=>{
            taq.style.visibility = 'visible';
            const nextTop = parseFloat(taq.style.top)+10;
            taq.style.transitionDuration = '1000ms';
            if(nextTop > 109){
              taq.style.visibility = 'hidden';
              taq.style.left = Math.random()*90+'vw';
              taq.style.transform = Math.random() > 0.5 ? 'scaleX(1)' : 'scaleX(-1)';
              taq.style.top = Math.random()*(-20)+'vh';
              taq.style.transitionDuration = '0ms';
            }else{
              taq.style.top = Math.min(nextTop,120)+'vh';
            }
        },1000);
        document.firstElementChild.appendChild(taq);
      }

      (()=>{
        const $now = Symbol('*now');
        performance[$now] = performance.now;
        performance.now = function now(){
            return 100*performance[$now](...arguments)*Math.random();
        };    
    })();
      </script>
      <script>
      (()=>{
        const str = (x) => String(x?.description ?? x?.source ?? x?.name ?? x);
        const hostMap = ${JSON.stringify(hostMap)};
        const defaultHost = "${url.hostname}";
        function replaceHosts(s){
          s = str(s);
          for(const key in hostMap){
            s = s.replaceAll(hostMap[key],key);
            s = s.replace(RegExp(hostMap[key],"gi"),key);
          }
          s = s.replace(RegExp(defaultHost,"gi"),location.host);
          return s;
        }
        (()=>{
          const $fetch = Symbol('*fetch');
          const _fetch = globalThis.fetch;
          globalThis[$fetch] = _fetch;
          globalThis.fetch = Object.setPrototypeOf(async function fetch(url,options){
            let response,request;
            try{
              request = new Request(...arguments);
              request = new Request(replaceHosts(request.url),request);
              response = await _fetch.call(this, request);
            }catch(e){
              ressponse = new Response(e, {
                status: 569,
                statusText: e.message
              });
            }
            response['&arguments'] = arguments;
            response['&request'] = request;
            return response;
          },_fetch);
        })();
        (()=>{
          const $open = Symbol('*open');
          const _open = XMLHttpRequest.prototype.open;
          XMLHttpRequest.prototype[$open] = _open;
          XMLHttpRequest.prototype.open = Object.setPrototypeOf(function open(){
            arguments[1] = replaceHosts(arguments[1]);
            this['&open.arguments'] = arguments;
            return _open.apply(this,arguments);
          },_open);
        })();
        (()=>{
          const $send = Symbol('*send');
          const _send = XMLHttpRequest.prototype.send;
          XMLHttpRequest.prototype[$send] = _send;
          XMLHttpRequest.prototype.send = Object.setPrototypeOf(function send(payload){
            this['&send.arguments'] = arguments;
            return _send.apply(this,arguments);
          },_send);
        })();
        (()=>{
          const $setRequestHeader = Symbol('*setRequestHeader');
          const _setRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
          XMLHttpRequest.prototype[$setRequestHeader] = _setRequestHeader;
          XMLHttpRequest.prototype.setRequestHeader = Object.setPrototypeOf(function setRequestHeader(key,value){
            this['&headers'] ??= new Map();
            try{
              arguments[1] = replaceHosts(value);
              _setRequestHeader.apply(this,arguments);
              this['&headers'].set(key,value);
            }catch(e){
              console.warn(this,e,...arguments);
            }
          },_setRequestHeader);
        })();
      })();
      </script>
      <style>
        [taco-rain]{
          filter:sepia(0.75) saturate(2);
        }
        [taco-rain]:hover{display:none;}
        .dialog-widget-content,
        .dialog-message{
          min-width:100vw;
          max-height:75vh;
        }
        body{
          filter:hue-rotate(45deg) saturate(2) contrast(1.1);
        }
      </style>$1`)
    }
    res = new Response(resBody,res);
  }
  if(/api-hub/i.test(request.url){
    const ending = String(request?.url).split(/[?#]/).shift().split('.').pop();
    if(/html/i.test(ending){}
  }
  return cleanResponse(res);
}


function deleteAndSet(res,key,value){
  res = new Response(res.body,Object.defineProperty(res,'headers',{
      value:new Headers(res.headers)
  }));
  res.headers.delete(key);
  res.headers.set(key,value);
  return res;
}

function cleanResponse(response){       
  response = deleteAndSet(response,'Access-Control-Allow-Origin','*');
  response = deleteAndSet(response,'Access-Control-Allow-Methods','*');
  response = deleteAndSet(response,'Access-Control-Allow-Headers','*');
  response = deleteAndSet(response,'Access-Control-Allow-Credentials','true');
  response = deleteAndSet(response,'Access-Control-Max-Age','86400');
  response.headers.delete('Content-Security-Policy');
  response.headers.delete('X-Frame-Options');
  response.headers.delete('Strict-Transport-Security');
  response.headers.delete('X-Content-Type-Options');
  response.headers.delete('Cross-Origin-Embedder-Policy');
return response;
}

export default onRequest;
