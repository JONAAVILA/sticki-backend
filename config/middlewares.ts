export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::cors',
  'strapi::security',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'global::auth-clerk',
  },
  {
    name: 'strapi::body',
    config: {
      includeUnparsed: true,
    },
  },
];
