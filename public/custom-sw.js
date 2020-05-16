var VERSION = 'v1.0.27';

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

self.__precacheManifest = (self.__precacheManifest || []).concat([
  {
  "revision": "1",
  "url": "index.html"
  }
]);

addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    skipWaiting();
  }
});


workbox.routing.registerRoute(
  /static\/*/,
  new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
  '/index.html',
  new workbox.strategies.StaleWhileRevalidate()
);




self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', () => {
  self.clients.matchAll({ type: 'window' }).then(windowClients => {
    for (let windowClient of windowClients) {
      // Force open pages to refresh, so that they have a chance to load the
      // fresh navigation response from the local dev server.
      windowClient.navigate(windowClient.url);
    }
  });
});

self.addEventListener('message', (event) => {

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// function isPageHidden() {
//   var hidden, visibilityChange; 
//   if (typeof window.document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
//     hidden = "hidden";
//     visibilityChange = "visibilitychange";
//   } else if (typeof window.document.msHidden !== "undefined") {
//     hidden = "msHidden";
//     visibilityChange = "msvisibilitychange";
//   } else if (typeof window.document.webkitHidden !== "undefined") {
//     hidden = "webkitHidden";
//     visibilityChange = "webkitvisibilitychange";
//   }

//   console.log(visibilityChange)

//   return window.document[hidden];
// }


self.addEventListener('push', event => {
  const options = event.data.json();

  console.log(options);

  const promiseChain =  self.registration.showNotification(options.title || 'Chattitude', options);

  event.waitUntil(promiseChain);
});

self.addEventListener('notificationclick', e => {
  // Close the notification popout
  e.notification.close();

  // Get all the Window clients
  e.waitUntil(clients.matchAll({ type: 'window' }).then(clientsArr => {
    // If a Window tab matching the targeted URL already exists, focus that;
    const hadWindowToFocus = clientsArr.some(windowClient => windowClient.url === e.notification.data.link ? (windowClient.focus(), true) : false);
    // Otherwise, open a new tab to the applicable URL and focus it.
    if (!hadWindowToFocus) clients.openWindow(e.notification.data.link).then(windowClient => windowClient ? windowClient.focus() : null);
  }));
});
