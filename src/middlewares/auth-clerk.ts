/**
 * `auth-clerk` middleware
 */

import { verifyToken } from '@clerk/backend';
import type { Core } from '@strapi/strapi';
const { CLERK_SECRET_KEY } = process.env

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    try {
        console.log("path",ctx.path)
        if(ctx.path === '/api/auth/signup-webhook' || ctx.path === '/auth/login-webhook') return await next()
        if(ctx.path.startsWith('/admin/') || ctx.path.startsWith('api/admin/')) return await next()
        if(ctx.path.startsWith('/content-manager/') || ctx.path.startsWith('api/content-manager/')) return await next()
        if(ctx.path.startsWith('/favicon.ico') || ctx.path.startsWith('api/favicon.ico')) return await next()
        if(ctx.path.startsWith('/users-permissions/') || ctx.path.startsWith('api/users-permissions/')) return await next()

        strapi.log.info('In auth-clerk middleware.')

        const authHeader = ctx.request.headers['authorization']
        if (!authHeader){
          return ctx.unauthorized("Invalid auth header")
        }

        const token = authHeader.split(' ')[1]    
        console.log("token", token)  
        const session = await verifyToken(
            token,
            {secretKey:CLERK_SECRET_KEY}
        )
        console.log("session", session)

        const user = await strapi
            .query('plugin::users-permissions.user')
            .findOne({
                where:{clerkId:session.sub}
            })

        console.log("user-middleware", user)

        ctx.state.user = user

        await next()
    } catch (error) {
        strapi.log.error(error)
        return ctx.unauthorized("Invalid token")
    }
  };
};
