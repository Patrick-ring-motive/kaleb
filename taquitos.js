(async()=>{
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
            .map(x=>String(x?.selectorText).replaceAll?.('::before',' '))
            .join(', ')}{
            	filter:drop-shadow(0 0 0.75rem grey);
            }`;
            document.firstElementChild.appendChild(style);
      })();
      document.querySelectorAll('img').forEach(x=>{
      	const s = getComputedStyle(x);
      	const r = s.getPropertyValue('border-radius');
      	if(r === '0px')x.style.borderRadius = '1vmin';
      });
      await DOMComplete();
      function trySpinningThatsAGoodTrick(){
            ['mouseover','mouseenter','pointerover','pointerenter','touchstart','focus'].forEach(eventType=>
                  document.querySelectorAll(
                        `iframe:hover,iframe:active,iframe:focus,
                        canvas:hover,canvas:active,canvas:focus,
                        svg:hover,svg:active,svg:focus,
                        img:not([spinny],[hovered]),
                        i:not([spinny],[hovered]),
                        .elmentor-icon:not([spinny],[hovered])`
                  ).forEach(x=>x.addEventListener(eventType, (event) => {
                        if(document.body.hasAttribute('hovering')) return;
                  	const element = event.target;
                        if(element?.hasAttribute?.('hovered') || [...(element?.querySelectorAll?.('*')??[])].some(x=>x.hasAttribute('hovered'))) return;
                        document.body.setAttribute('hovering',true);
                        setTimeout(()=>document.body.removeAttribute('hovering'),1000);
                  	element?.setAttribute?.('hovered',true);
                        element?.setAttribute?.('spinny',true);
                  	setTimeout(()=>element?.removeAttribute?.('hovered'),10000);
            })));
      }
      trySpinningThatsAGoodTrick();
      debounceInterval(trySpinningThatsAGoodTrick,1000);
})();
