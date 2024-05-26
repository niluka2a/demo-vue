const headers: HeadersInit = new Headers()
headers.set('Accept', 'application/json')
headers.set('Content-Type', 'application/json')
headers.set('Access-Control-Allow-Origin', '*');
headers.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, post, get');

export const config = {
    headers: headers
}