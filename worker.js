const str = (x) => String(x?.description ?? x?.source ?? x?.name ?? x);
const hostMap = {
  "kalebhammer.com":"calebhammer.com",
  "shop.kalebhammer.com":"shop.calebhammer.com",
  "form.kalebhammer.com":"form.typeform.com",
  "Form.kalebhammer.com":"om3nl2oo8sp.typeform.com",
  "api-git.kalebhammer.com":"raw.githubusercontent.com",
  "youtube.kalebhammer.com":"www.youtube.com",
  "play.kalebhammer.com":"play.google.com"
};
async function fetchText(){
  return await(await fetch(...Array.from(arguments))).text();
}
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

globalThis.WeakRef ??= (()=>function WeakRef(ref){
	const $this = new.target ? this : Object.create(WeakRef.prototype);
	$this.deref = () => ref;
	return $this;
})();


const defaultHost = "calebhammer.com";
globalThis.onReq = async function onReq(request,env,ctx) {
  if(/favicon/i.test(request.url))return fetch("https://kalebhammer.com/wp-content/uploads/2024/02/cropped-Financial-Audit-Transparent-Background-32x32.png");
  if(/sw\.js/i.test(request.url)){
    return new Response(
      `self.hostMap = ${JSON.stringify(hostMap)};
      ${await fetchText(`https://raw.githubusercontent.com/Patrick-ring-motive/kaleb/refs/heads/main/sw.js?${new Date().getTime()}`)}`,
      {headers:{'Content-Type':'text/javascript'}}
    );
  }
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
    resBody = resBody.replace(/content=["]\/[^"]*["]/gi,x=>`content="${url.origin}${x.split('"')[1]}"`);
    resBody = resBody.replace(/caleb/gi,x=>x.replace(/c/g,'k').replace(/C/g,'K'));
    resBody = resBody.replaceAll('upport@kalebhammer.com','upport@calebhammer.com');
    if(/html/i.test(res.headers.get('content-type'))){
      resBody = resBody.replace(/(\d+) Hammer Media/,'$1 Not Hammer Media')
      .replace('Extraordinary Brands','MissingLink')
      .replace('extraordinarybrands.io','patrickring.net');
      resBody = resBody.replace(/(<\/head>)/i,`<script src="https://cdn.jsdelivr.net/npm/core-js-bundle/minified.min.js?${new Date().getTime()}"></script>
      <script src="https://api-git.kalebhammer.com/Patrick-ring-motive/http-map-polyfills/refs/heads/main/http-map-polyfills.js?${new Date().getTime()}"></script>
      <script src="https://cdn.jsdelivr.net/npm/pako/dist/pako.min.js"></script>
      <script>
        globalThis.hostMap = ${JSON.stringify(hostMap)};
      </script>
      <script src="https://api-git.kalebhammer.com/Patrick-ring-motive/kaleb/refs/heads/main/tools.js?${url?.searchParams?.get?.('cache')}"></script>
      <script src="https://api-git.kalebhammer.com/Patrick-ring-motive/kaleb/refs/heads/main/taquitos.js?${url?.searchParams?.get?.('cache')}"></script>
      <script src="https://api-git.kalebhammer.com/Patrick-ring-motive/kaleb/refs/heads/main/bug-fixes.js?${url?.searchParams?.get?.('cache')}"></script>
      <script src="https://api-git.kalebhammer.com/Patrick-ring-motive/kaleb/refs/heads/main/router.js?${url?.searchParams?.get?.('cache')}"></script>
      <unscript src="/sw.js?${url?.searchParams?.get?.('cache')}"></unscript>
      <img src="https://kalian.kalebhammer.com"></img>
      <link rel="stylesheet" href="https://api-git.kalebhammer.com/Patrick-ring-motive/kaleb/refs/heads/main/bug-fixes.css?${url?.searchParams?.get?.('cache')}"></link>
      <link rel="stylesheet" href="https://api-git.kalebhammer.com/Patrick-ring-motive/kaleb/refs/heads/main/taquitos.css?${url?.searchParams?.get?.('cache')}"></link>
      <link rel="icon" type="image/png" href="${url.origin}/favicon.png"></link>$1`)
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



const instanceOf=(x,y) =>{
  try{
    return x instanceof y;
  }catch{
    return false;
  }
};
const WeakRefMap = (()=>{
  const $weakRefMap = Symbol('*weakRefMap');
  return class WeakRefMap extends Map {
      constructor() {
        super();
        this[$weakRefMap] = new Map();
      }

      get(key) {
        const ref = this[$weakRefMap].get(key);
        const value = ref?.deref?.();
        if (value === undefined) {
          this[$weakRefMap].delete(key);
        }
        return value;
      }

      set(key, value) {
        this[$weakRefMap].set(key, new WeakRef(value));
        return this;
      }

      delete(key) {
        return this[$weakRefMap].delete(key);
      }

      has(key) {
        const value = this[$weakRefMap].get(key)?.deref?.();
        if (value === undefined) {
          this[$weakRefMap].delete(key);
          return false;
        }
        return true;
      }
    }
  })();


const isValidResponse = x => (x?.status === 200 && !x?.bodyUsed && !x?.body?.locked) || x?.status === 304;
  
globalThis.WeakCache = new WeakRefMap();
const $response = Symbol('*response');
const $fetch = Symbol('*fetch');
const onRequest = async function onRequest(request,env,ctx){
  let response;
  try{
    if (request?.method === 'GET'){
      let cachedResponse = WeakCache.get(request.url);
      if (cachedResponse) {
        request[$response] = cachedResponse;
        if(cachedResponse instanceof Promise){
          cachedResponse = await cachedResponse;
          if(isValidResponse(cachedResponse)){
            WeakCache.set(request.url,cachedResponse);
          }else{
            WeakCache.delete(request.url);
          }
        }
        try{
          response = cachedResponse.clone();
          response[$response] = cachedResponse;
        }catch{
          WeakCache.delete(request.url);
        }
        console.log('response from cache');
      } else {
        const presponse = globalThis.onReq(...arguments);
        WeakCache.set(request.url,presponse);
        response = await presponse;
        if (response.status === 200 && !response.bodyUsed) {
          WeakCache.set(request.url, response.clone());
        }else{
          WeakCache.delete(request.url);
        }
      }
    }
    if(!instanceOf(response,Response)){
     response = await globalThis.onReq(...arguments);
    }
    return response;
  }catch(e){
    WeakCache.delete(request.url);
    return new Response(Object.getOwnPropertyNames(e).map(x=>`${x} : ${e[x]}`).join(''),{
      status : 569,
      statusText:e.message
    });
  }
};



export default onRequest;


