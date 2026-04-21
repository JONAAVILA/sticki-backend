/**
 * user-me controller
 */

import { factories } from '@strapi/strapi';
import { verifyToken } from "@clerk/backend"

const { CLERK_SECRET_KEY } = process.env

export default factories.createCoreController('api::user-me.user-me',({strapi})=>({
    async getUser(ctx){
        try {
            const authHeader = ctx.request.headers.authorization
            if(!authHeader) return ctx.unauthorized()

            const token = authHeader.split(' ')[1]

            const session = await verifyToken(
                token,
                {secretKey:CLERK_SECRET_KEY}
            )
            
            const clerkId = session.sub

            const user = await strapi
                .query('plugin::users-permissions.user')
                .findOne({
                    where:{clerkId:clerkId}
                })

            return ctx.send(user)
        } catch (error) {
            return error
        }
    }
}));
