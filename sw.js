
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

  self.addEventListener('install',async (event) => event?.waitUntil?.(self?.skipWaiting?.()));

  self.addEventListener("activate", event => event?.waitUntil?.(clients?.claim?.()));

  

  


  /* Listen for request events */
  self.addEventListener('fetch', function onRequest(event){
    try {
      event.waitUntil((async()=>{})());
      const FetchEvent = (async()=>{
       globalThis.cache ??= (await caches.open('app'));
        /* Get the request */
        let request = event?.request;
        
        /*<insert request exceptions>*/
       
        const reqURL = `${request.url}`.split('/');
        if(reqURL[2]=='developer.mozilla.org'){
         reqURL[2]='developer.typescripts.org';
         request = new Request(reqURL.join`/`,request);
         Object.defineProperty(event,'request',{value:request});
        }

        try{
          const clientURL = `${(await zgetClientURL(event))}`;
          if((`${request.headers.get('referer')}`.includes('path=')&&!request.url.includes('path='))
           ||(clientURL.includes('path=')&&!request.url.includes('path='))){
            const incomingURL = znewURL(request?.url);
            const path = incomingURL?.searchParams?.get?.('path');
            if(!path){
              incomingURL?.searchParams?.set?.('path',encodeURIComponent(incomingURL.pathname));
              (incomingURL??{}).pathname = '';
              request = new Request(incomingURL,request);
            }
          }
        }catch(e){
          console.warn(e,request,...arguments);
        }
        
        if(/ios/i.test(request?.headers?.get?.('User-Agent'))){
          return zfetchWith(event,request);
        }
        /* Always send google analytics */
        if (~request.url.indexOf('GoogleAnalytics')) {
          return zfetchWith(event,request);
        }
        if (request.url.startsWith('chrome-extenstion://')) {
          return zfetchWith(event,request);
        }
        if (!(~`${request?.url}`.search(/typescripts\.org/i))){return zfetchWith(event);}
        /* Images */
        /* CSS & JavaScript */
        /* Offline-first */
        if (checkEndings(request.url)) {
          async function offFirstFetch() {
            let res = await cascadeMatchesTier1(request);
            if (res) {
              return res;
            }
            try {
              res = await zfetch(request); 
              if ((res)&&(res.status<300)) {
                return await cacheResponse(request, res);
              }
              return res;
            } catch (e) {
              console.warn(e,...arguments);
              return res;
            }
          }
          /* Don't turn off Service Worker until this is done */
          const presponse = awaitUntil(event,offFirstFetch(request));
          const response = await presponse;
          if(response && (response instanceof Response)){
            if(request.url.includes('content-type=xhtml')){
              response = await toXHTML(response);
            }
            return zrespondWith(event,response.clone());
          }else{
            console.warn(response);
          }
          event.waitUntil(presponse);
        }
        /* HTML files */
        /* Network-first */
        if (!checkEndings(request.url)) {
          async function netFirstFetch() {
            try {
              let res = await fetch(request);
              /* Save a copy of it in cache */
              /* Return the response */
              if (res) {
                await cacheResponse(request, res);
                return res;
              }
              return await cascadeMatches(request);
            } catch (e) {
              console.warn(e,...arguments);
              return await cascadeMatches(request);
            }
          }
          /* Don't turn off Service Worker until this is done */
          const presponse = awaitUntil(event,netFirstFetch(request));
          const response = await presponse;
          if(response && (response instanceof Response)){
            if(request.url.includes('content-type=xhtml')){
              response = await toXHTML(response);
            }
            return zrespondWith(event,response.clone());
          }else{
            try{
              throw new Error(response);
            }catch(e){
              console.warn(e,response,...aguments);
            }
          }
          event.waitUntil(presponse);
        }
      })();
      /* Don't turn off Service Worker until everything is done */
        event.waitUntil(awaitUntil(event,FetchEvent));
    } catch (e) {
      console.warn(e,event,...arguments);
      return zfetchWith(event);
    }
  });

