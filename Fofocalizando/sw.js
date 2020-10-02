// Declarar as variáveis ​​/ constantes para atuação do nosso trabalhador
var  CACHE_NAME  =  'fofocalizando-cache-v1'
var  urlsToCache  =  [
    'css / fofocalizando.css',
    'css / bootstrap.css',
    'js / bootstrap.js',
    'js / jquery-3.4.1.js',
]

self.addEventListener ('install', function(event) {
    // Paremetrizar as etapas de instalação do nosso cache no dispositivo
    event.waitUntil( 
        caches.aberto (CACHE_NAME)
        .then(function(cache) {
            console.log('Cache aberto ...')
             return cache.addAll(urlsToCache)
        })
    )
})

self.addEventListener ('fetch',function(event) {
    event.respondWith(
        caches.match(event. request)
        .then(function(response) {
            if(response)  {
                 return response
            }

            var fetchRequest = event.request.clone ()

            return fetch(fetchRequest).then(
                function(response){
                    if (!reponse || response.status !== 200 || response.type !== 'basic'){
                         return response
                    }

                    var  responseToCache = resposta.clone()

                    caches.open(CACHE_NAME).then(
                        function(cache) {
                            cache.put(event.request, responseToCache)
                        }
                    )

                    return response
                }
           )
       })
   )
})

self.addEventListener('active', function(event){
   var  cacheAllowlist = ['blog-cache-v1', 'blog-cache-v2']

   event.waitUntil(
       caches.keys().then(function(cacheNames){
           return Promisse.all(
               cacheNames.map(function(cacheName){
                   if(cacheAllowlist.indexOf(cacheName) == -1){
                       return cache.delete(cacheName)
                   }
               })
           )
       })
   )
})