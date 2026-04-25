/**
 * `signup-webhook-middleware` middleware
 */

import type { Core } from '@strapi/strapi';
import { Webhook } from 'svix';

const { CLERK_WEBHOOK_SECRET } = process.env

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In signup-webhook-middleware middleware.');

    const headers = ctx.request.headers
    const body = JSON.stringify(ctx.request.body)
    const wh = new Webhook(CLERK_WEBHOOK_SECRET)
    
    const svix_id = headers["svix-id"];
    const svix_timestamp = headers["svix-timestamp"];
    const svix_signature = headers["svix-signature"];

    if (!svix_id || !svix_timestamp || !svix_signature || Array.isArray(svix_id) || Array.isArray(svix_timestamp) || Array.isArray(svix_signature)) {
        return ctx.badRequest('Faltan encabezados de Svix o el formato es inválido');
    }

    let evt
    evt = wh.verify(
        body,
        {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }
    )

    ctx.state = {
        ...ctx.state,
        data:evt.data,
        type:evt.type
    }
    await next()
  };
};
