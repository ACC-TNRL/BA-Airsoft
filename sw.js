/* Offline: de app zelf staat in de cache; de luchtfoto en 3D-module worden bewaard zodra ze een keer geladen zijn. */
const V="baveld-fd4fd662", CORE=["./","./index.html","./app.js?v=fd4fd662","./styles.css?v=fd4fd662","./fonts/archivo.woff2","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x!=="baveld-ext").map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request, u=new URL(r.url); if(r.method!=="GET")return;
  if(r.mode==="navigate"){ // eerst het netwerk (nieuwe versie), zonder bereik de bewaarde versie
    e.respondWith(Promise.race([fetch(r).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put("./index.html",c));return res}),new Promise((_,no)=>setTimeout(no,3500))]).catch(()=>caches.match("./index.html")));return}
  if(u.origin===location.origin){e.respondWith(caches.match(r).then(hit=>hit||fetch(r)));return}
  if(u.hostname==="cdn.jsdelivr.net"||u.hostname==="service.pdok.nl"){ // 3D-module en luchtfoto: bewaren voor later
    e.respondWith(caches.open("baveld-ext").then(c=>c.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok||res.type==="opaque")c.put(r,res.clone());return res}))))}
});
