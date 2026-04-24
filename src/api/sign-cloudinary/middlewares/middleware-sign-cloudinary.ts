/**
 * `middleware-sign-cloudinary` middleware
 */

import type { Core } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In middleware-sign-cloudinary middleware.');

    await next();
  };
};
