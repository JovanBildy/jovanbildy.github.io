self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open('static')
        .then(function(cache){
            console.log('Opened cache');
            cache.addAll([
                '/',
                'index.html',
                'src/js/material.min.js',
                'images/icons/ikon1.png',
                'images/icons/ikon2.png',
                'images/icons/ikon3.png',
                'images/icons/ikon4.png',
                'images/icons/ikon5.png',
                'images/icons/ikon6.png',
                'images/icons/ikon7.png',
                'images/icons/ikon8.png'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request)
        .then(function(response){
            if(response){
                return response;
            }else{
                return fetch(event.request)
                .then(function(res){
                    return caches.open(CACHE_DYNAMIC_NAME)
                    .then(function(cache){
                        cache.put(event.request.url, res.clone());
                    })
                })
                .catch(function(err){
                    return caches.open(CACHE_STATIC_NAME)
                    .then(function(cache){
                        return cache.match('/index.html');
                    });
                });
            }
        })
    );
});
