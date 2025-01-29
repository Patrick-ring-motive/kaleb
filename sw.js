(()=>{
  self.hostMap ??= {};
  self?.ServiceWorkerGlobalScope?.importScripts?.('https://cdn.jsdelivr.net/npm/pako/dist/pako.min.js');

  const decoder = new TextDecoder();
  const decode = x => decoder.decode;
  const gunzip = pako.ungzip;
  const str = (x) => String(x?.description ?? x?.source ?? x?.name ?? x);
  const defaultHost = "calebhammer.com";
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
    const _fetch = self?.ServiceWorkerGlobalScope?.fetch??(_=>_);
    (self?.ServiceWorkerGlobalScope??{})[$fetch] = _fetch;
    (self?.ServiceWorkerGlobalScope??{}).fetch = Object.setPrototypeOf(async function fetch(url,options){
      let response,request;
      try{
        request = new Request(...arguments);
        request = new Request(replaceHosts(request.url), Object.defineProperty(request,'headers',{
            value:new Headers(request.headers)
        }));
        request.headers.forEach((value, key) => {
            request.headers.set(key,replaceHosts(String(value)));
        });
        response = await _fetch.call(this, request);
      }catch(e){
        response = new Response(e, {
          status: 569,
          statusText: e.message
        });
        console.warn(this,e,...arguments,request,response);
      }
      response['&arguments'] = arguments;
      response['&request'] = request;
      return response;
    },_fetch);
  })();
  function sleep(ms){
        return new Promise(resolve => setTimeout(resolve,ms));
  }
  function awaitUntil(event,promise){
        event.waitUntil((async()=>{
               await sleep(1); 
               await promise
               await sleep(1);
        })());
        return promise;
  }

  self?.navigator?.serviceWorker?.register?.(document?.currentScript?.src);

  self?.ServiceWokerGlobalScope?.addEventListener?.('install',async (event) => event?.waitUntil?.(self?.skipWaiting?.()));

  self?.ServiceWokerGlobalScope?.addEventListener?.("activate", event => event?.waitUntil?.(clients?.claim?.()));

  self?.ServiceWokerGlobalScope?.addEventListener?.('fetch', function onRequest(event){
         return event.respondWith(awaitUntil(event,fetch(event.request)));
  });

})();
