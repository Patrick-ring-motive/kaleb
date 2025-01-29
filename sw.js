
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

  self.addEventListener('fetch', function onRequest(event){
         return event.respondWith(awaitUntil(event,event.request));
  });

