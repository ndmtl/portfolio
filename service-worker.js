const CACHE_NAME = 'offline-1';

// Fichiers indispensables au fonctionnement hors-ligne (le « app shell »)
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/a-propos.html',
    '/contact.html',
    '/projets.html',
    '/portfolio/application-landwiz.html',
    '/portfolio/application-wwoof-canada.html',
    '/404.html',
    '/offline.html',
    '/assets/css/styles.css',
    '/assets/css/nomalize.css',
    '/assets/js/script.js',
    '/assets/js/validation.js',
    '/assets/js/tailwind.config.js',
    '/assets/js/gsap.js',
    '/assets/icons/d-final_favicon.png',
    '/js/ios-hint.js',
    '/icons/icon-192.png',
    '/icons/icon-512.png',
    '/assets/icons/d-final_icon-192.png',
    '/assets/icons/d-final_icon-512.png',
    '/assets/img/LogosClientsOpt/LogosClientsDark_ Ugroumedia.png',
    '/assets/img/LogosClientsOpt/LogosClientsDark_Aurory.png',
    '/assets/img/LogosClientsOpt/LogosClientsDark_Ceci.png',
    '/assets/img/LogosClientsOpt/LogosClientsDark_CPA.png',
    '/assets/img/LogosClientsOpt/LogosClientsDark_EEQ.png',
    '/assets/img/LogosClientsOpt/LogosClientsDark_ESG-UQAM.png',
    '/assets/img/LogosClientsOpt/LogosClientsDark_Fondation-rivieres.png',
    '/assets/img/LogosClientsOpt/LogosClientsDark_Gardaworld.png',
    '/assets/img/LogosClientsOpt/LogosClientsDark_H4GEO.png',
    '/assets/img/LogosClientsOpt/LogosClientsDark_NoBrainer.png',
    '/assets/img/LogosClientsOpt/LogosClientsDark_PertinenceMedia.png',
    '/assets/img/LogosClientsOpt/LogosClientsDark_Ruisss.png',
    '/assets/img/LogosClientsOpt/LogosClientsDark_Tink.png',
    '/assets/img/LogosClientsOpt/LogosClientsDark_UQO.png',
    '/assets/img/LogosClientsOpt/LogosClientsGrey_ Ugroumedia.png',
    '/assets/img/LogosClientsOpt/LogosClientsGrey_Aurory.png',
    '/assets/img/LogosClientsOpt/LogosClientsGrey_Ceci.png',
    '/assets/img/LogosClientsOpt/LogosClientsGrey_CPA.png',
    '/assets/img/LogosClientsOpt/LogosClientsGrey_EEQ.png',
    '/assets/img/LogosClientsOpt/LogosClientsGrey_ESG-UQAM.png',
    '/assets/img/LogosClientsOpt/LogosClientsGrey_Fondation-rivieres.png',
    '/assets/img/LogosClientsOpt/LogosClientsGrey_Gardaworld.png',
    '/assets/img/LogosClientsOpt/LogosClientsGrey_H4GEO.png',
    '/assets/img/LogosClientsOpt/LogosClientsGrey_NoBrainer.png',
    '/assets/img/LogosClientsOpt/LogosClientsGrey_PertinenceMedia.png',
    '/assets/img/LogosClientsOpt/LogosClientsGrey_Ruisss.png',
    '/assets/img/LogosClientsOpt/LogosClientsGrey_Tink.png',
    '/assets/img/LogosClientsOpt/LogosClientsGrey_UQO.png',
    '/assets/img/portfolio/-cfeducation-1.jpg',
    '/assets/img/portfolio/-la-remise.png',
    '/assets/img/portfolio/-landwiz.webp',
    '/assets/img/portfolio/-nux-hec.png',
    '/assets/img/portfolio/-wwoof-canada.png',
    '/assets/img/portfolio/AnalyseUX-1.png',
    '/assets/img/portfolio/AnalyseUX-2.png',
    '/assets/img/portfolio/landwiz_1.png',
    '/assets/img/portfolio/landwiz_2.png',
    '/assets/img/portfolio/landwiz_3.png',
    '/assets/img/portfolio/landwiz-1.jpg',
    '/assets/img/portfolio/landwiz-2.jpg',
    '/assets/img/portfolio/landwiz-3.jpg',
    '/assets/img/portfolio/WC-APP-Compte.png',
    '/assets/img/portfolio/WC-APP-Contacter-hote.png',
    '/assets/img/portfolio/WC-APP-Destinations.png',
    '/assets/img/portfolio/WC-APP-Home.png',
    'assets/img/portfolio/WC-APP-Host-List-–-1.png',
    '/assets/img/portfolio/WC-APP-Host-List.png',
    '/assets/img/portfolio/WC-APP-Host-map.png',
    '/assets/img/portfolio/WC-APP-Message.png',
    '/assets/img/portfolio/wwoof-Details.png',
    '/assets/img/portfolio/wwoof-home-1.png',
    '/assets/img/portfolio/wwoof-List.png',
    '/assets/img/portfolio/wwoof-Map-1.png',
    '/assets/img/portfolio/Wwoof-UX-UI-1-scaled.png',
    '/assets/img/illustrations_1.png',
    '/assets/img/illustrations_2.png',
    '/assets/img/illustrations_3.png',
    '/assets/img/illustrations_arrow-b.png',
    '/assets/img/illustrations_arrow.png',
    '/assets/img/illustrations_code.png',
    '/assets/img/illustrations_contact.png',
    '/assets/img/illustrations_creation.png',
    '/assets/img/illustrations_iteration.png',
    '/assets/img/illustrations_merci.png',
    '/assets/img/illustrations_research.png',
    '/assets/img/Nathalie-Depierre-Design-600x681.jpg'

];

// ----- INSTALL : on précache l'app shell -----
self.addEventListener('install', (evt) => {
    console.log('[SW] Install');
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Pré-cache de l\'app shell');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// ----- ACTIVATE : on supprime les anciennes caches -----
self.addEventListener('activate', (evt) => {
    console.log('[SW] Activate');
    evt.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('[SW] Suppression de l\'ancienne cache', key);
                        return caches.delete(key);
                    }
                    return Promise.resolve();
                })
            )
        )
    );
    self.clients.claim();
});

// ----- FETCH : stratégies selon la requête -----
self.addEventListener('fetch', (evt) => {
    const { request } = evt;

    if (request.method !== 'GET') return;

    // 1) Navigation -> NETWORK FIRST (avec fallback offline.html)
    if (request.mode === 'navigate') {
        evt.respondWith(
            fetch(request)
                .then((response) => {
                    // Sécurité : On ne cache que les réponses valides
                    if (response.status === 200) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                    }
                    return response;
                })
                .catch(async () => {
                    const cached = await caches.match(request);
                    return cached || caches.match('/offline.html');
                })
        );
        return;
    }

    // 2) Autres ressources -> CACHE FIRST
    evt.respondWith(
        caches.match(request).then((cached) => {
            return (
                cached ||
                fetch(request).then((response) => {
                    // Sécurité : On ne cache que si c'est un succès du réseau
                    if (response.status === 200) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                    }
                    return response;
                })
            );
        })
    );
});