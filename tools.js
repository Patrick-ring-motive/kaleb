globalThis.encode69 = x => btoa(x).replace(/./g,y=>y[`to${y>='a'?'Upper':'Lower'}Case`]());
globalThis.decode69 = x => atob(x.replace(/./g,y=>y[`to${y>='a'?'Upper':'Lower'}Case`]()));
globalThis. Q = fn =>{
    try{
	  return fn();
    }catch{
	  return undefined;
    }
};
globalThis. newQ = (...args) => {
 const fn = args?.shift?.();
 return fn && new fn(...args);
};
globalThis.debounceInterval = function debounceInterval(fn,time){
    let lastTime = new Date().getTime();
    return setInterval(()=>{
	  const currentTime = new Date().getTime();
	  if((1.5 * (currentTime - lastTime)) >= time){
		lastTime = currentTime;
		return fn();
	  }
    },time);
}
        
 globalThis.queueMicrotask ??= setTimeout;
	globalThis.requestAnimationFrame ??= setTimeout;
	globalThis.requestIdleCallback ??= globalThis.requestAnimationFrame;
	globalThis.nextIdle=function nextIdle(){
		return new Promise((resolve) => {requestIdleCallback(resolve);});  
	}
	globalThis.nextFrame=function nextFrame(){
		return new Promise((resolve) => {requestAnimationFrame(resolve);});  
	}
	globalThis.nextTask=function nextTask(){
		return new Promise((resolve) => {queueMicrotask(resolve);});  
	}

(globalThis.window??{}).DOMContentLoaded = (fn) => {
	       fn??=()=>{};
         return new Promise((resolve) => {
		(document || globalThis).addEventListener("DOMContentLoaded", ()=>{
			 try{resolve(fn());}catch(e){resolve(e);}
		 });
	 });
     }
     (globalThis.window??{}).DOMInteractive = (fn) => {
	       fn??=()=>{};
         if ((globalThis.document?.readyState == 'complete') || (globalThis.document?.readyState == 'interactive')) {
             return fn();
         }
         return new Promise((resolve) => {
		(globalThis.document || globalThis).addEventListener("DOMContentLoaded", ()=>{
			 try{resolve(fn());}catch(e){resolve(e);}
		 });
	 });
     }
     (globalThis.window??{}).DOMComplete = (fn) => {
	       fn??=()=>{};
         if (document.readyState == 'complete') {
             return fn();
         }
	return new Promise((resolve) => {
		 let resolved = false;
		 globalThis?.document?.addEventListener?.("load", ()=>{
			if(!resolved){try{resolve(fn());}catch(e){resolve(e);}finally{resolved = true;}}
		 });
		 globalThis?.addEventListener?.("load", ()=>{
			if(!resolved){try{resolve(fn());}catch(e){resolve(e);}finally{resolved = true;}}
		 });
		const intID = setInterval(()=>{
			if (document.readyState == 'complete') {
				if(!resolved){try{resolve(fn());}catch(e){resolve(e);}finally{resolved = true;}}
				clearIntID();
			}
		},100);
		function clearIntID(){
			clearInterval(intID);
		}
	 });
     }
