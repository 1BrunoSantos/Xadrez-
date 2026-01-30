self.addEventListener('fetch', function(event) {
    // Apenas repassa as requisições, funcionalidade básica offline
    event.respondWith(fetch(event.request));
});
