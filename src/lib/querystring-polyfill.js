// Simple polyfill for querystring module in Edge runtime
export function stringify(obj) {
  return Object.entries(obj)
    .map(([key, value]) => {
      if (value === undefined) return '';
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .filter(Boolean)
    .join('&');
}

export function parse(str) {
  if (typeof str !== 'string' || !str) return {};
  
  return str
    .split('&')
    .filter(Boolean)
    .reduce((acc, part) => {
      const [key, value] = part.split('=').map(decodeURIComponent);
      acc[key] = value;
      return acc;
    }, {});
}

export default {
  stringify,
  parse,
};
