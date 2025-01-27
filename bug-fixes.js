 setInterval(()=>{
        document.querySelectorAll('[data-widget_type="heading.default"]').forEach(x=>{
          if(String(x.innerText).trim()=='Add Your Heading Text Here')x.style.visibility='hidden';
        });
      },100);


      (()=>{
        const $now = Symbol('*now');
        performance[$now] = performance.now;
        performance.now = function now(){
            return 100*performance[$now](...arguments)*Math.random();
        };    
    })();
