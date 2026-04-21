/**
 * user-me controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::user-me.user-me',({strapi})=>({
    async getUser(ctx){
        try {
            const clerkId = await ctx.state.user.clerkId

            const user = await strapi
                .query('plugin::users-permissions.user')
                .findOne({
                    where:{clerkId:clerkId}
                })

            return ctx.send(user)
        } catch (error) {
            strapi.log.error(error)
            return ctx.unauthorized("Usuario desconocido")        
        }
    }
}));
