import { verifyToken } from "@clerk/backend"

export default ({strapi})=>{
    return async (ctx,next)=>{
        console.log("ejecuto middle")
        const authHeader = ctx.request.header.authorization
        console.log("authheader",authHeader)
        
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return await next()
        }
        
        const token = authHeader.split(' ')[1]
        console.log("auth token",token)

        try {
            const payload = await verifyToken(
                token,
                {
                    secretKey:process.env.CLERK_SECRET_KEY
                }
            )

            if(payload){
                const clerkId = payload.sub
                const [user] = await strapi.entityService.findMany('plugin::users-permissions.user', {
                    filters: { clerkId: clerkId },
                });

                if(user){
                    ctx.state.user = user
                    ctx.isAuthenticated = true
                }
                console.log("user middleware",user)
                return
            }
        } catch (error) {
            console.error('Error de validación en Clerk:', error.message)
            return ctx.unauthorized('Token inválido')
        }
        return await next()
    }
}