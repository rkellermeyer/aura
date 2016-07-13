import {normalize} from './util';

function handleError(title, message) {
  return (error)=> {
    console.error(error);
    message && console.info(message);
    throw new Error(`Endpoint Error: ${title}`)
  }
}

export class Endpoint {

  config = {};

  constructor(client, url) {
    this.http   = client.http;
    this.client = client;
    this.url = url;
  }

  configure(config) {
    let self = this;
    config({
      getKey(key) {
        self.config.getKey = key;
      },
      findKey(key) {
        self.config.findKey = key;
      }
    })
  }

  get(url) {
    url = url ? normalize(this.url, url) : this.url;
    return this.http.get(url)
      .then(res => {
        if (this.config.getKey) return res.content[this.config.getKey];
        return res.content;
      })
      .catch(handleError('Get'))
  }

  find(url) {
    url = url ? normalize(this.url, url) : this.url;
    return this.http.get(url)
      .then(res => {
        if (this.config.findKey) return res.content[this.config.findKey];
        return res.content;
      })
      .catch(handleError('Find'))
  }

  post(url, data) {
    url = url ? normalize(this.url, url) : this.url;
    return this.http.post(url, data)
      .catch(handleError('Post'))
  }
}
