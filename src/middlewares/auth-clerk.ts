/**
 * `auth-clerk` middleware
 */

import { verifyToken } from '@clerk/backend';
import type { Core } from '@strapi/strapi';
const { CLERK_SECRET_KEY } = process.env

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    try {
      strapi.log.info('In auth-clerk middleware.')
      const authHeader = ctx.request.headers.authorization
  
      if (!authHeader){
        return ctx.unauthorized("Invalid auth header")
      }

      const token = authHeader.split(' ')[1]
      
      const session = await verifyToken(
          token,
          {secretKey:CLERK_SECRET_KEY}
      )

      ctx.state.user = {
        clerkId: session.sub,
      }

      await next()
    } catch (error) {
        strapi.log.error(error)
        return ctx.unauthorized("Invalid token")
    }
  };
};
