export function normalize(url, join) {

  if (url.charAt(0) === '/') url = url.substr(1);
  if (url.charAt(url.length -1) !== '/') url+= '/'

  if (typeof join === 'number') {
    return url + join;
  }

  if (join.charAt(0) === '/') join = join.substr(1);
  return url + join;
}
