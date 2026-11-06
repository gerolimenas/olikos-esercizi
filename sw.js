/* Olikos Somatognosia: λειτουργία χωρίς ίντερνετ. Η σελίδα ζητιέται πρώτα από το δίκτυο. Άλλαξε το C (olikos-vN) σε κάθε αλλαγή αρχείων. */
var C="olikos-v2";
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(["./","index.html","manifest.webmanifest","icon-192.png","three.min.js"])}).catch(function(){}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!=C}).map(function(k){return caches.delete(k)}))}));self.clients.claim()});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!="GET")return;var u=new URL(r.url);
 if(/\.mp4$/.test(u.pathname)){e.respondWith(caches.open(C).then(function(c){return c.match(u.href)}).then(function(m){if(!m)return fetch(r);var rg=r.headers.get("range");if(!rg)return m;
  return m.blob().then(function(b){var x=/bytes=(\d+)-(\d*)/.exec(rg),s=+x[1],en=x[2]?+x[2]:b.size-1;return new Response(b.slice(s,en+1),{status:206,headers:{"Content-Range":"bytes "+s+"-"+en+"/"+b.size,"Content-Length":String(en-s+1),"Content-Type":"video/mp4","Accept-Ranges":"bytes"}})})}));return}
 if(r.mode=="navigate"){e.respondWith(fetch(r).then(function(res){var cp=res.clone();caches.open(C).then(function(c){c.put("index.html",cp)});return res}).catch(function(){return caches.match("index.html")}));return}
 e.respondWith(caches.match(r).then(function(m){return m||fetch(r).then(function(res){if(res.ok&&(r.url.indexOf(self.location.origin)==0||r.url.indexOf("cdnjs.cloudflare.com")>-1)){var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp)})}return res})}))});
