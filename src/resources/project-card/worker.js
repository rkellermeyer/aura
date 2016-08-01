class Worker {
  onfetch(event) {
    caches.match(request).then(
      function(response) {
        if (response) return response;
      }
    )
  }
}
