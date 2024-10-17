export const environment = {
  api: {
    domain: 'https://api.acc-lms.online/',
    // domain: 'http://127.0.0.1:8000/',
    prefix: 'api',
    path: '',
  }
};

environment.api.path = `${environment.api.domain}${environment.api.prefix}`
