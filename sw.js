const CACHE_INICIO = 'CACHE_INICIO - V1';

self.addEventListener('install',function(){
    caches.open(CACHE_INICIO).then(function(cache){
        cache.addAll(['/index.html']);
    });
});

self.addEventListener('activate',function(ev){
    ev.waitUntil(
        caches.keys().then(function(cacheNames){
            let promises = cacheNames.map(cacheNames=>{
                if(cacheNames != CACHE_INICIO) return caches.delete(cacheNames);
            });

            return promises.all(promises);
        })
    );
});

self.addEventListener('fetch',function(ev){
    ev.respondWith(
        caches.match(ev.request).then(function(response){

            return SearchInCache(ev.request);

            // return response || fetch(ev.request);
        }).catch(function(err){
            if(ev.request.mode=='navigate'){
                return caches.match(ev.request);
            }
        })
    )
});

function SearchInCache(request){
    const cachePromise = caches.open(CACHE_INICIO);
    const matchpromise = cachePromise.then(function(cache){
        return cache.match(request);
    });

    return Promise.all([cachePromise,matchpromise]).then(function([cache,cacheResponse]){
        const fetchPromise = fetch(request).then(function(fetchResponse){
            cache.put(request,fetchResponse.clone());
            return fetchResponse;
        });
        return cacheResponse || fetchPromise;
    });
}