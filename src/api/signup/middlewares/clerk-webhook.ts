/**
 * `clerk-webhook` middleware
 */

import type { Core } from '@strapi/strapi';
import { Webhook } from 'svix';

const { CLERK_WEBHOOK_SECRET } = process.env

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    try {
        strapi.log.info('In clerk-webhook middleware.');

        const headers = ctx.request.headers
        console.log("webhookheader",headers)
        const body = JSON.stringify(ctx.request.body)
        console.log("body",body)
        const wh = new Webhook(CLERK_WEBHOOK_SECRET)
        console.log("wh",wh)
        
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
        console.log("evt",evt)

        ctx.state.user = {
          data:evt.data
        }
        await next()
    } catch (error) {
        strapi.log.error(error)
        return ctx.unauthorized('Firma de Webhook inválida')
    }
  };
};
