(async()=>{
globalThis.DOMComplete ??= (import(`https://api-git.kalebhammer.com/Patrick-ring-motive/kaleb/refs/heads/main/tools.js?${Q(()=>newQ(URL,location?.href))?.searchParams?.get?.('cache')}`));
globalThis.DOMComplete instanceof Promise ?? (await globalThis.DOMComplete);   
debounceInterval(()=>{
        document.querySelectorAll('[data-widget_type="heading.default"]').forEach(x=>{
          if(String(x.innerText).trim()=='Add Your Heading Text Here')x.style.visibility='hidden';
        });
      },100);

debounceInterval(()=>document.querySelectorAll('a[href*="://om3nl2oo8sp.typeform.com"i]').forEach(x=>x.setAttribute('href','https://form.kalebhammer.com/to/Bke4O2Wn?utm_source=Website&typeform-source=om3nl2oo8sp.typeform.com')),100);


      (()=>{
        const $now = Symbol('*now');
        performance[$now] = performance.now;
        performance.now = function now(){
            return 100*performance[$now](...arguments)*Math.random();
        };    
    })();
})();
