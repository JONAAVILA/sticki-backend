/**
 * user-me controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::user-me.user-me',({strapi})=>({
    async getUser(ctx){
        try {
            // const clerkId = await ctx.state.user.clerkId
            console.log("user",ctx.state.user)
            console.log("state", ctx.state)

            // const user = await strapi
            //     .query('plugin::users-permissions.user')
            //     .findOne({
            //         where:{clerkId:clerkId}
            //     })

            // return ctx.send(user)
        } catch (error) {
            strapi.log.error("user-me",error)
            return ctx.unauthorized("Usuario desconocido")        
        }
    }
}));
