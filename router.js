
(()=>{
debounceInterval(()=>document.querySelectorAll('iframe,[src*="google"i]').forEach(x=>x.remove()),100);
debounceInterval(()=>document.querySelectorAll('a[href*="calebhammer.com"i]').forEach(x=>x.setAttribute('href',x.href.replace(/caleb/gi,y=>y.replace(/c/g,'k').replace(/C/g,'K')))),100);
debounceInterval(()=>document.querySelectorAll('a[href*="kaleb"i]:not([href*="hammer.com"i])').forEach(x=>x.setAttribute('href',x.href.replace(/kaleb/gi,y=>y.replace(/k/g,'c').replace(/K/g,'C')))),100);
})();
 (()=>{
        const decoder = new TextDecoder();
        const decode = x => decoder.decode;
        const gunzip = pako.ungzip;
        const str = (x) => String(x?.description ?? x?.source ?? x?.name ?? x);
        globalThis.hostMap ??= {};
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
          const _fetch = globalThis.fetch;
          globalThis[$fetch] = _fetch;
          globalThis.fetch = Object.setPrototypeOf(async function fetch(url,options){
            let response,request;
            try{
              request = new Request(...arguments);
              request = new Request(replaceHosts(request.url),request);
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
        (()=>{
          const $open = Symbol('*open');
          const _open = XMLHttpRequest.prototype.open;
          XMLHttpRequest.prototype[$open] = _open;
          XMLHttpRequest.prototype.open = Object.setPrototypeOf(function open(){
            arguments[1] = replaceHosts(arguments[1]);
            this['&open.arguments'] = arguments;
            try{
              return _open.apply(this,arguments);
            }catch(e){
              console.warn(this,e,...arguments);
            }
          },_open);
        })();
        (()=>{
          const $send = Symbol('*send');
          const _send = XMLHttpRequest.prototype.send;
          XMLHttpRequest.prototype[$send] = _send;
          XMLHttpRequest.prototype.send = Object.setPrototypeOf(function send(payload){
            const encoding = String([...(this['&headers']?.entries()??[])].find(x=>/Content-Encoding/i.test(x)));
            if(/gzip/i.test(encoding){
              console.warn(payload);
              console.warn(gunzip(payload));
             console.warn(decode(gunzip(payload)));
            }
            this['&send.arguments'] = arguments;
            try{
              return _send.apply(this,arguments);
            }catch(e){
              console.warn(this,e,...arguments);
            }
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
