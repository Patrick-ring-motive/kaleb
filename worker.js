
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
      <script src="https://api-git.kalebhammer.com/Patrick-ring-motive/kaleb/refs/heads/main/bug-fixes.js"></script>
      <script src="https://api-git.kalebhammer.com/Patrick-ring-motive/kaleb/refs/heads/main/router.js"></script>
      <link rel="stylesheet" href="https://api-git.kalebhammer.com/Patrick-ring-motive/kaleb/refs/heads/main/bug-fixes.css"></link>
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
