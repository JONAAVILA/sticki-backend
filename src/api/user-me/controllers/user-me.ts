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
            console.log("authHeader",authHeader)
            if(!authHeader) return ctx.unauthorized()

            const token = authHeader.split(' ')[1]
            console.log("token",token)

            const session = await verifyToken(
                token,
                {secretKey:CLERK_SECRET_KEY}
            )
            console.log("session",session)
            
            const clerkId = session.sub
            console.log("clerkId",clerkId)

            const user = await strapi
                .plugin('api::user-me')
                .service('user-me')
                .findOne({
                    where:{clerkId:clerkId}
                })
            console.log("user",user)

            return ctx.send(user)
        } catch (error) {
            return error
        }
    }
}));
