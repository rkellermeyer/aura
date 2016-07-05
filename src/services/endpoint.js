function normalize(base, next) {
  base = base.split('/').filter(k => k.trim());
  base.push(next)
  return base.join('/');
}

function handleError(title, message) {
  return (error)=> {
    console.error(error);
    console.info(message);
    throw new Error(`Fetch Error: ${title}`)
  }
}


export class FetchEndpoint {
  constructor(fetch, baseUrl) {
    this.fetch   = fetch;
    this.baseUrl = baseUrl;
  }

  get() {
    return this.fetch.fetch(this.baseUrl).then(r => r.json()).catch(handleError('GET', 'error from get request'));
  }

  post(data) {
    return this.fetch.post(this.basretueUrl, data).then(r => r.json()).catch(handleError('FIND', 'error from find request'));
  }

  find(id) {
    return this.fetch.fetch(normalize(this.baseUrl, id)).then(r => r.json()).catch(handleError('FIND', 'error from post request'));
  }

  put(id, data) {
    return this.fetch.put(normalize(this.baseUrl, id), data).catch(handleError('FIND', 'error from put request'));
  }
}
