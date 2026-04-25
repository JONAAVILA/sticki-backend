/**
 * `cloudinary-middleware` middleware
 */
import { verifyToken } from '@clerk/backend';
import type { Core } from '@strapi/strapi';
const { CLERK_SECRET_KEY } = process.env

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    try {
        console.log("path",ctx.path)
        strapi.log.info('In cloudinary middleware.');

        const authHeader = ctx.request.headers['authorization']
        if (!authHeader){
          return ctx.unauthorized("Invalid auth header")
        }

        const token = authHeader.split(' ')[1]    
        const session = await verifyToken(
            token,
            {secretKey:CLERK_SECRET_KEY}
        )

        const user = await strapi
          .query('plugin::users-permissions.user')
          .findOne({
              where:{clerkId:session.sub}
          })

        ctx.state.user = user
        await next();
    } catch (error) {
        console.log(error)
        return ctx.unauthorized("Invalid token")
    }
  };
};
