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
