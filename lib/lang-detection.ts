/**
 * Blocking, pre-paint language detection. Injected as the first child of <head>
 * in both root layouts so the redirect happens before the browser paints.
 *
 * GitHub Pages has no server, so there is nothing to negotiate Accept-Language
 * against and no synchronous way to observe the client IP — navigator.language
 * is the only signal available before paint.
 *
 * Order: an explicit choice in localStorage wins; otherwise a Korean browser
 * landing on the bare (English) surface is sent to /ko. /design is the design
 * system QA surface and is never redirected.
 */
export const LANG_DETECTION_SCRIPT = `(function(){try{
var p=location.pathname;
if(p==='/design'||p.indexOf('/design/')===0)return;
var inKo=p==='/ko'||p==='/ko/'||p.indexOf('/ko/')===0;
var c=null;try{c=localStorage.getItem('lang')}catch(e){}
if(c==='kr')c='ko';
if(c!=='ko'&&c!=='en')c=null;
var q=location.search+location.hash;
var ko=function(){return '/ko'+(p==='/'?'/':p)+q};
if(c==='ko'){if(!inKo)location.replace(ko());return}
if(c==='en'){if(inKo)location.replace((p.slice(3)||'/')+q);return}
if(!inKo&&(navigator.language||'').toLowerCase().indexOf('ko')===0)location.replace(ko());
}catch(e){}})();`;
