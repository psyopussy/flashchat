import { CSRFInterceptor, LoggerInterceptor } from 'aurelia-sails-socket-client';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-sails-socket-client', (sails, io) => {
      sails.configure(x => {
        x.withBaseUrl('/api/v1');

        // Example for CSRFInterceptor - if you are using Sails CSRF protection
        x.withInterceptor(new CSRFInterceptor('/csrfToken', sails));
        x.withInterceptor(new LoggerInterceptor());
      });

    });

  aurelia.start().then(a => a.setRoot('app', document.body));
}
