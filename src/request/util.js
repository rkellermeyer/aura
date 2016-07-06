export function normalize(url, join) {
  if (url.charAt(0) === '/') url = url.substr(1);
  if (join.charAt(0) === '/') join = join.substr(1);
  if (url.charAt(url.length -1) !== '/') url+= '/'
  return url + join;
}
