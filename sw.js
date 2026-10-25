const C='dilo-v3',F=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(F)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x!=='dilo-meta').map(x=>caches.delete(x))))));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||!e.request.url.startsWith(self.location.origin))return;e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)))});
self.addEventListener('periodicsync',e=>{if(e.tag==='dilo-daily')e.waitUntil(caches.open('dilo-meta').then(c=>c.match('ntext')).then(r=>r?r.text():'Bugünkü dersini yap, serini koru! 🔥').then(t=>self.registration.showNotification('Dilo 🦜',{body:t,icon:'icon-192.png',tag:'dilo-daily'})))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window'}).then(l=>l.length?l[0].focus():clients.openWindow('./')))});
