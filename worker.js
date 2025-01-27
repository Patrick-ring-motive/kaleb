
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
  if(!/api-git/i.test(request.url))url.pathname = str(url.pathname).replace(/kaleb/gi,x=>x.replace(/k/g,'c').replace(/K/g,'C'));
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
      globalThis.hostMap = ${JSON.stringify(hostMap)};
      </script>
      <script src="https://api-git.kalebhammer.com/Patrick-ring-motive/kaleb/refs/heads/main/taquitos.js"></script>
      <script>
      (()=>{
        const str = (x) => String(x?.description ?? x?.source ?? x?.name ?? x);
        globalThis.hostMap ??= {};
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
      <link rel="stylesheet" href="https://api-git.kalebhammer.com/Patrick-ring-motive/kaleb/refs/heads/main/taquitos.css"></link>$1`)
    }
    res = new Response(resBody,res);
  }
  if(/api-git/i.test(request.url)){
    const ending = String(request?.url).split(/[?#]/).shift().split('.').pop();
    if(/html/i.test(ending)){
      res.headers.set('content-type','text/html; charset=utf-8');
    }
    if(/js|ts/i.test(ending)){
      res.headers.set('content-type','text/javascript; charset=utf-8');
    }
    if(/css/i.test(ending)){
      res.headers.set('content-type','text/css; charset=utf-8');
    }
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
