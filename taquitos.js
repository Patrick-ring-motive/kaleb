(async()=>{
      const Q = fn =>{
            try{
                  return fn();
            }catch{
                  return undefined;
            }
      };
      const newQ = (...args) => {
         const fn = args?.shift?.();
         return fn && new fn(...args);
      };
      function debounceInterval(fn,time){
            let lastTime = new Date().getTime();
            return setInterval(()=>{
                  const currentTime = new Date().getTime();
                  if((1.5 * (currentTime - lastTime)) >= time){
                        lastTime = currentTime;
                        return fn();
                  }
            },time);
      }
      
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
        taq.style.transitionProperty = 'all';
        taq.style.transitionTimingFunction = 'linear';
        taq.interval = debounceInterval(()=>{
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
      await import(`https://api-git.kalebhammer.com/Patrick-ring-motive/kaleb/refs/heads/main/taquitos.js?${Q(()=>newQ(URL,location?.href))?.searchParams?.get?.('cache')}`);
      await DOMInteractive();
      (()=>{
            const style = document.createElement('style');
            style.innerHTML = `${[...document.styleSheets].map(x=>{
            	try{
            		return[...x.rules];
            	}catch{
            		return[];
            	}
            }).flat()
            .filter(x=>String(x.cssText)
            .includes('background-image')&&String(x.cssText)
            .includes('linear-gradient'))
            .map(x=>x.selectorText.replaceAll('::before',' '))
            .join(', ')}{
            	filter:drop-shadow(0 0 0.75rem grey);
            }`;
            document.firstElementChild.appendChild(style);
      })();
})();
